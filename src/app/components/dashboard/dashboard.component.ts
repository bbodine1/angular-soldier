import { Component, OnInit } from '@angular/core';
import { Soldier } from '../../models/soldier';
import { SoldierService } from '../../services/soldier.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  soldiers: Soldier[] = [];

  constructor(private soldierService: SoldierService) {}

  ngOnInit(): void {
    this.getSoldiers();
  }

  getSoldiers(): void {
    this.soldierService
      .getSoldiers()
      .subscribe((soldiers) => (this.soldiers = soldiers.slice(1, 5)));
  }
}
