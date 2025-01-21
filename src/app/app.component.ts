import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { BackendService } from './shared/backend.service';
import { SharedModule } from './shared/shared.module';
import { StoreService } from './shared/store.service';
import { MatTabsModule } from "@angular/material/tabs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SharedModule, MatTabsModule],
  providers: [BackendService, StoreService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.backendService.getCourses();
    this.backendService.getRegistrations();
  }
}
