import { TrackHttpError } from '@shared/models/trackHttpError';

import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Character } from '@app/shared/interfaces/characters.interfaces';
import { CharacterService } from '@app/shared/services/character.service';
import { take, filter } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import Swal from 'sweetalert2';

type RequestInfo = {
  next: string;
};

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})

export class CharactersListComponent implements OnInit {

  characters: Character[] = [];

  info: RequestInfo = {
    next: null,
  };

  public showGoUpButton = false;
  private pageNum = 1;
  private query: string;
  private hideScrollHeight = 200;
  private showScrollHeight = 500;

  constructor(
    @Inject(DOCUMENT) private docuement: Document,
    private characterSvc: CharacterService, private route: ActivatedRoute, private router: Router) {
    this.onUrlChanged();
  }

  ngOnInit(): void {
    // this.getDataFromService();
    this.getCharactersByQuery();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    if ((yOffSet || this.docuement.documentElement.scrollTop || this.docuement.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
      // tslint:disable-next-line: max-line-length
    } else if (this.showGoUpButton && (yOffSet || this.docuement.documentElement.scrollTop || this.docuement.body.scrollTop) < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  onScrollDown() {
    if (this.info.next) {
      this.pageNum++;
      this.getDataFromService();
    }
  }
  onScrollTop(): void {
    this.docuement.body.scrollTop = 0; // safari
    this.docuement.documentElement.scrollTop = 0; // other
  }

  private onUrlChanged(): void {

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.characters = [];
      this.pageNum = 1;
      this.getCharactersByQuery();
    });
  }

  private getCharactersByQuery(): void {

    this.route.queryParams.pipe(take(1)).subscribe((params: ParamMap) => {
      // console.log('params -->', params);

      // tslint:disable-next-line: no-string-literal
      this.query = params['q'];

      this.getDataFromService();

    });
  }

  private getDataFromService(): void {
    // debugger;
    this.characterSvc.searchCharacters(this.query, this.pageNum).pipe(take(1)).subscribe((res: any) => {
      // console.log('-->', res);
      if (res?.results?.length) {

        const { info, results } = res;
        this.characters = [...this.characters, ...results];
        this.info = info;
      } else {
        this.characters = [];
        this.getDataFromService();
      }

    }, /* (error: TrackHttpError) => this.mensaje(error.friendlyMessage) */
   (error: TrackHttpError) => console.log(error.friendlyMessage)
    );
  }

  mensaje(msj: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msj,
      footer: 'Intenta de nuevo'
    });
  }


}
