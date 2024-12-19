import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTabNavPanel, MatTabsModule } from "@angular/material/tabs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatTabsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public title: string = 'Stay Active, Stay Together';
  public imagePath: string = "./../assets/images/sport.jpeg";

  @Input() tabPanel!: MatTabNavPanel;
}
