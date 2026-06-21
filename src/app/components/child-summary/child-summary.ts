import { Component, Input } from '@angular/core';

import { Child, VaccineStats } from '../../models/vaccine.models';

@Component({
  selector: 'app-child-summary',
  templateUrl: './child-summary.html',
  styleUrl: './child-summary.css',
})
export class ChildSummaryComponent {
  @Input({ required: true }) child!: Child;
  @Input({ required: true }) ageInMonths = 0;
  @Input({ required: true }) stats!: VaccineStats;
}
