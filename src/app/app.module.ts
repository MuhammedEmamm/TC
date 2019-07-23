import { EventsService } from './events/events.service';
import { ServicesService } from './services/services.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxPaginationModule } from 'ngx-pagination';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, EmailValidator, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './FixedComponents/header/header.component';
import { FooterComponent } from './FixedComponents/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { HomeService } from './home/home.service';
import { ServicesComponent } from './services/services.component';
import { RulesComponent } from './rules/rules.component';
import { AboutService } from './about/about.service';
import { MembersComponent } from './members/members.component';
import { MembersService } from './members/members.service';
import { MediaComponent } from './media/media.component';
import { RulesService } from './rules/rules.service';
import { MediaService } from './media/media.service';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberDetailsService } from './member-details/member-details.service';
import { EventsComponent } from './events/events.component';
import { NewsComponent } from './news/news.component';
import { NewsService } from './news/news.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    RulesComponent,
    MembersComponent,
    MediaComponent,
    MemberDetailsComponent,
    EventsComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SlickCarouselModule,
    NgxPaginationModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [HomeService , ServicesService, EmailValidator , AboutService , MembersService, RulesService , MediaService , MemberDetailsService , NewsService , EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
