import { Component, OnInit } from '@angular/core';
import { MembersService } from './members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MembersService]
})
export class MembersComponent implements OnInit {

  constructor(private memserv: MembersService) { }
  Div: any = '';
  City: any = '';

  Members: {
    Id: any,
    CompanyName: any,
    LogoURL: any,
    Address: any,
    WebLink: any,
    ContactNumber: any,
    Products: any,
    Password: any,
    UserName: any,
    CityId: any,
    DivisionId: any
  }[] = [];
  FilterdMembers: {
    Id: any,
    CompanyName: any,
    LogoURL: any,
    Address: any,
    WebLink: any,
    ContactNumber: any,
    Products: any,
    Password: any,
    UserName: any,
    CityId: any,
    DivisionId: any
  }[] = [];

  Cities: {
    Members: any[],
    Id: any,
    Name: any
  }[] = [];
  Divs: {
    Id: any,
    Name: any
  }[] = [];
  GetMembers() {
    this.memserv.GetMembers().subscribe((res: any) => {
      this.Members = res;
      for (let i = 0; i < this.Members.length; i++) {
        this.Members[i].LogoURL = 'http://yakensolution.cloudapp.net/Segada' + this.Members[i].LogoURL;
      }
      this.FilterdMembers = this.Members;

      if(document.getElementById('loading'))
      document.getElementById('loading').style.display = 'none';
    });
  }
  GetCities() {
    this.memserv.GetCities().subscribe((res: any) => {
      this.Cities = res;
    });
  }
  GetDivisions() {
    this.memserv.GetDivs().subscribe((res: any) => {
      this.Divs = res;
    });
  }
  Filter(D: any, C: any) {
    if (!D && !C) {
      this.FilterdMembers = this.Members;
      return;
    }
    else if (D && !C) {
      this.FilterdMembers = this.Members.filter(it => it['DivisionId'] == D);
    }
    else if (!D && C) {
      this.FilterdMembers = this.Members.filter(it => it['CityId'] == C);
    }
    else {
      this.FilterdMembers = this.Members.filter(it => it['CityId'] == C && it['DivisionId'] == D);
    }
  }

  ngOnInit() {
    this.GetCities();
    this.GetMembers();
    this.GetDivisions();
  }

}
