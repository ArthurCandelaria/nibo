import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UniqueIdService } from 'src/app/shared/services/unique-id.service';
import { Team, Teams } from './register';
import { RegisterService } from '../../shared/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() listener = new EventEmitter();

  teamValoran!: FormGroup;
  typesTeam = [
    'Demacia',
    'Noxus'
  ];
  content?: Team;

  constructor(
    private formBuilder: FormBuilder,
    private uniqueIdService: UniqueIdService,
    private registerService: RegisterService
  ) { }

  ngOnInit(): void {

    this.teamValoran = this.formBuilder.group({
      teamName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      region: ['', [Validators.required]],
      id: [null]
    })

  }

  registerTeam() {

    let teams = this.registerService.getTeams();

    if (!this.checkName(teams)) {
      alert('Este nome está já sendo utilizado por outra equipe!');
      return;
    }

    this.teamValoran.get('id')?.setValue(this.uniqueIdService.generateUniqueId());

    this.content = Object.assign(this.teamValoran.value, this.content);

    if (teams === null) {
      localStorage.setItem('teams', JSON.stringify([this.content]));
    } else if (teams.length == 4) {
      alert('Você já atingiu o número máximo de equipes!');
      return
    }
    else {
      let newTeams = [this.content];
      teams.forEach((element: Team) => {
        newTeams.push(element);
      });
      localStorage.setItem('teams', JSON.stringify(newTeams));
    }

    this.teamValoran.reset();
    delete (this.content);
    alert('Equipe registrada com sucesso!');

    this.feedback();

  }

  checkName(teams: Teams) {

    let verify = true;

    if (teams === null) {
      return verify;
    }

    teams.forEach((element: Team) => {
      if (element.teamName === this.teamValoran.get('teamName')?.value) {
        verify = false
      }
    });
    return verify;
  }

  feedback() {
    this.listener.emit(this.registerService.getTeams());
  }

}
