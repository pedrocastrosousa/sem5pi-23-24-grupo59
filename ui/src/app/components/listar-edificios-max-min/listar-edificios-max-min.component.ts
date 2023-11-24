import { Component, OnInit } from '@angular/core';
import { Edificio } from 'src/app/domain/edificio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {PisoService} from "../../services/piso.service";


@Component({
  selector: 'app-listar-edificios-max-min',
  templateUrl: './listar-edificios-max-min.component.html',
  styleUrls: ['./listar-edificios-max-min.component.css']
})


export class ListarEdificiosMaxMinComponent {
  form: FormGroup;
  erroListarEdificios: string = '';
  edificios: Edificio[] = [];

  constructor(
    private pisoService: PisoService,
    private formBuilder: FormBuilder, private _snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      minPisos: ['', [Validators.required]],
      maxPisos: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      minPisos: ['', [Validators.required]],
      maxPisos: ['', [Validators.required]]
    });
  }


  onSubmit() {
    if (this.form.valid) {
      const minPisos = this.form.value.minPisos;
      const maxPisos = this.form.value.maxPisos;

      this.pisoService.listarEdificiosComMinMaxPisos(minPisos, maxPisos).subscribe({
        next: (response) => {
          console.log('Edifícios listados:', response);
          this.edificios = response;
        },
        error: (error) => {
          console.error('Erro ao criar edifício:', error);
          if (error.error && error.error.error) {
            this.mostrarMensagem('Erro ao criar edifício: ' + error.error.error);

          } else {
            this.mostrarMensagem('Erro ao criar edifício. Por favor, tente novamente.');

          }
        }
      });
    }
  }
  mostrarMensagem(mensagem: string) {
    this._snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
