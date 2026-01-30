import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, Download } from "lucide-react";
import { contact } from "@/data/contact";

export default function ProfileActions() {
  return (
    <div className="flex items-center gap-3 mt-4 flex-wrap">
      <Button size="icon" variant="outline" asChild>
        <a href={`mailto:${contact.email}`} aria-label="Email me">
          <Mail className="h-4 w-4" />
        </a>
      </Button>

      <Button size="icon" variant="outline" asChild>
        <a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
        >
          <Github className="h-4 w-4" />
        </a>
      </Button>

      <Button size="icon" variant="outline" asChild>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </Button>

      <span className="text-sm text-muted-foreground ml-2">
        Let’s work together
      </span>

      <Button asChild className="ml-auto">
        <a href={contact.resumeUrl} download>
          <Download className="h-4 w-4" />
          Get My Resume
        </a>
      </Button>
    </div>
  );
}