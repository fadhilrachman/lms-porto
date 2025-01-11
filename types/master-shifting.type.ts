export interface MasterShiftingType {
  id: string;
  code: string;
  entry_hours: string;
  name: string;
  leave_hours: string;
  description?: string;
  user: {
    id: string;
    email: string;
    job_title: string;
    name: string;
  };
}
