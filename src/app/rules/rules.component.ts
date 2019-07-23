import { Component, OnInit } from '@angular/core';
import { RulesService } from './rules.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css'],
  providers: [RulesService]

})
export class RulesComponent implements OnInit {

  constructor(private rulesev : RulesService) { }

  Rules:{
    Id: any,
    Name: any,
    Description: any,
    PDFFileURL: any,
    ShowInLatestUpdates: any
  }[] = [] ; 

  GetRules(){
    this.rulesev.GetRules().subscribe((res:any)=>{
      this.Rules = res ; 
    }) ; 
  }

  ngOnInit() {
    this.GetRules() ; 
  }

}
