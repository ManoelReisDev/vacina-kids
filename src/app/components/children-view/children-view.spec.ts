import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ChildrenViewComponent } from './children-view';
import { VaccineService } from '../../services/vaccine.service';

describe('ChildrenViewComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildrenViewComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('shows a validation error when required fields are incomplete', () => {
    const component = TestBed.createComponent(ChildrenViewComponent).componentInstance;
    const vaccineService = TestBed.inject(VaccineService);
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    vaccineService.newChild = {
      name: 'Ana',
      birthDate: '',
      gender: '',
    };

    (component as any).addChild();

    expect((component as any).formError()).toBe('Preencha nome e data de nascimento para continuar.');
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('clears the error and navigates when the form is valid', () => {
    const component = TestBed.createComponent(ChildrenViewComponent).componentInstance;
    const vaccineService = TestBed.inject(VaccineService);
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    vaccineService.newChild = {
      name: 'Ana',
      birthDate: '2024-01-01',
      gender: 'Feminino',
    };

    (component as any).addChild();

    expect((component as any).formError()).toBe('');
    expect(navigateSpy).toHaveBeenCalledWith('/resumo');
  });
});
