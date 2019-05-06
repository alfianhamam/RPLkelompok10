import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  currentEvent: any;

  constructor(private router: Router) { }

  
}
