import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styles: ['input {width:100%}']
})
export class FormSearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  onSearch(value: string){
    if ( value && value.length > 3 ){
      // console.log('buscar ->', value);
      this.router.navigate(['/character-list'], {
        queryParams: {q: value}
      });
    }
    else{
      this.router.navigate(['/character-list'], {
        queryParams: {q: ''}
      });
    }
  }

  reset(value: string = ''){
    // console.log('reset');
    this.router.navigate(['/character-list'], {
      queryParams: {q: ''}
    });
  }
}
