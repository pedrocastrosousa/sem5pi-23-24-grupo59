import { Component } from '@angular/core';
import { CategoriaSalaEnum } from 'src/app/domain/categoriaSalaEnum';
import { Piso } from 'src/app/domain/pisos';
import { Sala } from 'src/app/domain/sala';
import { PisoService } from 'src/app/services/piso.service';
import { SalaService } from 'src/app/services/sala.service';

@Component({
  selector: 'app-criar-sala',
  templateUrl: './criar-sala.component.html',
  styleUrls: ['./criar-sala.component.css']
})
export class CriarSalaComponent {

  categoriasSala: (string | CategoriaSalaEnum)[] = [];
  pisos: Piso[] = [];

  constructor(private salaService: SalaService, private pisoService: PisoService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.listarPisos();
    this.listarCategoriasSala()
  }

  createSala(
    nomeSala: string,
    categoriaSala: string,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    descricaoSala: string,
    piso: string,
  ): void {
    this.salaService.createSala({
      nomeSala,
      categoriaSala,
      dimensaoSala:{
        x1,
        y1,
        x2,
        y2,
      },
      descricaoSala,
      piso,
    } as Sala).subscribe((response) => {
      console.log(response);
    });
  }

  listarPisos(): void {
    this.pisoService.getAllPisos().subscribe(
      pisos => {
        this.pisos = pisos;
      },
      error => {
        console.log(error);
      }
    );
  }

  listarCategoriasSala(): void {
    const categorias: (string | CategoriaSalaEnum)[] = Object.values(CategoriaSalaEnum)
    this.categoriasSala = categorias.slice(0, categorias.length / 2);
    console.log(this.categoriasSala);
  }
}
