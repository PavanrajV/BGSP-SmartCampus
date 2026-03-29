/**
 * BGSP SmartCampus Types
 */

export enum UserRole {
  STUDENT = 'student',
  STAFF = 'staff',
  ADMIN = 'admin',
}

export interface UserProfile {
  uid: string;
  register_number: string;
  name: string;
  role: UserRole;
  department?: string;
  semester?: number;
  section?: string;
  roll_number?: number;
  email?: string;
}

export interface Subject {
  id: string;
  name: string;
  staff_id: string;
  semester: number;
  department: string;
}

export interface AttendanceSession {
  id: string;
  subject_id: string;
  date: string; // ISO string
  staff_id: string;
  semester: number;
  section: string;
}

export interface AttendanceRecord {
  id: string;
  session_id: string;
  student_id: string;
  status: 'present' | 'absent';
}

export interface Marks {
  id: string;
  student_id: string;
  subject_id: string;
  internal1?: number;
  internal2?: number;
  internal3?: number;
  assignment?: number;
  total?: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  created_by: string; // staff_id or admin_id
  created_at: string; // ISO string
  role_target?: UserRole[]; // Who can see this
}

export interface Note {
  id: string;
  subject_id: string;
  title: string;
  file_url: string;
  uploaded_by: string;
  uploaded_at: string;
}
