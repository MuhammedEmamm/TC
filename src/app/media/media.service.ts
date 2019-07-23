import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoint } from '../../config/config';
@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http : HttpClient) { }
  GetMedia(){
    return this.http.get(endpoint('Media')) ; 
  }
}
