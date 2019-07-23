import { Component, OnInit } from '@angular/core';
import { AboutService } from './about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  providers: [AboutService]
})
export class AboutComponent implements OnInit {

  constructor(private aboutserv: AboutService) { }

  Emps: {
    Id: any,
    ImageUrl: any,
    Name: any,
    Position: any
  }[] = [];
  Board: {
    Id: any,
    ImageUrl: any,
    Name: any,
    Position: any
  }[] = [];
  About: {
    Id: any,
    AboutTheRoom1: any
  } = {
      Id: '',
      AboutTheRoom1: ''
    };
  Vision: {
    Id: any,
    Vision1: any
  } = {
      Id: '',
      Vision1: ''
    };
  Plan: {
    Id: any,
    Plans: any
  } = {
      Id: '',
      Plans: ''
    };


  GetVision() {
    this.aboutserv.GetVisions().subscribe((res: any) => {
      this.Vision = res[0];
    });
  }
  GetAbout() {
    this.aboutserv.GetAbouts().subscribe((res: any) => {
      this.About = res[0];
    });
  }
  GetPlans() {
    this.aboutserv.GetPlanss().subscribe((res: any) => {
      this.Plan = res[0];
    });
  }
  GetEmps() {
    this.aboutserv.GetEmpss().subscribe((res: any) => {
      this.Emps = res;
    });
  }
  GetBoard() {
    this.aboutserv.GetBoards().subscribe((res: any) => {
      this.Board = res;
    });
  }

  ngOnInit() {
    this.GetAbout() ;
    this.GetBoard() ;
    this.GetPlans() ;
    this.GetVision() ;
    this.GetEmps() ;

  }

}
