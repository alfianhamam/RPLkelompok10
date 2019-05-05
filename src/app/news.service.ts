import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



const API_URL = 'https://newsapi.org/v2'
const API_KEY = '372e3bb751074e6bbd0c64a90aa5daa4'

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  currentArticle: any;
  
  constructor(private http: HttpClient) {}

  getData(url) {
    return this.http.get(`${API_URL}/${url}&apiKey=${API_KEY}`);
  }
}