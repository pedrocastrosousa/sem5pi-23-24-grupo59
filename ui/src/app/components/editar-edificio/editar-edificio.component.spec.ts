import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarEdificioComponent } from './editar-edificio.component';

describe('AtualizarEdificioComponent', () => {
  let component: AtualizarEdificioComponent;
  let fixture: ComponentFixture<AtualizarEdificioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtualizarEdificioComponent],
    });
    fixture = TestBed.createComponent(AtualizarEdificioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
