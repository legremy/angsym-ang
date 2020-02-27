import { UiService } from './ui/ui.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router, ResolveStart, ResolveEnd, NavigationCancel } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mes Clients';
  isLoading = false;

  constructor(private router: Router, private ui: UiService) { }

  ngOnInit() {
    this.ui.loadingState.subscribe(state => this.isLoading = state)

    this.router.events.subscribe(event => {
      if (event instanceof ResolveStart) {
        this.isLoading = true;
      } else if (event instanceof ResolveEnd || event instanceof NavigationCancel) {
        this.isLoading = false;
      }
    });
  }
}
