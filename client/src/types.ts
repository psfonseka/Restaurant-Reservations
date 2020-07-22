export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
};

export interface DiningRegion {
  id: number,
  region_name: string
};

export interface SearchEntry {
  fullName: string,
  email: string,
  phoneNumber: string,
  partySize: number,
  hasSmoker: boolean,
  hasBirthday: boolean,
  hasChildren: boolean,
  birthdayName: string
};

export interface TimeDaySlot {
  time_string: string,
  date: string,
  taken: boolean
};

export interface TimeSlot {
  time: string,
  taken: boolean,
  selected: boolean
};

export interface DaySlots {
  [key: string]: Array<TimeSlot>
};

export interface State {
  availableRegions: Array<DiningRegion>,
  matched: boolean,
  search: Partial<SearchEntry>
  regionSelectedId: number,
  regionSelectedName: string,
  reservationSlots: DaySlots,
  timeSelectedId: number,
  dateSelected: string
}
