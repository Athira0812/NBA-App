import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamScores, SelectedTeamDetails } from 'src/app/helpers/type-helpers';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.css']
})

export class ResultsPageComponent {

  matchScores: TeamScores[] = [];
  teamDetails: SelectedTeamDetails = {
    name: '',
    abbreviation: '',
    conference: '',
    results: {
      homeTeam: [],
      visitorTeam: [],
      homeTeamScore: [],
      visitorTeamScore: [],
    },
    avgTeamConceded: 0,
    avgTeamScored: 0,
    id: '0',
    winOrLoss: []
  };
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const teamCode = Number(this.route.snapshot.paramMap.get('teamCode'));
    const response = JSON.parse(sessionStorage.getItem('result')!).find(
      (team: SelectedTeamDetails) => +team.id === teamCode
    );
    this.teamDetails = response;
    this.getResult(response);
  }

  getResult(data: SelectedTeamDetails): void {
    for (let i = 0; i < data.results.homeTeam.length; i++) {
      const temp: TeamScores = {
        homeTeam: data.results.homeTeam[i],
        homeTeamScore: data.results.homeTeamScore[i],
        visitorTeam: data.results.visitorTeam[i],
        visitorTeamScore: data.results.visitorTeamScore[i],
      };
      this.matchScores.push(temp);
    }
  }
}
