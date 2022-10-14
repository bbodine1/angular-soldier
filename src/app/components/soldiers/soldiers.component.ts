import { Component, OnInit } from '@angular/core';

import { Soldier } from '../../models/soldier';
import { SoldierService } from '../../services/soldier.service';

@Component({
  selector: 'app-soldiers',
  templateUrl: './soldiers.component.html',
  styleUrls: ['./soldiers.component.scss'],
})
export class SoldiersComponent implements OnInit {
  soldiers: Soldier[] = [];

  constructor(private soldierService: SoldierService) {}

  ngOnInit(): void {
    this.getSoldiers();
  }

  getSoldiers(): void {
    this.soldierService
      .getSoldiers()
      .subscribe((soldiers) => (this.soldiers = soldiers));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.soldierService
      .addSoldier({ lastname: name } as Soldier)
      .subscribe((soldier) => {
        this.soldiers.push(soldier);
      });
  }

  delete(soldier: Soldier): void {
    this.soldiers = this.soldiers.filter((h) => h !== soldier);
    this.soldierService.deleteSoldier(soldier.id).subscribe();
  }
}
