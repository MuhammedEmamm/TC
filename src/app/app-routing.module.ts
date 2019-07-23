import { EventsComponent } from './events/events.component';
import { MediaComponent } from './media/media.component';
import { ServicesComponent } from './services/services.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MembersComponent } from './members/members.component';
import { RulesComponent } from './rules/rules.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'members', component: MembersComponent },
  { path: 'rules', component: RulesComponent },
  { path: 'media', component: MediaComponent },
  { path: 'member-details/:id', component: MemberDetailsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'events', component: EventsComponent },





];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
