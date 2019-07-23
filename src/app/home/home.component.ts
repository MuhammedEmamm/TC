import { Component, OnInit, ViewChild, TemplateRef, ElementRef, EventEmitter } from '@angular/core';
import { HomeService } from './home.service';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject, Observable } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})

export class HomeComponent implements OnInit {

  constructor(private homeserv: HomeService, private el: ElementRef) {}
  Services: {
    Id: any,
    Name: any,
    Description: any,
    ShowInLatestUpdates: any
  }[] = [];
  News: {
    Id: any,
    ImageURL: any,
    Address: any,
    Content: any,
    VideoURL: any,
    ShowInLatestUpdates: any
  }[] = [];
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

  p: number = 1;

  Banners: {
    Id: any,
    Name: any,
    URL: any
  }[] = [];

  About: {
    Id: any,
    AboutTheRoom1: any
  } = {
      Id: '',
      AboutTheRoom1: ''
    };

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
  Rules:{
    Id: any,
    Name: any,
    Description: any,
    PDFFileURL: any,
    ShowInLatestUpdates: any
  }[] = [] ;
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
  GetAbout() {
    this.homeserv.GetAbout().subscribe((res: any) => {
      this.About = res[0];
    });
  }
  GetAllMembers() {
    this.homeserv.GetMembers().subscribe((res: any) => {
      this.Members = res;
      for (let i = 0; i < this.Members.length; i++) {
        this.Members[i].LogoURL = 'http://yakensolution.cloudapp.net/Segada' + this.Members[i].LogoURL;
      }
      if (document.getElementById('loading'))
        document.getElementById('loading').style.display = 'none';
    });
  }
  GetAllEvents() {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var lastDay = new Date(y, m + 1, 0).getDate();
    for (let i = 1; i <= lastDay; i++) {
      this.homeserv.GetEvents((m + 1) + '-' + i + '-' + y).subscribe((res: any) => {
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
    this.homeserv.GetEvents((date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear()).subscribe((res: any) => {
      this.EventsDay = res;
      console.log(this.EventsDay);
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
  GetBanners() {
    this.homeserv.GetBanners().subscribe((res: any) => {
      this.Banners = res;
    });
  }
  GetAllServices() {
    this.homeserv.GetService().subscribe((res: any) => {
      this.Services = res;
      console.log(this.Services) ;

    });
  }
  GetAllNews() {
    this.homeserv.GetNews().subscribe((res: any) => {
      this.News = res;
      for (let i = 0; i < this.News.length; i++) {
        this.News[i].ImageURL = 'http://yakensolution.cloudapp.net/Segada' + this.News[i].ImageURL;
      }
      
    });
  }
  GetRules(){
    this.homeserv.GetRules().subscribe((res:any)=>{
      this.Rules = res ; 
    }) ; 
  }
  ngOnInit() {
    this.GetAbout();
    this.GetAllMembers();
    this.GetBanners();
    this.GetAllEvents();
    this.GetEventbyMonth();
    this.GetAllServices() ;
    this.GetAllNews() ; 
    this.GetRules() ; 
  }

}
