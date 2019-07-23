import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailsService {

  constructor(private http : HttpClient) { }
  GetMember(Id : any){
    return this.http.get(endpoint('GetMember') +'Id='+Id) ; 
  }
}
