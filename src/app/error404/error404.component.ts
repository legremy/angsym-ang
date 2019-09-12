import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error404',
  template: `
   <div class="jumbotron">
    <p class="lead">Oops, la page demandée n'existe pas</p>
    <hr>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum in, nam esse accusantium molestias est fugit ducimus? Quos, nam obcaecati!</p>
   </div>
  `,
  styles: []
})
export class Error404Component implements OnInit {
  currentUrl = window.location.pathname;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let proposition: string;
  }

}
