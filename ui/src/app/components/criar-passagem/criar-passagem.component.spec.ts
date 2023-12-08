import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPassagemComponent } from './criar-passagem.component';
import { PassagemService } from 'src/app/services/passagem.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Passagem } from 'src/app/domain/passagem';
import { throwError } from 'rxjs';
import { PisoService } from 'src/app/services/piso.service';

describe('CriarPassagemComponent', () => {
  let component: CriarPassagemComponent;
  let fixture: ComponentFixture<CriarPassagemComponent>;
  let mockPisosService: jasmine.SpyObj<PisoService>;
  let mockPassagensService: jasmine.SpyObj<PassagemService>;

  beforeEach(() => {
    mockPisosService = jasmine.createSpyObj('PisosService', ['listarPisosPorEdificio']);
    mockPassagensService = jasmine.createSpyObj('PassagensService', ['criarPassagem']);
   
    TestBed.configureTestingModule({
      declarations: [CriarPassagemComponent],
      imports: [CommonModule, FormsModule],
      providers: [{ provide: PassagemService, useValue: mockPassagensService },{ provide: PisoService, useValue: mockPisosService }],
    });
    fixture = TestBed.createComponent(CriarPassagemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should call createPassagem and reset parameters on success', () => {
   
    component.createPassagem(
       'B 102',
       'PISO1',
       'PISO2',
    );
    const successfulResponse: any = {
      passagemId: 'B 102',
      piso1: 'PISO1',
      piso2: 'PISO2',
    };
    // Asserts
    mockPassagensService.criarPassagem.and.returnValue(of(successfulResponse));
    component.createPassagem();
    expect(mockPassagensService.createPassagem).toHaveBeenCalledTimes(1);
    expect(mockPassagensService.createPassagem).toHaveBeenCalledWith(successfulResponse);
});
   
  // it('should display an error message if an external error occurs', () => {
  //   // Initialization
  //   const createPassagemSpy = spyOn(passagemServiceSpy, 'createPassagem').and.callFake(() => {
  //     return throwError(new Error('Oops! Something went wrong on our end.\nPlease try again later.'));
  //   });

  //   component.passagemId = 'B 102';
  //   component.piso1 = '1';
  //   component.piso2 = '2';

  //   // Action
  //   component.createPassagem(component.passagemId, component.piso1, component.piso2);

  //   // Asserts
  //   expect(createPassagemSpy);

  //   expect(component.passagemId);
  //   expect(component.piso1);
  //   expect(component.piso2);
  // });
});
