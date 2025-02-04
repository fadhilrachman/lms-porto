import { CourseType } from "./course.type";
import { CustomerType } from "./customer.type";

export interface TransactionType {
  id: string;
  user: CustomerType;
  course: CourseType;
  created_at: Date;
  code: string;
}
