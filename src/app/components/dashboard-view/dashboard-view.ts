import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ActiveCampaign, VaccinePlanItem } from '../../models/vaccine.models';
import { VaccineService } from '../../services/vaccine.service';

@Component({
  selector: 'app-dashboard-view',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-view.html',
  styleUrl: './dashboard-view.css',
})
export class DashboardViewComponent {
  protected readonly vaccineService = inject(VaccineService);

  protected trackCampaign(_: number, item: ActiveCampaign): string {
    return item.id;
  }

  protected trackPlan(_: number, item: VaccinePlanItem): string {
    return item.vaccine.id;
  }
}
