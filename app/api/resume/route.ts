import { contact } from "@/data/contact";
import { experiences } from "@/data/experiences";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

export const runtime = "nodejs";

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const MARGIN = 46;
const BOTTOM_MARGIN = 48;

type ResumePage = {
  commands: string[];
  cursorY: number;
};

function cleanPdfText(value: string) {
  // Portfolio content can include smart punctuation, so normalize it to the PDF's built-in font character set.
  return value
    .replaceAll("â€¢", " | ")
    .replaceAll("â€“", "-")
    .replaceAll("â€”", "-")
    .replaceAll("â€™", "'")
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapePdfText(value: string) {
  return cleanPdfText(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function wrapText(value: string, maxCharacters: number) {
  const words = cleanPdfText(value).split(" ");
  const lines: string[] = [];
  let line = "";

  words.forEach((word) => {
    const nextLine = line ? `${line} ${word}` : word;

    if (nextLine.length > maxCharacters && line) {
      lines.push(line);
      line = word;
      return;
    }

    line = nextLine;
  });

  if (line) {
    lines.push(line);
  }

  return lines;
}

function formatResumePeriod(startDate: string, endDate?: string, datePrecision?: "month" | "year") {
  const [startYear, startMonth] = startDate.split("-").map(Number);
  const monthName = new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(startYear, startMonth - 1, 1)));
  const start = datePrecision === "year" ? String(startYear) : `${monthName} ${startYear}`;

  if (!endDate || endDate === startDate) {
    return endDate === startDate ? start : `${start} - Present`;
  }

  const [endYear, endMonth] = endDate.split("-").map(Number);
  const endMonthName = new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(endYear, endMonth - 1, 1)));

  return `${start} - ${endMonthName} ${endYear}`;
}

function createResumePdf() {
  const pages: ResumePage[] = [{ commands: [], cursorY: 748 }];
  let currentPage = pages[0];

  const startPage = () => {
    currentPage = { commands: [], cursorY: 748 };
    pages.push(currentPage);
  };

  const ensureSpace = (height: number) => {
    if (currentPage.cursorY - height < BOTTOM_MARGIN) {
      startPage();
    }
  };

  const addText = (text: string, options: { size?: number; bold?: boolean; indent?: number; leading?: number; color?: string } = {}) => {
    const { size = 9.5, bold = false, indent = 0, leading = size + 3, color = "0 g" } = options;
    const lines = wrapText(text, Math.floor((92 - indent) / (size / 9.5)));

    ensureSpace(lines.length * leading);
    lines.forEach((line) => {
      currentPage.commands.push(
        `${color} BT /F${bold ? 2 : 1} ${size} Tf ${MARGIN + indent} ${currentPage.cursorY} Td (${escapePdfText(line)}) Tj ET`
      );
      currentPage.cursorY -= leading;
    });
  };

  const addCenteredText = (text: string, options: { size?: number; bold?: boolean; leading?: number } = {}) => {
    const { size = 10, bold = false, leading = size + 4 } = options;
    const cleanedText = cleanPdfText(text);
    const estimatedWidth = cleanedText.length * size * (bold ? 0.56 : 0.5);
    const x = Math.max(MARGIN, (PAGE_WIDTH - estimatedWidth) / 2);

    ensureSpace(leading);
    currentPage.commands.push(
      `0 g BT /F${bold ? 2 : 1} ${size} Tf ${x} ${currentPage.cursorY} Td (${escapePdfText(cleanedText)}) Tj ET`
    );
    currentPage.cursorY -= leading;
  };

  const addSection = (title: string) => {
    ensureSpace(30);
    currentPage.cursorY -= 4;
    const headingY = currentPage.cursorY;
    addText(title.toUpperCase(), {
      size: 12,
      bold: true,
      leading: 17,
    });
    // A full-width rule mirrors classic resume layouts while leaving the heading completely unobstructed.
    currentPage.commands.push(
      `0 G 0.75 w ${MARGIN} ${headingY - 11} m ${PAGE_WIDTH - MARGIN} ${headingY - 11} l S`
    );
    // Keep the first item visibly separated from its rule, matching the breathing room in the reference layout.
    currentPage.cursorY -= 5;
  };

  const addBullet = (text: string) => {
    const lines = wrapText(text, 84);
    ensureSpace(lines.length * 12 + 2);
    currentPage.commands.push(
      `0 g BT /F1 9.2 Tf ${MARGIN} ${currentPage.cursorY} Td (-) Tj ET`
    );
    lines.forEach((line) => {
      currentPage.commands.push(
        `0 g BT /F1 9.2 Tf ${MARGIN + 12} ${currentPage.cursorY} Td (${escapePdfText(line)}) Tj ET`
      );
      currentPage.cursorY -= 12;
    });
  };

  const addProject = (title: string, description: string, technologies: string[]) => {
    const details = `${description} Technologies: ${technologies.join(", ")}.`;
    const requiredHeight =
      wrapText(title, 92).length * 13 +
      wrapText(details, Math.floor(92 / (8.7 / 9.5))).length * 11.5 +
      3;

    // Keep each project title paired with its summary instead of splitting a record between pages.
    const pageCountBeforeProject = pages.length;
    ensureSpace(requiredHeight);

    if (pages.length > pageCountBeforeProject) {
      addSection("Portfolio Projects");
    }

    addText(title, { size: 9.5, bold: true, leading: 13 });
    addText(details, { size: 8.7, leading: 11.5 });
    currentPage.cursorY -= 1;
  };

  addCenteredText(profile.name.toUpperCase(), { size: 22, bold: true, leading: 28 });
  addCenteredText(profile.headline, { size: 16, bold: true, leading: 21 });
  addCenteredText(`${profile.location} | ${contact.phone} | ${contact.email}`, {
    size: 9.5,
    leading: 14,
  });
  addCenteredText(`${contact.github} | ${contact.linkedin}`, { size: 9.5, leading: 16 });
  currentPage.cursorY -= 9;

  addSection("Experience");
  experiences
    .filter((experience) => experience.category === "work")
    .forEach((experience) => {
      addText(experience.title, { size: 10, bold: true, leading: 14 });
      addText(`${experience.description} | ${formatResumePeriod(experience.startDate, experience.endDate, experience.datePrecision)}`, {
        size: 8.5,
        leading: 12,
        color: "0.33 g",
      });
      // The three strongest outcomes keep the one-page layout focused and easy for recruiters to scan.
      experience.responsibilities?.slice(0, 3).forEach(addBullet);
    });

  addSection("Technical Skills");
  addText(`Frontend: ${skills.frontend.join(", ")}`, { size: 9, leading: 12 });
  addText(`Backend and data: ${skills.backend.join(", ")}`, { size: 9, leading: 12 });
  addText(`Mobile and IoT: ${skills.mobile.join(", ")}`, { size: 9, leading: 12 });
  addText(`Tools: ${skills.tools.join(", ")}`, { size: 9, leading: 12 });

  addSection("Portfolio Projects");
  projects.forEach((project) => {
    addProject(
      project.title,
      project.highlights?.[0] ?? project.description,
      project.tech.slice(0, 5)
    );
  });

  const education = experiences.find((experience) => experience.category === "education");

  if (education) {
    addSection("Education");
    addText(`${education.title} | ${education.description}`, { size: 9.5, bold: true, leading: 13 });
    addText(formatResumePeriod(education.startDate, education.endDate, education.datePrecision), {
      size: 8.7,
      leading: 12,
    });
  }

  pages.forEach((page, index) => {
    // A minimal footer gives multi-page documents a finished feel without adding visual noise for ATS parsers.
    page.commands.push(
      `0.45 g BT /F1 7 Tf ${MARGIN} 26 Td (${escapePdfText(`${profile.name} | ATS Resume`)}) Tj ET`
    );
    page.commands.push(
      `0.45 g BT /F1 7 Tf 500 26 Td (Page ${index + 1} of ${pages.length}) Tj ET`
    );
  });

  const objects: string[] = [];
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  // Times is a built-in PDF font, so the document keeps its classic resume styling without external font files.
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >>";
  objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >>";

  const pageObjectIds = pages.map((_, index) => 5 + index * 2);
  objects[2] = `<< /Type /Pages /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pages.length} >>`;

  pages.forEach((page, index) => {
    const pageObjectId = pageObjectIds[index];
    const contentObjectId = pageObjectId + 1;
    const content = page.commands.join("\n");

    objects[pageObjectId] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObjectId} 0 R >>`;
    objects[contentObjectId] = `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;
  });

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  for (let objectId = 1; objectId < objects.length; objectId += 1) {
    offsets[objectId] = pdf.length;
    pdf += `${objectId} 0 obj\n${objects[objectId]}\nendobj\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new TextEncoder().encode(pdf);
}

export async function GET() {
  // The document is built on demand so its content always matches the portfolio data.
  const resumePdf = createResumePdf();

  return new Response(resumePdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=\"Jose Vener Rafael - Resume.pdf\"; filename*=UTF-8''Jose%20Vener%20Rafael%20%E2%80%94%20Resume.pdf",
      "Cache-Control": "no-store",
    },
  });
}
