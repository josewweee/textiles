export enum Status {
    Online = 'Online',
    Offline = 'Offline',
    Busy = 'Busy',
    AppearOffline = 'Appear Offline',
    Away = 'Away'
  }
  export interface User {
    nick?: string;
    age?: number;
    active?: boolean;
    status?: Status;
    creationTime?: string;
    lastSingInTime?: string;
    uid: any;
    telefono?: number,
    email: string;
    emailVerified: boolean;
    photoURL?: string;
    shoppingCart?: any[];
  }
  