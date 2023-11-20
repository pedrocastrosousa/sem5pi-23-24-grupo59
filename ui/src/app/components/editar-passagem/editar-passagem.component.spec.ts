import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPassagemComponent } from './editar-passagem.component';

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
