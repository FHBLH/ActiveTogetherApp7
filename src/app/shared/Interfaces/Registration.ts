import { Course } from "./Course";

export interface Registration {
    id: string;
    name: string;
    email: string;
    birthdate: string,
    registrationDate: Date,
    course: Course,
    courseId: number,
    isVisible?: boolean
  }
