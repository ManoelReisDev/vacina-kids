export type VaccineStatus = 'completed' | 'pending' | 'overdue';
export type WalletFilter = 'all' | VaccineStatus;
export type View = 'dashboard' | 'children' | 'wallet' | 'campaigns';

export interface Child {
  id: string;
  name: string;
  birthDate: string;
  gender?: string;
}

export interface Vaccine {
  id: string;
  name: string;
  description: string;
  recommendedAgeMonths: number;
}

export interface VaccineRecord {
  id: string;
  childId: string;
  vaccineId: string;
  appliedDate: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  targetAudience: string;
  minAgeMonths: number;
  maxAgeMonths: number;
}

export interface ActiveCampaign extends Campaign {
  relevant: boolean;
}

export interface VaccinePlanItem {
  childId: string;
  vaccine: Vaccine;
  scheduledDate: Date;
  appliedDate?: Date;
  status: VaccineStatus;
}

export interface VaccineStats {
  completed: number;
  pending: number;
  overdue: number;
}

export interface NewChildForm {
  name: string;
  birthDate: string;
  gender: string;
}
