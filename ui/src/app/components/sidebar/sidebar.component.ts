/* eslint-disable prettier/prettier */
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarItem } from '../../domain/sidebarItem';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() itemSelected = new EventEmitter<string>();

  sidebarItems: SidebarItem[] = [
    { name: 'Edificio', subitems: ['criar-edificio', 'editar-edificio', 'listar-edificios'] },
    { name: 'X', subitems: ['Subitem 2.1', 'Subitem 2.2', 'Subitem 2.3'] },
    // Add more items with or without subitems
  ];

  constructor(private router: Router) { }

  selectSubitem(event: any, item: SidebarItem) {
    const selectedValue = event.target.value;
    const selectedItem = `${item.name} - ${selectedValue}`;
    this.itemSelected.emit(selectedItem);
  }
}
