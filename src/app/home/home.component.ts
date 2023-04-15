import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api-service/api.service';
import { SelectedTeamDetails, TeamDetail} from 'src/app/helpers/type-helpers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  teams: TeamDetail[] = [];
  selectedTeam: string = 'Select a team';
  pastDate: string[] = [];
  listOfTeams: SelectedTeamDetails[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getTeamInfo();

    if (sessionStorage.getItem('result') != null) {
      this.listOfTeams = JSON.parse(sessionStorage.getItem('result')!);
    }
  }

  getTeamInfo(): void {
    this.api.getTeamInfo().subscribe({
      next: (resp) => {
        this.teams = resp.data;
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  trackTeam(): void {
    if(this.selectedTeam != 'Select a team'){
      let teamChecked: boolean = false;
  
      this.listOfTeams.forEach((element) => {
        if (element.id == this.selectedTeam) {
          teamChecked = true;
        }
      });
      
      if (!teamChecked) {
        this.getTeamResults();
      }
    }
  }

  getTeamResults(): void {
    this.api.getTeamResults(this.selectedTeam).subscribe({
      next: (resp) => {
        console.log(resp)
        let id: string = '';
        let name: string = '';
        let conference: string = '';
        let abbreviation: string = '';
        let homeTeam: string[] = [];
        let homeTeamScore: string[] = [];
        let visitorTeam: string[] = [];
        let visitorTeamScore: string[] = [];
        let tempWinOrLoss: string[] = [];
        let teamScored: number = 0;
        let teamConceded: number = 0;
  
        resp.data.forEach((value) => {
          homeTeam.push(value.home_team.abbreviation);
          homeTeamScore.push(value.home_team_score);
          visitorTeam.push(value.visitor_team.abbreviation);
          visitorTeamScore.push(value.visitor_team_score);
  
          if (value.home_team.id == this.selectedTeam) {
            name = value.home_team.full_name;
            id = value.home_team.id;
            abbreviation = value.home_team.abbreviation;
            conference = value.home_team.conference;
  
            teamScored = teamScored + Number(value.home_team_score);
            teamConceded = teamConceded + Number(value.visitor_team_score);
  
            if (value.home_team_score > value.visitor_team_score) {
              tempWinOrLoss.push('W');
            } else if (value.home_team_score < value.visitor_team_score) {
              tempWinOrLoss.push('L');
            }
          } else {
            name = value.visitor_team.full_name;
            abbreviation = value.visitor_team.abbreviation;
            conference = value.visitor_team.conference;
            id = value.visitor_team.id;
  
            teamScored = teamScored + Number(value.visitor_team_score);
            teamConceded = teamConceded + Number(value.home_team_score);
  
            if (value.home_team_score < value.visitor_team_score) {
              tempWinOrLoss.push('W');
            } else if (value.home_team_score > value.visitor_team_score) {
              tempWinOrLoss.push('L');
            } else {
              return;
            }
          }
        });
  
        this.listOfTeams.push({
          id: id,
          name: name,
          conference: conference,
          abbreviation: abbreviation,
          avgTeamScored: Math.round(teamScored / resp.data.length),
          avgTeamConceded: Math.round(teamConceded / resp.data.length),
          winOrLoss: tempWinOrLoss,
          results: {
            homeTeam: homeTeam,
            homeTeamScore: homeTeamScore,
            visitorTeam: visitorTeam,
            visitorTeamScore: visitorTeamScore,
          },
        });
        sessionStorage.setItem('result', JSON.stringify(this.listOfTeams));
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  remove(i: number): void {
    this.listOfTeams.splice(i, 1);
    sessionStorage.setItem('result', JSON.stringify(this.listOfTeams));
  }

  fetch(teamDetails: SelectedTeamDetails): void {
    this.router.navigate([`/results/${teamDetails.id}`]);
  }
}
