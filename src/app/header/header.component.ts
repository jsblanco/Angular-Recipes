import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output('content') displayContent = new EventEmitter<{ content: string }>();

  constructor() {}

  relayNavigation(content) {
    this.displayContent.emit(content);
  }
}
