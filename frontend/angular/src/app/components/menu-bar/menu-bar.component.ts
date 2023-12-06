import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
menu: Array<MenuItem>= [
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
  },
  {
    label: 'Customers',
    icon: 'pi pi-fw pi-users'
  },
  {
    label: 'Settings',
    icon: 'pi pi-fw pi-cog'
  }
];
}
