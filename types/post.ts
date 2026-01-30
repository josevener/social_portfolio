export type PostType = "post" | "project" | "experience";

export type Post = {
  id: number;
  type: PostType;
  title: string;
  description: string;
  tech: string[];
};