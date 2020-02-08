import { Component, OnInit } from '@angular/core';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  public topUrls;
  constructor(private service: UrlService) { }

  ngOnInit() {
    this.service.getTopHits().subscribe((response) => {
      this.topUrls = response;
    });
  }
}
