import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Soldier } from '../../models/soldier';
import { SoldierService } from '../../services/soldier.service';

@Component({
  selector: 'app-soldier-search',
  templateUrl: './soldier-search.component.html',
  styleUrls: ['./soldier-search.component.scss'],
})
export class SoldierSearchComponent implements OnInit {
  soldiers$!: Observable<Soldier[]>;
  private searchTerms = new Subject<string>();

  constructor(private soldierService: SoldierService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.soldiers$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.soldierService.searchSoldiers(term))
    );
  }
}
