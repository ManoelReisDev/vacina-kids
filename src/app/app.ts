import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppHeaderComponent } from './components/app-header/app-header';
import { ChildSummaryComponent } from './components/child-summary/child-summary';
import { NavigationTabsComponent } from './components/navigation-tabs/navigation-tabs';
import { VaccineService } from './services/vaccine.service';

@Component({
  selector: 'app-root',
  imports: [AppHeaderComponent, ChildSummaryComponent, NavigationTabsComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly vaccineService = inject(VaccineService);
}
