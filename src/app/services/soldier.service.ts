import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Soldier } from '../models/soldier';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root',
})
export class SoldierService {
  private soldiersUrl = 'api/soldiers'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getSoldiers(): Observable<Soldier[]> {
    return this.http.get<Soldier[]>(this.soldiersUrl).pipe(
      tap((_) => this.log('fetched soldiers')),
      catchError(this.handleError<Soldier[]>('getSoldiers', []))
    );
  }

  /** GET soldier by id. Will 404 if id not found */
  getSoldier(id: number): Observable<Soldier> {
    const url = `${this.soldiersUrl}/${id}`;
    return this.http.get<Soldier>(url).pipe(
      tap((_) => this.log(`fetched soldier id=${id}`)),
      catchError(this.handleError<Soldier>(`getSoldier id=${id}`))
    );
  }

  /** Log a SoldierService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`SoldierService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** PUT: update the soldier on the server */
  updateSoldier(soldier: Soldier): Observable<any> {
    return this.http.put(this.soldiersUrl, soldier, this.httpOptions).pipe(
      tap((_) => this.log(`updated soldier id=${soldier.id}`)),
      catchError(this.handleError<any>('updateSoldier'))
    );
  }

  /** POST: add a new soldier to the server */
  addSoldier(soldier: Soldier): Observable<Soldier> {
    return this.http
      .post<Soldier>(this.soldiersUrl, soldier, this.httpOptions)
      .pipe(
        tap((newSoldier: Soldier) =>
          this.log(`added soldier w/ id=${newSoldier.id}`)
        ),
        catchError(this.handleError<Soldier>('addSoldier'))
      );
  }

  /** DELETE: delete the soldier from the server */
  deleteSoldier(id: number): Observable<Soldier> {
    const url = `${this.soldiersUrl}/${id}`;

    return this.http.delete<Soldier>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted soldier id=${id}`)),
      catchError(this.handleError<Soldier>('deleteSoldier'))
    );
  }

  /* GET soldiers whose name contains search term */
  searchSoldiers(term: string): Observable<Soldier[]> {
    if (!term.trim()) {
      // if not search term, return empty soldier array.
      return of([]);
    }
    return this.http
      .get<Soldier[]>(`${this.soldiersUrl}/?lastname=${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`found soldiers matching "${term}"`)
            : this.log(`no soldiers matching "${term}"`)
        ),
        catchError(this.handleError<Soldier[]>('searchSoldiers', []))
      );
  }
}
