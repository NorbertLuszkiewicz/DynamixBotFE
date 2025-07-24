import { ServerName } from './enums';
import { Slot, VolumeSong, RiotAccount } from './interfaces';

export interface ActiveRiotAccount {
  date?: number;
  id?: string;
  isLol?: boolean;
  name?: string;
  lol_puuid?: string;
  lol_id?: string;
  puuid?: string;
  server?: ServerName;
}

export interface commandSwitch {
  chess?: boolean;
  slots?: boolean;
  song?: boolean;
  tft?: boolean;
  weather?: boolean;
  wordle?: boolean;
}

export type User = {
  streamer?: string;
  twitchAccessToken?: string;
  twitchRefreshToken?: string;
  kickAccessToken?: string;
  kickRefreshToken?: string;
  clientSongRequestID?: string;
  clientSongRequestSecret?: string;
  spotifyAccessToken?: string;
  spotifyRefreshToken?: string;
  isSpotifyConnected?: boolean;
  isStreamElementsConnected?: boolean;
  code?: string;
  device?: string;
};

export type Commands = {
  streamer?: string;
  rollID?: string;
  banID?: string;
  slotsID?: Slot[];
  commandSwitch?: commandSwitch;
  wheelwinners?: string[];
};

export type RiotUser = {
  streamer?: string;
  activeRiotAccount?: ActiveRiotAccount;
  riotAccountList?: RiotAccount[];
  matchList: string[];
};

export type SongData = {
  streamer?: string;
  addSongID?: string;
  volumeChanger?: VolumeSong;
  timeoutVolume?: any;
  maxVolumeTime?: number;
  endTime?: number;
  skipSongs?: {
    isActive: boolean;
    pauseAfterRequest: boolean;
    size: number;
  };
};
