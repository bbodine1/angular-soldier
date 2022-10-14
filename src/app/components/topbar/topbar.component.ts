import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Soldier } from '../../models/soldier';
import { SoldierService } from '../../services/soldier.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  @Input()
  title: string;

  soldier?: Soldier;

  constructor(
    private route: ActivatedRoute,
    private soldierService: SoldierService
  ) {}

  ngOnInit() {
    this.getSoldier();
  }

  getSoldier(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.soldierService
      .getSoldier(13)
      .subscribe((soldier) => (this.soldier = soldier));
  }
}
