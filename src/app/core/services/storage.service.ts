import { Injectable } from '@angular/core';
import { UserNameAndToken } from '../../models/interfaces';

const STORAGE_KEYS = {
  name: 'name',
  token: 'token',
} as const;

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public getUserNameAndToken(): UserNameAndToken {
    return {
      name: localStorage.getItem(STORAGE_KEYS.name) ?? '',
      token: localStorage.getItem(STORAGE_KEYS.token) ?? '',
    };
  }

  public get userName(): string {
    return localStorage.getItem(STORAGE_KEYS.name) ?? '';
  }

  public get token(): string {
    return localStorage.getItem(STORAGE_KEYS.token) ?? '';
  }

  public setUserNameAndToken(name: string, token: string): void {
    localStorage.setItem(STORAGE_KEYS.name, name);
    localStorage.setItem(STORAGE_KEYS.token, token);
  }

  public clear(): void {
    localStorage.removeItem(STORAGE_KEYS.name);
    localStorage.removeItem(STORAGE_KEYS.token);
  }
}
