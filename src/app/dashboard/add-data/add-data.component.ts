import {Component, OnInit} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormBuilder, FormGroupDirective, Validators} from '@angular/forms';
import {StoreService} from '../../shared/store.service';
import {BackendService} from '../../shared/backend.service';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-add-data',
  standalone: true,  // standalone-Komponente
  imports: [SharedModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatButtonModule],  // Import der benötigten Module
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {
  constructor(private formbuilder: FormBuilder, public storeService: StoreService, private backendService: BackendService) {
  }

  public registrationForm: any;

  ngOnInit(): void {
    this.registrationForm = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      birthdate: [null, Validators.required],
      courseId: ['', Validators.required],
      emailSubscription: [false]
    })
  }

  onSubmit(form: FormGroupDirective) {
    if (this.registrationForm.valid) {
      this.backendService.addRegistration(this.registrationForm.value, this.storeService.currentPage);
    }
    form.resetForm();
  }
}
