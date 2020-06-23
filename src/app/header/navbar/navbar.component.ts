import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {DropdownDirective} from "../../common/dropdown.directive"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output('content') displayContent = new EventEmitter<{ content: string }>();

  constructor() {}

  ngOnInit(): void {}

  onSelect(contentDisplay: string) {
    this.displayContent.emit({ content: contentDisplay });
  }
}
