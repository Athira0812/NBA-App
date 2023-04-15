export interface TeamDetail {
  id: string;
  name: string;
  city: string;
  division: string;
  full_name: string;
  conference: string;
  abbreviation: string;
}

export interface TeamResponse {
  data: TeamDetail[]
}

export interface SelectedTeamDetails {
  id: string;
  name: string;
  results: TResults;
  conference: string;
  abbreviation: string;
  avgTeamScored: number;
  avgTeamConceded: number;
  winOrLoss: Array<string>;
}

export interface TResults {
  homeTeam: string[];
  visitorTeam: string[];
  homeTeamScore: string[];
  visitorTeamScore: string[];
}

export interface TeamScores {
  homeTeam: string;
  homeTeamScore: string;
  visitorTeam: string;
  visitorTeamScore: string;
}

export interface MatchResponse {
  data: MatchResults[]
}

export interface MatchResults {
  home_team: TeamDetail;
  home_team_score: string;
  visitor_team: TeamDetail;
  visitor_team_score: string;
}
