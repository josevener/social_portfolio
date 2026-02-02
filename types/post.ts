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

export type ProjectPost = BasePost & {
  type: "project";
  slug: string;
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