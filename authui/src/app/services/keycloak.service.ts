import { Injectable } from '@angular/core';
import Keycloak, { KeycloakProfile as UserProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private readonly _keycloak: Keycloak;
  private _profile: UserProfile | undefined;

  get keycloak() {
    return this._keycloak;
  }

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  constructor() {
    // Create the Keycloak instance ONCE
    this._keycloak = new Keycloak({
      url: 'http://localhost:9090',
      realm: 'auth_flow',
      clientId: 'authflow'
    });
  }

  async init() {
    const authenticated: boolean = await this._keycloak.init({
      onLoad: 'login-required'
    });
    if (authenticated) {
      this._profile = (await this._keycloak.loadUserProfile()) as UserProfile;
      // If you want to store the token in the profile, extend UserProfile interface
      (this._profile as any).token = this._keycloak.token || '';
    }
  }

  login() {
    return this._keycloak.login();
  }

  logout() {
    return this._keycloak.logout();
  }
}