import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { ServicesService } from './services.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
  providers: [ServicesService]
})
export class ServicesComponent implements OnInit {

  constructor(private servcie: ServicesService, private modal: NgbModal, private formBuilder: FormBuilder) { }
  @ViewChild('RequestService') RequestService: TemplateRef<any>;

  RequestServiceForm: FormGroup = this.formBuilder.group({
    ServiceName: ['', [Validators.required, Validators.email]],
    Name: ['', Validators.required],
    CompanyName: ['', Validators.required],
    PhoneNumber: ['', Validators.required],
    Email: ['', [Validators.required, Validators.email]],
    Member: ['', Validators.required],
    MemberShipNumber: ['', Validators.required]
  });
  submitted = false;
  Services: {
    Id: any,
    Name: any,
    Description: any,
    ShowInLatestUpdates: any
  }[] = [];
  get s() { return this.RequestServiceForm.controls; }

  GetAllServices() {
    this.servcie.GetService().subscribe((res: any) => {
      this.Services = res;
      console.log(this.Services)
    });
  }
  ServiceDetails(Id: any) {
    this.RequestServiceForm.patchValue({
      ServiceName: this.Services.filter(it => it['Id'] == Id)[0].Name

    }) ;
    console.log(Id) ; 
     this.modal.open(this.RequestService , {size:'lg'}) ; 
  }
  RequestServices(){
    this.submitted = true; 
    if (this.RequestServiceForm.invalid) {
      return;
    }
    this.submitted = false ; 
  }
  ngOnInit() {
    this.GetAllServices();
  }

}
