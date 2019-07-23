import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http: HttpClient) { }

  GetVisions() {
    return this.http.get(endpoint('Vision'));
  }
  GetAbouts() {
    return this.http.get(endpoint('AboutRoom'));
  }
  GetPlanss() {
    return this.http.get(endpoint('Plans'));
  }
  GetBoards() {
    return this.http.get(endpoint('Boards'));
  }
  GetEmpss() {
    return this.http.get(endpoint('Employees'));
  }

}
