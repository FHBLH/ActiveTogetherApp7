import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { FaqPageComponent } from './faq-page/faq-page.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'about', component: AboutPageComponent },
    { path: 'faq', component: FaqPageComponent }
];
