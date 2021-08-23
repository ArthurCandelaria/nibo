import { Component, Input, OnInit } from '@angular/core';
import { Teams } from '../register/register';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() teams!: Teams;

  constructor() { }

  ngOnInit(): void {
  }

  reciverFeedback(event: Teams) {
    this.teams = event;
  }

}
