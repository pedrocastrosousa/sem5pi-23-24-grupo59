import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Passagem } from 'src/app/domain/passagem';
import { PassagemService } from 'src/app/services/passagem.service';
import { PisoService } from 'src/app/services/piso.service';
//import { Passagenservice } from 'src/app/services/piso.service';

@Component({
  selector: 'app-passagens',
  templateUrl: './passagens.component.html',
  styleUrls: ['./passagens.component.css']
})
export class PassagensComponent  {


  constructor(private passagemService: PassagemService) {}

  ngOnInit(): void {}

  createPassagem(): void {
    let piso1 = this.passagens.piso1;
    let piso2 = this.passagens.piso2;
    this.passagemService.createPassagem({ piso1, piso2 } as Passagem);
  }



  editarPassagem(): void {
    let piso1 = this.passagens.piso1;
    let piso2 = this.passagens.piso2;
    this.passagemService.updatePassagem({ piso1, piso2 } as Passagem);
  }

  listPassagens(): void {
    this.passagemService.listPassagens();
  }

  passagens= {
    piso1: 'Piso1',
    piso2: 'Piso2',
  };
}
