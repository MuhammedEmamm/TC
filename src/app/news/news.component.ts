import { Component, OnInit } from '@angular/core';
import { NewsService } from './news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private newsev: NewsService) { }

  News: {
    Id: any,
    ImageURL: any,
    Address: any,
    Content: any,
    VideoURL: any,
    ShowInLatestUpdates: any
  }[] = [];
  GetAllNews() {
    this.newsev.GetNews().subscribe((res: any) => {
      this.News = res;
      for (let i = 0; i < this.News.length; i++) {
        this.News[i].ImageURL = 'http://yakensolution.cloudapp.net/Segada' + this.News[i].ImageURL;
      }
      
    });
  }
  ngOnInit() {
    this.GetAllNews();
  }

}
