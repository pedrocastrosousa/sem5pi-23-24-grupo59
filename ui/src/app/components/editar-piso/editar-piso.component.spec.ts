import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPisoComponent } from './editar-piso.component';
import { of, throwError } from 'rxjs';
import { Piso } from 'src/app/domain/pisos';

describe('EditarPisoComponent', () => {
  let component: EditarPisoComponent;
  let fixture: ComponentFixture<EditarPisoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarPisoComponent]
    });
    fixture = TestBed.createComponent(EditarPisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});