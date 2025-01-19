import { Injectable } from '@angular/core';
import { Course } from './Interfaces/Course';
import { Registration } from './Interfaces/Registration';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  public courses: Course[] = [];
  public registrations: Registration[] = [];
  public registrationTotalCount: number = 0;
  public currentPage: number = 1;
  public currentOrder: string = "";

  public changeOrder() {
    if (this.currentOrder === "") {
      this.currentOrder = "asc";
    } else if (this.currentOrder === "asc") {
      this.currentOrder = "desc";
    } else {
      this.currentOrder = "";
    }
  }
}
