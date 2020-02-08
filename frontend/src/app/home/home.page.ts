import { Component } from '@angular/core';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public shortUrl: string;
  constructor(private service: UrlService) {}

  getShortUrl(url) {
    this.service.getShortUrl(url).subscribe((response) => {
      this.shortUrl = response.shortUrl;
    })
  }
}
