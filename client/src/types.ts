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


