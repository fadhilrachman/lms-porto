import { CategoryType } from "./category.type";
import { ChapterType } from "./chapter.type";

export interface CourseType {
  id: string;
  title: string;
  is_free: boolean;
  price: number;
  thumbnail_img: string;
  created_at: Date;
  category: CategoryType;
  _count: {
    chapter: number;
    transaction: number;
  };
}

export interface CourseDetailType {
  id: string;
  title: string;
  is_free: boolean;
  price: number;
  thumbnail_img: string;
  created_at: Date;
  introduction_vid: string;
  is_published: string;
  category: CategoryType;
  description: string;
  resource: string;
  chapter: ChapterType[];
}
