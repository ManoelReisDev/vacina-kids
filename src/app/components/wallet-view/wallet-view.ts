import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { VaccinePlanItem } from '../../models/vaccine.models';
import { VaccineService } from '../../services/vaccine.service';

@Component({
  selector: 'app-wallet-view',
  imports: [CommonModule],
  templateUrl: './wallet-view.html',
  styleUrl: './wallet-view.css',
})
export class WalletViewComponent {
  protected readonly vaccineService = inject(VaccineService);

  protected trackPlan(_: number, item: VaccinePlanItem): string {
    return item.vaccine.id;
  }
}
