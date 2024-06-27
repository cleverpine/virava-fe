import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private config: any;

  constructor(private httpClient: HttpClient) {}

  public loadConfig() {
    return firstValueFrom(
      this.httpClient.get('./../../assets/config/config.json')
    )
      .then((config: any) => {
        this.config = config;
        return config;
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  public getBasePath(): string {
    return this.config?.basePath;
  }

  public isProd(): boolean {
    return this.config?.production;
  }

  public getSsoServerUrl(): string {
    return this.config?.ssoServerUrl;
  }

  public getSsoServerRealm(): string {
    return this.config?.ssoServerRealm;
  }

  public getSsoServerClientId(): string {
    return this.config?.ssoServerClientId;
  }
}

export const PROD = new InjectionToken<string>('production');
