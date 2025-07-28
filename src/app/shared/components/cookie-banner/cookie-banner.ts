import { Component } from '@angular/core';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.html',
  styleUrls: ['./cookie-banner.scss'],
  standalone: true,
})
export class CookieBannerComponent {
  showBanner = !this.getCookie('cookie_consent');

  accept() {
    this.setCookie('cookie_consent', 'accepted', 365);
    this.showBanner = false;
  }

  refuse() {
    this.setCookie('cookie_consent', 'refused', 365);
    this.showBanner = false;
  }

  private setCookie(name: string, value: string, days: number) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie =
      name +
      '=' +
      encodeURIComponent(value) +
      '; expires=' +
      expires +
      '; path=/';
  }

  private getCookie(name: string): string | null {
    return (
      document.cookie
        .split('; ')
        .find((row) => row.startsWith(name + '='))
        ?.split('=')[1] || null
    );
  }
}
