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
  images?: {
    src: string;
    alt: string;
  }[];
};

export type ProjectPost = {
  id: number;
  type: "project";
  slug: string;
  title: string;
  description: string;
  tech: string[];

  tags?: string[];

  // NEW — long-form content
  context?: {
    program?: string;
    institution?: string;
    period?: string;
  };

  content?: string[]; // paragraphs

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
  period: string;
  responsibilities?: string[];
};

export type Post = BlogPost | ProjectPost | ExperiencePost;