import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorTarefasComponent } from './gestor-tarefas.component';

describe('GestorTarefasComponent', () => {
  let component: GestorTarefasComponent;
  let fixture: ComponentFixture<GestorTarefasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorTarefasComponent]
    });
    fixture = TestBed.createComponent(GestorTarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
