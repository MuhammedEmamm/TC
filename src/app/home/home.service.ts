import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  GetAbout() {
    return this.http.get(endpoint('AboutRoom'));
  }
  GetBanners() {
    return this.http.get(endpoint('Banners'));
  }
  GetMembers() {
    return this.http.get(endpoint('Members'));
  }
  GetEvents(date : any) {
    return this.http.get(endpoint('Events') +`date=${date}`);
  }
  GetService(){
    return this.http.get(endpoint('Services')) ; 
  }
  GetNews(){
    return this.http.get(endpoint('News')) ; 
  }
  GetRules(){
    return this.http.get(endpoint('Rules')) ; 
  }
}
