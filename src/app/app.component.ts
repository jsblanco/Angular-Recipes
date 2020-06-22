import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  content = 'recipe';
  title = 'ang-recipes';

  onNavigation(event) {
    this.content = event.content;
  }
}
