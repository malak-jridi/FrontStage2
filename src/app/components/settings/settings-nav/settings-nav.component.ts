import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { settingsNavItems } from 'src/app/shared/stores/store';

@Component({
  selector: 'app-settings-nav',
  templateUrl: './settings-nav.component.html',
  styleUrls: ['./settings-nav.component.css']
})
export class SettingsNavComponent implements OnInit {
  @Output() onChangeMenu: EventEmitter<string> = new EventEmitter();

  navItems: any = [];
  selectedMenu: string = '';

  ngOnInit(): void {
    this.navItems = settingsNavItems;
    this.selectedMenu = settingsNavItems[0].id;
  }

  onClickMenu(menu: string) {
    this.selectedMenu = menu;
    this.onChangeMenu.emit(menu);
  }
}
