import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPassagemComponent } from './lista-passagem.component';

describe('ListaPassagemComponent', () => {
  let component: ListaPassagemComponent;
  let fixture: ComponentFixture<ListaPassagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaPassagemComponent]
    });
    fixture = TestBed.createComponent(ListaPassagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
