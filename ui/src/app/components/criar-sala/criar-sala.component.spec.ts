import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarSalaComponent } from './criar-sala.component';

describe('CriarSalaComponent', () => {
  let component: CriarSalaComponent;
  let fixture: ComponentFixture<CriarSalaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriarSalaComponent]
    });
    fixture = TestBed.createComponent(CriarSalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
