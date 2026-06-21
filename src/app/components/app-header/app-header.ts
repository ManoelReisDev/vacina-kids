import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Child } from '../../models/vaccine.models';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css',
})
export class AppHeaderComponent {
  @Input({ required: true }) children: Child[] = [];
  @Input({ required: true }) selectedChildId = '';
  @Output() selectedChildIdChange = new EventEmitter<string>();

  protected trackById(_: number, item: Child): string {
    return item.id;
  }
}
