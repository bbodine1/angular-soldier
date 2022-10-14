import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Soldier } from '../models/soldier';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const soldiers = [
      {
        id: 12,
        firstname: 'Amanda',
        lastname: 'Ellis',
        rank: 'CPL',
      },
      {
        id: 13,
        firstname: 'Winifred',
        lastname: 'Mullins',
        rank: 'PV2',
      },
      {
        id: 14,
        firstname: 'Susie',
        lastname: 'Garcia',
        rank: 'PV2',
      },
      {
        id: 15,
        firstname: 'John',
        lastname: 'Howell',
        rank: '2LT',
      },
      {
        id: 16,
        firstname: 'Jeff',
        lastname: 'Lynch',
        rank: 'PFC',
      },
      {
        id: 17,
        firstname: 'James',
        lastname: 'Jordan',
        rank: 'SGM',
      },
      {
        id: 18,
        firstname: 'Birdie',
        lastname: 'Fleming',
        rank: 'SFC',
      },
      {
        id: 19,
        firstname: 'Ricardo',
        lastname: 'Blair',
        rank: 'MAJ',
      },
      {
        id: 20,
        firstname: 'Julia',
        lastname: 'Doyle',
        rank: 'MAJ',
      },
    ];
    return { soldiers: soldiers };
  }

  // Overrides the genId method to ensure that a soldier always has an id.
  // If the soldiers array is empty,
  // the method below returns the initial number (11).
  // if the soldiers array is not empty, the method below returns the highest
  // soldier id + 1.
  genId(soldiers: Soldier[]): number {
    return soldiers.length > 0
      ? Math.max(...soldiers.map((soldier) => soldier.id)) + 1
      : 11;
  }
}
