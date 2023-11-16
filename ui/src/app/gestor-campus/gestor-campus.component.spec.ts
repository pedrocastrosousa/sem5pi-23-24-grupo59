import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorCampusComponent } from './gestor-campus.component';

describe('GestorCampusComponent', () => {
  let component: GestorCampusComponent;
  let fixture: ComponentFixture<GestorCampusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorCampusComponent]
    });
    fixture = TestBed.createComponent(GestorCampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
