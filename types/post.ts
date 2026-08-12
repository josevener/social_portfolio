export type PostType = "post" | "project" | "experience";

export type BasePost = {
  id: number;
  type: PostType;
  title: string;
  description: string;
  tech: string[];
};

export type BlogPost = BasePost & {
  type: "post";
  slug: string;
  tags?: string[];
  author: string;
  publishedAt: string;
  introduction: string;
  images?: {
    src: string;
    alt: string;
  }[];
  sections: {
    heading?: string;
    content: string[];
    code?: {
      language: string;
      snippet: string;
      filename?: string;
    };
    list?: {
      items: string[];
      ordered?: boolean;
    };
  }[];
  conclusion: string;
};

export type ProjectPost = {
  id: number;
  type: "project";
  slug: string;
  title: string;
  description: string;
  tech: string[];
  // Optional live URL lets the portfolio surface deployed work when available.
  liveUrl?: string;
  tags?: string[];
  // Long-form project content powers the dedicated project detail page.
  context?: {
    program?: string;
    institution?: string;
    period?: string;
  };
  content?: string[];
  problem?: string;
  solution?: string;
  highlights?: string[];
  screenshots?: {
    src: string;
    alt: string;
  }[];
};

export type ExperiencePost = BasePost & {
  type: "experience";
  startDate: string;
  endDate?: string;
  datePrecision?: "month" | "year";
  category: "work" | "education";
  responsibilities?: string[];
};

export type Post = BlogPost | ProjectPost | ExperiencePost;
