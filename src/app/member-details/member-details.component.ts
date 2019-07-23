import { MemberDetailsService } from './member-details.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private memdetsev: MemberDetailsService) { }
  CompID: any = this.route.snapshot.paramMap.get('id');
  Member: {
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
    DivisionId: any,
    City: {
      Id: any,
      Name: any
    },
    Division: {
      Id: any,
      Name: any
    }
  } = {
      Id: '',
      CompanyName: '',
      LogoURL: '',
      Address: '',
      WebLink: '',
      ContactNumber: '',
      Products: '',
      Password: '',
      UserName: '',
      CityId: '',
      DivisionId: '',
      City: {
        Id: '',
        Name: ''
      },
      Division: {
        Id: '',
        Name: ''
      }
    }
  GetMemberDetails() {
    this.memdetsev.GetMember(this.CompID).subscribe((res: any) => {
      this.Member = res;
    });
  }
  ngOnInit() {
    this.GetMemberDetails() ; 
  }

}
