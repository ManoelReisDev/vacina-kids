import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Child } from '../../models/vaccine.models';
import { VaccineService } from '../../services/vaccine.service';

@Component({
  selector: 'app-children-view',
  imports: [CommonModule, FormsModule],
  templateUrl: './children-view.html',
  styleUrl: './children-view.css',
})
export class ChildrenViewComponent {
  protected readonly vaccineService = inject(VaccineService);
  protected readonly formError = signal('');
  private readonly router = inject(Router);

  protected addChild(): void {
    const name = this.vaccineService.newChild.name.trim();
    const birthDate = this.vaccineService.newChild.birthDate;

    this.formError.set('');

    if (!name || !birthDate) {
      this.formError.set('Preencha nome e data de nascimento para continuar.');
      return;
    }

    this.vaccineService.addChild();
    void this.router.navigateByUrl('/resumo');
  }

  protected clearFormError(): void {
    if (this.formError()) {
      this.formError.set('');
    }
  }

  protected trackById(_: number, item: Child): string {
    return item.id;
  }
}
