import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { Course } from './Interfaces/Course';
import { Registration } from './Interfaces/Registration';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private storeService: StoreService) {
  }

  public getCourses() {
    this.http.get<Course[]>('http://localhost:5000/courses?_expand=eventLocation').subscribe(data => {
      this.storeService.courses = data;
    });
  }

  public getRegistrations() {

    const options = {
      observe: 'response' as const,
      transferCache: {
        includeHeaders: ['X-Total-Count']
      }
    };

    const orderQuery = this.storeService.currentOrder === "" ? "" : `&_sort=registrationDate&_order=${this.storeService.currentOrder}`
    const page = this.storeService.currentPage + 1;
    const pageSize = this.storeService.currentPageSize;

    this.http.get<Registration[]>(`http://localhost:5000/registrations?_expand=course&_page=${page}&_limit=${pageSize}${orderQuery}`, options).subscribe(data => {
      this.storeService.registrations = data.body!;
      this.storeService.registrationTotalCount = Number(data.headers.get('X-Total-Count'));
    });
  }

  public addRegistration(registration: any, page: number) {
    this.http.post('http://localhost:5000/registrations', registration).subscribe(_ => {
      this.getRegistrations();
    })
  }

  public deleteRegistration(registrationId: string, page: number) {
    this.http.delete(`http://localhost:5000/registrations/${registrationId}`).subscribe(_ => {
      this.getRegistrations();
    })
  }
}
