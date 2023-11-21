import { Component } from '@angular/core';
import { Edificio } from 'src/app/domain/edificio';
import { EdificioService } from 'src/app/services/edificio.service';

@Component({
  selector: 'app-delete-edificio',
  templateUrl: './delete-edificio.component.html',
  styleUrls: ['./delete-edificio.component.css'],
})
export class DeleteEdificioComponent {
  codigoEdificio: string = '';
  constructor(private edificioService: EdificioService) {}
  onDeleteEdificio(): void {
    this.edificioService.deleteEdificio(this.codigoEdificio).subscribe(
      response => {
        console.log('Delete successful', response);
      },
      error => {
        console.error('Delete failed', error);
      },
    );
  }
}
