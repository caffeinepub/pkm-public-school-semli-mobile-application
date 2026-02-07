import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Blob "mo:core/Blob";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type (required by frontend)
  public type UserProfile = {
    name : Text;
    role : Text; // "student", "parent", "teacher", "admin"
    associatedStudentId : ?Text; // For parents and students
  };
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Data Models
  public type StudyMaterial = {
    id : Text;
    subject : Text;
    className : Text;
    description : Text;
    fileUrl : Text;
  };
  let studyMaterials = Map.empty<Text, StudyMaterial>();

  public type Assignment = {
    id : Text;
    title : Text;
    className : Text;
    dueDate : Text;
    description : Text;
  };
  let assignments = Map.empty<Text, Assignment>();

  public type Exam = {
    id : Text;
    subject : Text;
    className : Text;
    date : Text;
    description : Text;
  };
  let exams = Map.empty<Text, Exam>();

  public type AttendanceRecord = {
    studentId : Text;
    date : Text;
    present : Bool;
  };
  let attendanceRecords = Map.empty<Text, List.List<AttendanceRecord>>();

  public type Notification = {
    id : Text;
    message : Text;
    date : Text;
    read : Bool;
  };

  public type ExamResult = {
    examId : Text;
    studentId : Text;
    subject : Text;
    score : Nat;
    total : Nat;
    date : Text;
  };
  let examResults = Map.empty<Text, List.List<ExamResult>>();

  public type TeacherAnnouncement = {
    id : Text;
    title : Text;
    content : Text;
    date : Text;
  };
  let announcements = Map.empty<Text, TeacherAnnouncement>();

  public type StudentProfile = {
    id : Text;
    name : Text;
    className : Text;
    dob : Text;
    parentId : Text;
  };
  let studentProfiles = Map.empty<Text, StudentProfile>();

  // User Profile Management (Required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Helper function to check if caller can access student data
  private func canAccessStudentData(caller : Principal, studentId : Text) : Bool {
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return true;
    };

    switch (userProfiles.get(caller)) {
      case (?profile) {
        switch (profile.associatedStudentId) {
          case (?assocId) { assocId == studentId };
          case (null) { false };
        };
      };
      case (null) { false };
    };
  };

  // Study Materials
  public shared ({ caller }) func addStudyMaterial(material : StudyMaterial) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add study materials");
    };
    studyMaterials.add(material.id, material);
  };

  public query ({ caller }) func getStudyMaterials() : async [StudyMaterial] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view study materials");
    };
    studyMaterials.values().toArray();
  };

  // Assignments
  public shared ({ caller }) func createAssignment(assignment : Assignment) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create assignments");
    };
    assignments.add(assignment.id, assignment);
  };

  public query ({ caller }) func getAssignments() : async [Assignment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view assignments");
    };
    assignments.values().toArray();
  };

  // Exams
  public shared ({ caller }) func scheduleExam(exam : Exam) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can schedule exams");
    };
    exams.add(exam.id, exam);
  };

  public query ({ caller }) func getExams() : async [Exam] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view exams");
    };
    exams.values().toArray();
  };

  // Attendance (Student-specific data)
  public shared ({ caller }) func addAttendance(record : AttendanceRecord) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add attendance records");
    };
    let studentId = record.studentId;
    let existingRecords = switch (attendanceRecords.get(studentId)) {
      case (?records) { records };
      case (null) { List.empty<AttendanceRecord>() };
    };
    existingRecords.add(record);
    attendanceRecords.add(studentId, existingRecords);
  };

  public query ({ caller }) func getAttendance(studentId : Text) : async [AttendanceRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view attendance");
    };
    if (not canAccessStudentData(caller, studentId)) {
      Runtime.trap("Unauthorized: Can only view attendance for your associated student");
    };
    switch (attendanceRecords.get(studentId)) {
      case (?records) { records.toArray() };
      case (null) { [] };
    };
  };

  // Notifications (User-specific data)
  let notificationsMap = Map.empty<Text, List.List<Notification>>();

  public shared ({ caller }) func addNotification(userId : Text, notification : Notification) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add notifications");
    };
    let userNotifications = switch (notificationsMap.get(userId)) {
      case (?notifs) { notifs };
      case (null) { List.empty<Notification>() };
    };
    userNotifications.add(notification);
    notificationsMap.add(userId, userNotifications);
  };

  public query ({ caller }) func getNotifications(userId : Text) : async [Notification] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view notifications");
    };
    let callerPrincipalText = caller.toText();
    if (userId != callerPrincipalText and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own notifications");
    };
    switch (notificationsMap.get(userId)) {
      case (?notifs) { notifs.toArray() };
      case (null) { [] };
    };
  };

  // Exam Results (Student-specific data)
  public shared ({ caller }) func addExamResult(result : ExamResult) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add exam results");
    };
    let studentResults = switch (examResults.get(result.studentId)) {
      case (?results) { results };
      case (null) { List.empty<ExamResult>() };
    };
    studentResults.add(result);
    examResults.add(result.studentId, studentResults);
  };

  public query ({ caller }) func getExamResults(studentId : Text) : async [ExamResult] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view exam results");
    };
    if (not canAccessStudentData(caller, studentId)) {
      Runtime.trap("Unauthorized: Can only view exam results for your associated student");
    };
    switch (examResults.get(studentId)) {
      case (?results) { results.toArray() };
      case (null) { [] };
    };
  };

  // Teacher Announcements
  public shared ({ caller }) func postAnnouncement(announcement : TeacherAnnouncement) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can post announcements");
    };
    announcements.add(announcement.id, announcement);
  };

  public query ({ caller }) func getAnnouncements() : async [TeacherAnnouncement] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view announcements");
    };
    announcements.values().toArray();
  };

  // Student Profile (Student-specific data)
  public shared ({ caller }) func addStudentProfile(profile : StudentProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add student profiles");
    };
    studentProfiles.add(profile.id, profile);
  };

  public query ({ caller }) func getStudentProfile(studentId : Text) : async StudentProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view student profiles");
    };
    if (not canAccessStudentData(caller, studentId)) {
      Runtime.trap("Unauthorized: Can only view profile for your associated student");
    };
    switch (studentProfiles.get(studentId)) {
      case (?profile) { profile };
      case (null) { Runtime.trap("Student profile not found") };
    };
  };

  public query ({ caller }) func getAllStudentProfiles() : async [StudentProfile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all student profiles");
    };
    studentProfiles.values().toArray();
  };
};
