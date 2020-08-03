import { CharacterComponent } from '@characters/character.component';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersDetailsComponent } from '@characters/characters-details/characters-details.component';
import { CharactersListComponent } from '@characters/characters-list/characters-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const myComponents = [CharactersDetailsComponent, CharactersListComponent, CharacterComponent];


@NgModule({
  declarations: [...myComponents],
  imports: [CommonModule, RouterModule, InfiniteScrollModule],
  exports: [...myComponents]
})
export class CharactersModule { }
