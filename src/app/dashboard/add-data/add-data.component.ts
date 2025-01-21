import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { StoreService } from '../../shared/store.service';
import { BackendService } from '../../shared/backend.service';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { SuccessDialogComponent } from "./success-dialog/success-dialog.component";

@Component({
  selector: 'app-add-data',
  standalone: true,  // standalone-Komponente
  imports: [SharedModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatButtonModule],  // Import der benötigten Module
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {
  constructor(private formbuilder: FormBuilder, public storeService: StoreService, private backendService: BackendService, private dialog: MatDialog) {
  }

  public registrationForm: any;

  ngOnInit(): void {
    this.registrationForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      birthdate: [null, Validators.required],
      courseId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      registrationDate: [null],
      emailSubscription: [false]
    })
  }

  onSubmit(form: FormGroupDirective) {
    if (this.registrationForm.valid) {
      const registration = {...this.registrationForm.value, registrationDate: new Date()}
      this.backendService.addRegistration(registration, this.storeService.currentPage);
      this.dialog.open(SuccessDialogComponent, {
        data: {course: this.getCourseName(this.registrationForm.value.courseId)}
      });
      form.resetForm();
    }
  }

  private getCourseName(id: string): string {
    const course = this.storeService.courses.find(course => course.id === id)
    return course ? course.name : '';
  }
}
