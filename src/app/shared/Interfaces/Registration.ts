import { Course } from "./Course";

export interface Registration {
    id: string;
    name: string;
    birthdate: string,
    registrationDate: Date,
    course: Course,
    courseId: number,
    isVisible?: boolean
  }
