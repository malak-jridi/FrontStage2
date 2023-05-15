import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  selectedMenu: string = 'account';
  message: string = '';

  ngOnInit(): void {
  }

  onChangeMenu(menu: string): void {
    this.selectedMenu = menu;
  }
}
