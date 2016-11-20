import { Component } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId : module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
    styleUrls: ['heroes.component.css'],
    providers:[]
})
export class HeroesComponent implements OnInit  {
    
  heroes : Hero[];
  selectedHeroe: Hero;

  constructor(private heroService:HeroService,
     private router:Router){
      //this.heroes = this.heroService.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  gotoDetail():void{
    this.router.navigate(['/detail',this.selectedHeroe.id]);
  }

  onSelect(hero : Hero){
      this.selectedHeroe = hero;
  }

  delete(hero: Hero): void {
    this.heroService
        .delete(hero.id)
        .then(() => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHeroe === hero) { this.selectedHeroe = null; }
        });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHeroe = null;
      });
  }  

  ngOnInit(): void {

      this.getHeroes();

  }
}

