import { ServerName } from './enums';

export interface RiotAccount {
  name: string;
  server: ServerName;
}

export interface MessageResponse {
  message?: string;
}

export interface StreamElementsForm {
  accountId: string;
  jwtToken: string;
}

export interface Commend {
  name?: string;
  description: string;
}

export interface CommendList {
  title?: string;
  list: Commend[];
}

export interface Slot {
  name?: string;
  withBan?: boolean;
  emotes?: number;
  times?: number;
  wins?: number;
  id?: boolean;
  lastWinners?: string[];
}

export interface UserNameAndToken {
  name: string;
  token: string;
}

export interface VolumeSong {
  id?: string;
  max?: number;
  maxSR?: number;
  min?: number;
  minSR?: number;
  time?: number;
}
