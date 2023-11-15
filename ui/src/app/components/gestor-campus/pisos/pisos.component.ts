import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PisoService } from 'src/app/services/piso.service';
import { Piso } from 'src/app/domain/pisos';

@Component({
  selector: 'app-pisos',
  templateUrl: './pisos.component.html',
  styleUrls: ['./pisos.component.css']
})
export class PisosComponent  {
  pisos: Piso = {
    nome: 'Piso1',
    descricao: 'Piso1',
    edificio: 'EdifA'
  };
}
