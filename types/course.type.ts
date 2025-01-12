export interface CourseType {
  id: string;
  title: string;
  is_free: boolean;
  price: number;
  thumbnail_img: string;
  created_at: Date;
  _count: {
    chapter: number;
  };
}
