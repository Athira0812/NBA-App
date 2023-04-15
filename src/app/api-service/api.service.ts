import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { MatchResponse, TeamResponse } from '../helpers/type-helpers';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    'X-RapidAPI-Key': environment.key,
    'X-RapidAPI-Host': environment.host,
  });

  setToPastDates():string[]{
    const pastDate = [];
    const currentDate: Date = new Date();
    for (let i = 0; i < 12; i++) {
      const d: Date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - i
      );
      const dateString: string = d.toISOString().slice(0, 10);
      pastDate.push(dateString);
    }
    return pastDate
  }

  getTeamInfo(): Observable<TeamResponse> {
    return this.http.get<TeamResponse>(`${environment.BASE_URL}/teams`, {
      headers: this.headers,
    });
  }

  getTeamResults(data: string): Observable<MatchResponse> {
    let requestParams: HttpParams = new HttpParams();
    this.setToPastDates().forEach((date: string) => {
      requestParams = requestParams.append('dates[]', date);
    });
    requestParams = requestParams.append('team_ids[]', data);
    return this.http.get<MatchResponse>(`${environment.BASE_URL}/games`, {
      headers: this.headers,
      params: requestParams,
    });
  }
}
