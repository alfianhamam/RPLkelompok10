import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  data: any;
  constructor(private newsService: NewsService, private route: Router) { }

  ngOnInit() {
    this.newsService.getData('everything?q=pengobatan&q=kesehatan&q=kebugaran').subscribe(data => {
      console.log(data);
      this.data = data;
    })
  }

  openNews(article) {
    this.newsService.currentArticle = article;
    window.open(this.newsService.currentArticle.url, '_self');
  }

}