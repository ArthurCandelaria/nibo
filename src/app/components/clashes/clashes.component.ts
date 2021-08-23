import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/shared/services/register.service';
import { Team, Teams } from '../register/register';
import { Clashe, Clashes } from './clashes';

@Component({
  selector: 'app-clashes',
  templateUrl: './clashes.component.html',
  styleUrls: ['./clashes.component.scss']
})
export class ClashesComponent implements OnInit {

  teams!: Teams;
  shuffleTeams: any;

  semi: any;
  final: any;
  champion?: Clashe;

  constructor(
    private registerService: RegisterService,
  ) { }

  ngOnInit(): void {
    this.teams = this.registerService.getTeams();
    this.shuffleTeams = this.shuffler(this.teams);
    this.semi = this.switching(this.shuffleTeams);
  }

  //method to shuffle array
  shuffler(teams: Teams) {
    const newArray = [];
    let number = Math.floor(Math.random() * teams.length);
    let count = 1;
    newArray.push(teams[number]);

    while (count < teams.length) {
      const newNumber = Math.floor(Math.random() * teams.length);
      if (!newArray.includes(teams[newNumber])) {
        count++;
        number = newNumber;
        newArray.push(teams[number]);
      }
    }
    return newArray;
  }
  //method to shuffle array

  //population variables for like fases
  switching(clashes: Clashes) {
    let newFase = new Array();
    clashes.forEach((element: Team) => {
      const team: Clashe = {
        teamName: element.teamName,
        points: undefined,
        region: element.region,
        id: element.id
      }
      newFase.push(team)
    });
    return newFase;
  }
  //population variables for like fases

  draw() {
    alert('Neste torneio não existem empates.');
  }

  //validates that all teams received points
  checkPoints(semiFinals: Clashes) {
    let check = true
    semiFinals.forEach((element: Clashe) => {
      if (element.points == null) {
        check = false
      }
    });
    if (!check) {
      alert('Você deve informar os pontos de todas as equipes');
    }
    return check;
  }
  //validates that all teams received points

  //define finalists
  closeSemi() {
    delete this.champion;
    if (this.checkPoints(this.semi)) {
      if (this.semi[0].points !== this.semi[1].points && this.semi[2].points !== this.semi[3].points) {
        const key1 = this.semi[0].points > this.semi[1].points ? this.semi[0] : this.semi[1];
        const key2 = this.semi[2].points > this.semi[3].points ? this.semi[2] : this.semi[3];

        this.final = new Array();
        this.final.push(key1, key2)
        this.final = this.switching(this.final);

      } else {
        return this.draw();
      }
    }
  }
  //define finalists

  //define champion
  closeFinal() {
    if (this.checkPoints(this.final)) {
      if (this.final[0].points !== this.final[1].points) {
        this.champion = this.final[0].points > this.final[1].points ? this.final[0] : this.final[1];
      } else {
        return this.draw();
      }
    }
  }
  //define champion

}
