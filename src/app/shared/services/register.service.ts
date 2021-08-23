import { Injectable } from '@angular/core';
import { Team, Teams } from 'src/app/components/register/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  //this service is to store information on localstorage 
  getTeams() {
    return JSON.parse('' + localStorage.getItem('teams') + '');
  }

  //delete localstorage information
  deleteTeam(teams: Teams ,team: Team) {
    localStorage.setItem('teams', JSON.stringify(
      teams.filter((element: { id: string; }) => element.id !== team.id)
    ));
  }

}
