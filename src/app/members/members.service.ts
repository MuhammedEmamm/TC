import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http : HttpClient) { }
  GetMembers() {
    return this.http.get(endpoint('Members'));
  }
  GetCities(){
    return this.http.get(endpoint('Cities')) ; 
  }
  GetDivs(){
    return this.http.get(endpoint('Divisions')) ; 
  }
  
  
}
