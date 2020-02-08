import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private http: HttpClient) { }

  public getTopHits(): Observable<any> {
    return this.http.get(environment.baseUrl + 'urls/1/' + environment.topUrlsToShow);
  }

  public getShortUrl(url): Observable<any> {
    return this.http.post(environment.baseUrl + 'url', {longUrl: url});
  }
}
