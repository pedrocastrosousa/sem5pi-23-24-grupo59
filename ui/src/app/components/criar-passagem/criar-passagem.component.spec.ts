import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPassagemComponent } from './criar-passagem.component';
import { PassagemService } from 'src/app/services/passagem.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Passagem } from 'src/app/domain/passagem';
import { throwError } from 'rxjs';

describe('CriarPassagemComponent', () => {
  let component: CriarPassagemComponent;
  let fixture: ComponentFixture<CriarPassagemComponent>;
  let passagemServiceSpy: jasmine.SpyObj<PassagemService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PassagemService', ['createPassagem']);

    TestBed.configureTestingModule({
      declarations: [CriarPassagemComponent],
      imports: [CommonModule, FormsModule],
      providers: [{ provide: PassagemService, useValue: spy }],
    });
    fixture = TestBed.createComponent(CriarPassagemComponent);
    component = fixture.componentInstance;
    passagemServiceSpy = TestBed.inject(
      PassagemService
    ) as jasmine.SpyObj<PassagemService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createPassagem and reset parameters on success', () => {
    // Initialization
    const createPassagemSpy = spyOn(passagemServiceSpy, 'createPassagem');

    component.passagemId = 'B 102';
    component.piso1 = '1';
    component.piso2 = '2';

    // Action
    component.createPassagem( component.passagemId, component.piso1, component.piso2);

    // Asserts
    expect(createPassagemSpy).toHaveBeenCalledOnceWith('B 102', '1', '©2');

    expect(component.passagemId).toBe('');
    expect(component.piso1).toBeUndefined();
    expect(component.piso2).toBeUndefined();
});
   
  it('should display an error message if mandatory information is missing', () => {
    // Initialization
    const createPassagemSpy = spyOn(passagemServiceSpy, 'createPassagem');

    component.passagemId = '';
    component.piso1 = '';
    component.piso2 = '';

    // Action
    component.createPassagem( component.passagemId, component.piso1, component.piso2);

    // Asserts
    expect(createPassagemSpy).not.toHaveBeenCalled();

    expect(component.passagemId).toBe('');
    expect(component.piso1).toBe('');
    expect(component.piso2).toBe('');
  });
  
  it('should display an error message if an external error occurs', () => {
    // Initialization
    const createPassagemSpy = spyOn(passagemServiceSpy, 'createPassagem').and.callFake(() => {
      return throwError(new Error('Oops! Something went wrong on our end.\nPlease try again later.'));
    });

    component.passagemId = 'B 102';
    component.piso1 = '1';
    component.piso2 = '2';

    // Action
    component.createPassagem( component.passagemId, component.piso1, component.piso2);

    // Asserts
    expect(createPassagemSpy).toHaveBeenCalledOnceWith('B 102', '1', '2');

    expect(component.passagemId).toBe('B 102');
    expect(component.piso1).toBe('1');
    expect(component.piso2).toBe('2');
  });
});
