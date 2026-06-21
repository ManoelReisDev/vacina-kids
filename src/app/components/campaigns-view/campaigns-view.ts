import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ActiveCampaign } from '../../models/vaccine.models';
import { VaccineService } from '../../services/vaccine.service';

@Component({
  selector: 'app-campaigns-view',
  imports: [CommonModule],
  templateUrl: './campaigns-view.html',
  styleUrl: './campaigns-view.css',
})
export class CampaignsViewComponent {
  protected readonly vaccineService = inject(VaccineService);

  protected trackCampaign(_: number, item: ActiveCampaign): string {
    return item.id;
  }
}
