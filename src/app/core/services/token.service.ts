import { Injectable } from '@angular/core';

const TOKEN = 'ACCESS_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  public removeToken(): void {
    localStorage.removeItem(TOKEN);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  public isValidToken(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const values = this._getTokenPayloadDecoded(token);
    return !this._tokenExpired(values.exp);
  }

  public getIdFromToken(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const values = this._getTokenPayloadDecoded(token);
    return values.id;
  }

  public getClientIdFromToken(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const values = this._getTokenPayloadDecoded(token);
    return values.personId;
  }

  public getRoleFromToken(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    
    const values = this._getTokenPayloadDecoded(token);
    return values.role;
  }

  public isLogged(): boolean {
    if (this.getToken() && this.isValidToken()) {
      return true;
    }
    return false;
  }

  private _tokenExpired(expiration: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }

  private _getTokenPayloadDecoded(token: string): any {
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    return JSON.parse(payloadDecoded);
  }

}
