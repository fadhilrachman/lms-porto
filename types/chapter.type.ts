import { ContentType } from "./content.type";

export interface ChapterType {
  id: string;
  title: string;
  position: number;
  content: ContentType[];
  _count: {
    content: number;
  };
}
