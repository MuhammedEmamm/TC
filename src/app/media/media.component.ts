import { Component, OnInit } from '@angular/core';
import { MediaService } from './media.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  constructor(private mediasev : MediaService) { }
  Media:{
    Id:any,
    MediaURL:any ,
    Title:any,
    Content:any
  }[] = [] ; 
  GetAllMedia(){
    this.mediasev.GetMedia().subscribe((res:any)=>{
      this.Media = res ; 
      for(let i = 0 ; i<this.Media.length ; i++ ){
        this.Media[i].MediaURL = 'http://yakensolution.cloudapp.net/Segada' + this.Media[i].MediaURL ; 
      }
    }) ; 
  }
  ngOnInit() {
    this.GetAllMedia() ; 
  }

}
