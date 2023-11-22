import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPassagemComponent } from './editar-passagem.component';
import { Passagem } from 'src/app/domain/passagem';
import { of, throwError } from 'rxjs';

describe('EditarPassagemComponent', () => {
  let component: EditarPassagemComponent;
  let fixture: ComponentFixture<EditarPassagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarPassagemComponent]
    });
    fixture = TestBed.createComponent(EditarPassagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
it('should update passagem', () => {
  // Arrange

  const passagemAtualizada: Partial<Passagem> = {};
  const selectedPiso1 = { codigoPiso: '1' };
  const selectedPiso2 = { codigoPiso: '2' };
  const response = 'Passagem updated';

  const passagemServiceMock = jasmine.createSpyObj('PassagemService', ['updatePassagem']);
  const fbMock = jasmine.createSpyObj('FormBuilder', ['group']);
  const pisoServiceMock = jasmine.createSpyObj('PisoService', ['getPisos']);

  const component1 = new EditarPassagemComponent(passagemServiceMock, fbMock, pisoServiceMock); // Instantiate the component

  passagemServiceMock.updatePassagem.and.returnValue(of(response));
  spyOn(component1, 'getPassagens');
  spyOn(component1, 'clearForm');

  // Act
  component1.selectedPassagem = { codigoPassagem: '123', passagemId: '', piso1: '0', piso2: '0' };
  component1.selectedPiso1 = 1; // Assign a number instead of a string
  component1.selectedPiso2 = 2; // Assign a number instead of a string
  component1.updatePassagem();

  // Assert
  expect(passagemServiceMock.updatePassagem).toHaveBeenCalledWith('123', passagemAtualizada);
  expect(component1.getPassagens).toHaveBeenCalled();
  expect(component1.clearForm).toHaveBeenCalled();
  expect(console.log).toHaveBeenCalledWith('Passagem updated:', response);
});

it('should log error on update failure', () => {
  const passagemServiceMock = jasmine.createSpyObj('PassagemService', ['updatePassagem']);
  const fbMock = jasmine.createSpyObj('FormBuilder', ['group']);
  const pisoServiceMock = jasmine.createSpyObj('PisoService', ['getPisos']);

  const component = new EditarPassagemComponent(passagemServiceMock, fbMock, pisoServiceMock); // Instantiate the component

  // Arrange
  const error = 'Error updating Passagem';

  spyOn(component['passagemService'], 'updatePassagem').and.returnValue(throwError(error));
  spyOn(console, 'error');

  // Act
  component.selectedPassagem = { codigoPassagem: '123', passagemId: '', piso1: '0', piso2: '0' };
  component.selectedPiso1 = 1; // Assign a number instead of a string
  component.selectedPiso2 = 2; // Assign a number instead of a string
  component.updatePassagem();

  // Assert
  expect(component['passagemService'].updatePassagem).toHaveBeenCalledWith('123', jasmine.any(Object));
  expect(console.error).toHaveBeenCalledWith('Error updating Passagem:', error);
});