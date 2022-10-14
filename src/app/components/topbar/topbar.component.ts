import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, Observable, of } from "rxjs";

import { Soldier } from "../../models/soldier";
import { SoldierService } from "../../services/soldier.service";

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"]
})
export class TopbarComponent {
  @Input()
  title: string;

  soldier$: Observable<Soldier> = this.soldierService.getCurrentSoldier$();
  title$ = this.soldier$.pipe(
    map((soldier) => {
      if (soldier === undefined) {
        return this.title;
      }
      return soldier.lastname;
    })
  );

  constructor(private soldierService: SoldierService) {}
}
