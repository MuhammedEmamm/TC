import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  GetEvents(date: any) {
    return this.http.get(endpoint('Events') + `date=${date}`);
  }
  GetCats() {
    return this.http.get(endpoint('Categories'));
  }
}
