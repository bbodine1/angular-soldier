import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Soldier } from '../models/soldier';

@Injectable()
export class HeroSearchService {
  constructor(private http: HttpClient) {}

  search(term: string): Observable<Soldier[]> {
    return this.http
      .get(`api/soldiers/?name=${term}`)
      .pipe(map((response) => response as Soldier[]));
  }
}
