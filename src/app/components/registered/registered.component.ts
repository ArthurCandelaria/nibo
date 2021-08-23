import { Component, Input, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/shared/services/register.service';
import { Team } from '../register/register';

@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.scss']
})
export class RegisteredComponent implements OnInit {

  @Input() teams: any;

  constructor(
    private registerService: RegisterService,
  ) { }

  ngOnInit(): void {
    this.teams = this.registerService.getTeams();   
  }

  deleteTeam(team: Team) {
    this.registerService.deleteTeam(this.teams, team);
    this.teams = this.registerService.getTeams();
  }

}
