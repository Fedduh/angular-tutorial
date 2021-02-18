import { Component, OnInit } from '@angular/core';

import { HeroService } from '../hero.service';

import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  name: string;

  constructor(private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
  ngOnInit(): void {
    this.getHeroes();
  }

  addHero(): void {
    if (!this.name) { return; }
    this.heroService.addHero({ name: this.name } as Hero)
    .subscribe(hero => {
      this.name = '';
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
