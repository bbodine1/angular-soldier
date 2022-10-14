import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Soldier } from '../../models/soldier';
import { SoldierService } from '../../services/soldier.service';

@Component({
  selector: 'app-soldier-detail',
  templateUrl: './soldier-detail.component.html',
  styleUrls: ['./soldier-detail.component.scss'],
})
export class SoldierDetailComponent implements OnInit {
  soldier?: Soldier;

  constructor(
    private route: ActivatedRoute,
    private soldierService: SoldierService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSoldier();
  }

  getSoldier(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.soldierService
      .getSoldier(id)
      .subscribe((soldier) => (this.soldier = soldier));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.soldier) {
      this.soldierService
        .updateSoldier(this.soldier)
        .subscribe(() => this.goBack());
    }
  }
}
