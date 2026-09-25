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

export interface CommandSwitch {
  chess?: boolean;
  slots?: boolean;
  song?: boolean;
  tft?: boolean;
  weather?: boolean;
  wordle?: boolean;
}

export interface User {
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
}

export interface Commands {
  streamer?: string;
  rollID?: string;
  banID?: string;
  slotsID?: Slot[];
  commandSwitch?: CommandSwitch;
  wheelwinners?: string[];
}

export interface RiotUser {
  streamer?: string;
  activeRiotAccount?: ActiveRiotAccount;
  riotAccountList?: RiotAccount[];
  matchList: string[];
}

export interface SongSkipQueue {
  isActive: boolean;
  pauseAfterRequest: boolean;
  size: number;
}

export interface SongData {
  streamer?: string;
  addSongID?: string;
  volumeChanger?: VolumeSong;
  timeoutVolume?: number;
  maxVolumeTime?: number;
  endTime?: number;
  skipSongs?: SongSkipQueue;
}
