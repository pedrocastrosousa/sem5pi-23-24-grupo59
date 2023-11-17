import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PisosComponent } from './pisos.component';

describe('PisosComponent', () => {
  let component: PisosComponent;
  let fixture: ComponentFixture<PisosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PisosComponent]
    });
    fixture = TestBed.createComponent(PisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
