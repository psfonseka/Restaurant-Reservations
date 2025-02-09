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

export interface ReservationInfo {
  regionId: number,
  reservationTime: string,
  reservationDate: string,
  reservationTimeId: number
};

export interface SearchEntry {
  fullName: string,
  email: string,
  phoneNumber: string,
  partySize: number,
  hasSmoker: boolean,
  hasBirthday: boolean,
  hasChildren: boolean,
  childrenNumber: number,
  birthdayName: string
};

export interface SocketHelper<T = any> {
  socket: T,
  realTimeUpdate: (reservation: ReservationInfo) => void
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

export interface FullInfo {
  guestInfo: SearchEntry,
  regionInfo: DiningRegion,
  reservationDate: string,
  reservationTime: string,
  reservationTimeId: number,
  confirmed: boolean
}
