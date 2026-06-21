import { Injectable, computed, signal } from '@angular/core';

import { campaigns, initialChildren, initialRecords, vaccines } from '../data/mock-data';
import {
  Child,
  NewChildForm,
  VaccinePlanItem,
  VaccineRecord,
  VaccineStatus,
  WalletFilter,
} from '../models/vaccine.models';

@Injectable({
  providedIn: 'root',
})
export class VaccineService {
  private readonly today = new Date();
  private readonly vaccines = vaccines;
  private readonly campaigns = campaigns;

  readonly selectedChildId = signal('ana');
  readonly walletFilter = signal<WalletFilter>('all');
  readonly children = signal<Child[]>(initialChildren);
  readonly records = signal<VaccineRecord[]>(initialRecords);

  newChild: NewChildForm = {
    name: '',
    birthDate: '',
    gender: '',
  };

  readonly selectedChild = computed(() => {
    return this.children().find((child) => child.id === this.selectedChildId()) ?? this.children()[0];
  });

  readonly childAge = computed(() => this.getAgeInMonths(this.selectedChild().birthDate));

  readonly vaccinePlan = computed(() => {
    const child = this.selectedChild();
    const birthDate = this.parseDateOnly(child.birthDate);
    const records = this.records().filter((record) => record.childId === child.id);

    return this.vaccines
      .map((vaccine) => {
        const record = records.find((item) => item.vaccineId === vaccine.id);
        const scheduledDate = birthDate ? this.addMonths(birthDate, vaccine.recommendedAgeMonths) : new Date(NaN);
        const status: VaccineStatus = record
          ? 'completed'
          : scheduledDate < this.startOfToday()
            ? 'overdue'
            : 'pending';

        return {
          childId: child.id,
          vaccine,
          scheduledDate,
          appliedDate: record ? new Date(`${record.appliedDate}T00:00:00`) : undefined,
          status,
        };
      })
      .sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime());
  });

  readonly filteredWallet = computed(() => {
    const filter = this.walletFilter();
    return filter === 'all'
      ? this.vaccinePlan()
      : this.vaccinePlan().filter((item) => item.status === filter);
  });

  readonly stats = computed(() => ({
    completed: this.vaccinePlan().filter((item) => item.status === 'completed').length,
    pending: this.vaccinePlan().filter((item) => item.status === 'pending').length,
    overdue: this.vaccinePlan().filter((item) => item.status === 'overdue').length,
  }));

  readonly nextVaccines = computed(() => {
    return this.vaccinePlan()
      .filter((item) => item.status !== 'completed')
      .slice(0, 3);
  });

  readonly activeCampaigns = computed(() => {
    const childAge = this.childAge();
    const today = this.startOfToday();

    return this.campaigns
      .filter((campaign) => {
        const startsAt = new Date(`${campaign.startDate}T00:00:00`);
        const endsAt = new Date(`${campaign.endDate}T23:59:59`);
        return startsAt <= today && endsAt >= today;
      })
      .map((campaign) => ({
        ...campaign,
        relevant: childAge >= campaign.minAgeMonths && childAge <= campaign.maxAgeMonths,
      }));
  });

  selectChild(childId: string): void {
    if (this.children().some((child) => child.id === childId)) {
      this.selectedChildId.set(childId);
    }
  }

  setFilter(filter: WalletFilter): void {
    this.walletFilter.set(filter);
  }

  addChild(): void {
    if (!this.newChild.name.trim() || !this.newChild.birthDate) {
      return;
    }

    const id = this.newChild.name
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const child: Child = {
      id: `${id || 'crianca'}-${Date.now()}`,
      name: this.newChild.name.trim(),
      birthDate: this.newChild.birthDate,
      gender: this.newChild.gender || undefined,
    };

    this.children.update((children) => [...children, child]);
    this.selectedChildId.set(child.id);
    this.newChild = { name: '', birthDate: '', gender: '' };
  }

  markAsApplied(item: VaccinePlanItem): void {
    const alreadyApplied = this.records().some(
      (record) => record.childId === item.childId && record.vaccineId === item.vaccine.id,
    );

    if (item.status === 'completed' || alreadyApplied) {
      return;
    }

    this.records.update((records) => [
      ...records,
      {
        id: `record-${Date.now()}`,
        childId: item.childId,
        vaccineId: item.vaccine.id,
        appliedDate: this.toInputDate(this.today),
      },
    ]);
  }

  formatDate = (date: Date | string): string => {
    const value = typeof date === 'string' ? this.parseDateOnly(date) : date;
    if (!value) {
      return 'Data invalida';
    }

    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(value);
  };

  statusLabel = (status: VaccineStatus): string => {
    const labels: Record<VaccineStatus, string> = {
      completed: 'Aplicada',
      pending: 'Pendente',
      overdue: 'Atrasada',
    };

    return labels[status];
  };

  getAgeInMonths = (birthDate: string): number => {
    const birth = this.parseDateOnly(birthDate);
    if (!birth) {
      return 0;
    }

    const today = this.startOfToday();
    let months = (today.getFullYear() - birth.getUTCFullYear()) * 12 + today.getMonth() - birth.getUTCMonth();

    if (today.getDate() < birth.getUTCDate()) {
      months -= 1;
    }

    return Math.max(months, 0);
  };

  private addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  private startOfToday(): Date {
    return new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
  }

  private parseDateOnly(date: string): Date | null {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
    if (!match) {
      return null;
    }

    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    const parsed = new Date(Date.UTC(year, month - 1, day));

    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  private toInputDate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }
}
