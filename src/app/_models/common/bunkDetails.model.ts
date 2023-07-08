import { Location } from "./location.model";

export interface BunkDetails{
  sizeOfGroup: number;
  bunkDate: string;
  startTime?: string;
  endTime?: string;
  isTimeBound?: number;
  medium?: string;
  note?: string;
  location: Location;
  radius?: number;
  budget?: {min: number, max: number};
  category?: number;
  search?: string;
}
