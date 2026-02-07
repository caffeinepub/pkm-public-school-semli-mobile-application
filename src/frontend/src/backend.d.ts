import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface StudentProfile {
    id: string;
    dob: string;
    name: string;
    parentId: string;
    className: string;
}
export interface Notification {
    id: string;
    date: string;
    read: boolean;
    message: string;
}
export interface StudyMaterial {
    id: string;
    subject: string;
    description: string;
    className: string;
    fileUrl: string;
}
export interface TeacherAnnouncement {
    id: string;
    title: string;
    content: string;
    date: string;
}
export interface ExamResult {
    total: bigint;
    studentId: string;
    subject: string;
    date: string;
    score: bigint;
    examId: string;
}
export interface Exam {
    id: string;
    subject: string;
    date: string;
    description: string;
    className: string;
}
export interface AttendanceRecord {
    studentId: string;
    present: boolean;
    date: string;
}
export interface Assignment {
    id: string;
    title: string;
    dueDate: string;
    description: string;
    className: string;
}
export interface UserProfile {
    name: string;
    role: string;
    associatedStudentId?: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAttendance(record: AttendanceRecord): Promise<void>;
    addExamResult(result: ExamResult): Promise<void>;
    addNotification(userId: string, notification: Notification): Promise<void>;
    addStudentProfile(profile: StudentProfile): Promise<void>;
    addStudyMaterial(material: StudyMaterial): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createAssignment(assignment: Assignment): Promise<void>;
    getAllStudentProfiles(): Promise<Array<StudentProfile>>;
    getAnnouncements(): Promise<Array<TeacherAnnouncement>>;
    getAssignments(): Promise<Array<Assignment>>;
    getAttendance(studentId: string): Promise<Array<AttendanceRecord>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getExamResults(studentId: string): Promise<Array<ExamResult>>;
    getExams(): Promise<Array<Exam>>;
    getNotifications(userId: string): Promise<Array<Notification>>;
    getStudentProfile(studentId: string): Promise<StudentProfile>;
    getStudyMaterials(): Promise<Array<StudyMaterial>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    postAnnouncement(announcement: TeacherAnnouncement): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    scheduleExam(exam: Exam): Promise<void>;
}
