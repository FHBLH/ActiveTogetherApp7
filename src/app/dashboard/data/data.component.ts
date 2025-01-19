import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Registration } from '../../shared/Interfaces/Registration';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [
    SharedModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent {

  constructor(public storeService: StoreService, private backendService: BackendService) {
  }

  public page: number = 0;
  public filter = "";

  selectPage(i: any) {
    let currentPage = i;
    this.storeService.currentPage = i;
    this.backendService.getRegistrations(currentPage);
  }

  public returnAllPages() {
    var pagesCount = Math.ceil(this.storeService.registrationTotalCount / 2);
    let res = [];
    for (let i = 0; i < pagesCount; i++) {
      res.push(i + 1);
    }
    return res;
  }

  deleteRegistration(registration: Registration) {
    registration.isVisible = false;
    this.backendService.deleteRegistration(registration.id, this.page);
  }

  changeOrder() {
    this.storeService.changeOrder();
    this.backendService.getRegistrations(this.page);
  }

  filteredCourses() {
    return this.storeService.courses.filter(item =>
      item.name.toLowerCase().includes(this.filter.toLowerCase()) ||
      item.instructor.toLowerCase().includes(this.filter.toLowerCase()) ||
      item.eventLocation.name.toLowerCase().includes(this.filter.toLowerCase()) ||
      item.eventLocation.address.toLowerCase().includes(this.filter.toLowerCase()));
  }
}
