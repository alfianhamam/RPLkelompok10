import { EventService } from './../event.service';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  dt_event;

  constructor(
    public http: Http,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.dt_event = this.eventService.currentEvent;
    console.log(this.eventService.currentEvent);
  }
}
