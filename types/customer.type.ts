export interface CustomerType {
  id: string;
  user_name: string;
  email: string;
  created_at: Date;
  _count: {
    transaction: number;
  };
}
export interface PostCustomerType {
  user_name: string;
  email: string;
  password: string;
}
