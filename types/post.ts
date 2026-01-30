export type PostType = "post" | "project" | "experience";

export type BasePost = {
  id: number;
  type: PostType;
  title: string;
  description: string;
  tech: string[];
};

export type ProjectPost = BasePost & {
  type: "project";
  slug: string;
};

export type ExperiencePost = BasePost & {
  type: "experience";
  period: string;
};

export type Post = BasePost | ProjectPost | ExperiencePost;