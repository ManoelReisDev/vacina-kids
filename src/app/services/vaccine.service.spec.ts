import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { vaccines } from '../data/mock-data';
import { VaccineService } from './vaccine.service';

describe('VaccineService', () => {
  let service: VaccineService;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-21T12:00:00Z'));
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccineService);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calculates age in months from an ISO birth date', () => {
    expect(service.getAgeInMonths('2025-01-12')).toBe(17);
  });

  it('ignores invalid child selections', () => {
    const originalId = service.selectedChildId();

    service.selectChild('nao-existe');

    expect(service.selectedChildId()).toBe(originalId);
    expect(service.selectedChild().id).toBe(originalId);
  });

  it('registers a vaccine for the item child only once', () => {
    service.selectChild('ana');

    const item = {
      childId: 'lucas',
      vaccine: vaccines.find((vaccine) => vaccine.id === 'varicela')!,
      scheduledDate: new Date('2026-01-01T00:00:00'),
      appliedDate: undefined,
      status: 'pending' as const,
    };

    const before = service.records().length;

    service.markAsApplied(item);
    service.markAsApplied(item);

    const after = service.records();
    const newRecords = after.slice(before);

    expect(newRecords).toHaveLength(1);
    expect(newRecords[0].childId).toBe('lucas');
    expect(newRecords[0].vaccineId).toBe(item.vaccine.id);
  });
});
