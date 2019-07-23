import { Component, OnInit, ViewChild, TemplateRef, ElementRef, EventEmitter } from '@angular/core';
import { EventsService } from './events.service';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject, Observable } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private eventsev: EventsService, private el: ElementRef, private modal: NgbModal, private formBuilder: FormBuilder) { }
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
  Cats: {
    Id: any,
    Name: any
  }[] = [];
  Cat: any = '';
  Type: any = '';
  loading: boolean = true;
  date: Date = new Date();
  notFound: boolean = false;
  Events: {
    Id: any,
    TypeId: any,
    TypeName: any,
    Name: any,
    ImageURL: any,
    Description: any,
    Date: any
  }[] = [];

  EventsDay: {
    Id: any,
    TypeId: any,
    TypeName: any,
    Name: any,
    ImageURL: any,
    Description: any,
    Date: any
  }[] = [];
  FilterdEvents: {
    Id: any,
    TypeId: any,
    TypeName: any,
    Name: any,
    ImageURL: any,
    Description: any,
    Date: any
  }[] = [];
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    this.date = date;
    let e = this.el.nativeElement.querySelector('#event');
    e.scrollIntoView({ behavior: "smooth", block: "start" });
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;

      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      }
      else {
        this.activeDayIsOpen = true;
      }
    }

  }
  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
  }
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  setView(view: CalendarView) {
    this.view = view;
  }
  GetCategories() {
    this.eventsev.GetCats().subscribe((res: any) => {
      this.Cats = res;
    });
  }
  GetAllEvents() {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var lastDay = new Date(y, m + 1, 0).getDate();
    for (let i = 1; i <= lastDay; i++) {
      this.eventsev.GetEvents((m + 1) + '-' + i + '-' + y).subscribe((res: any) => {
        this.events = [];
        this.Events = this.Events.concat(res);
        for (let i = 0; i < this.Events.length; i++) {
          this.Events[i].ImageURL = 'http://yakensolution.cloudapp.net/Segada' + this.Events[i].ImageURL;
        }
        for (let i = 0; i < this.Events.length; i++) {
          let color;
          if (this.Events[i].TypeId == '1')
            color = colors.red;
          else if (this.Events[i].TypeId == '2')
            color = colors.blue;
          else
            color = colors.yellow;

          this.events.push({
            start: new Date(this.Events[i].Date),
            title: this.Events[i].Name,
            color: color,
          })
        }
        this.refresh.next();


      });

    }

  }
  GetEventbyMonth() {
    this.EventsDay = [];
    let date = new Date(this.date);
    this.loading = true;
    this.notFound = false;
    this.eventsev.GetEvents((date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear()).subscribe((res: any) => {
      this.EventsDay = res;
      console.log(this.EventsDay);
      this.FilterdEvents = this.EventsDay;
      this.loading = false;
      for (let i = 0; i < this.EventsDay.length; i++) {
        this.EventsDay[i].ImageURL = 'http://yakensolution.cloudapp.net/Segada' + this.EventsDay[i].ImageURL;
      }
      if (this.EventsDay.length)
        this.notFound = false;
      else
        this.notFound = true;
    });

  }
  Filter(type: any, cat: any) {
    let e = this.el.nativeElement.querySelector('#event');
    e.scrollIntoView({ behavior: "smooth", block: "start" });
    if (!type) {
      this.FilterdEvents = this.EventsDay;
      return;
    }
    else {
      this.FilterdEvents = this.EventsDay.filter(it => it['TypeId'] == type);
    }

  }
  get s() { return this.RequestServiceForm.controls; }
  ServiceDetails(Id: any) {
    this.RequestServiceForm.patchValue({
      ServiceName: this.EventsDay.filter(it => it['Id'] == Id)[0].Name
    });
    this.modal.open(this.RequestService, { size: 'lg' });
  }
  ngOnInit() {
    this.GetCategories();
    this.GetEventbyMonth();
    this.GetAllEvents();
  }

}
