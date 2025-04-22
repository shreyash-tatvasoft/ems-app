import { IApplyFiltersKey } from "@/utils/types";

export interface IEventDetailPageProps {
    params: Promise<{ eventId: string }>;
}

export interface LabelValue {
    label: string;
    value: string;
    rowKey : keyof IApplyFiltersKey
  }