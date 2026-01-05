// Blog Data Type
export interface Post {
  id: number;
  title: string;
  content: string;
}
// Blog Data Dummy
export const posts: Post[] = [
  { id: 1, title: "First Post", content: "Content of the first post." },
  { id: 2, title: "Second Post", content: "Content of the second post." },
];
