import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarTipoRobotComponent } from './criar-tipo-robot.component';

describe('CriarTipoRobotComponent', () => {
  let component: CriarTipoRobotComponent;
  let fixture: ComponentFixture<CriarTipoRobotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriarTipoRobotComponent]
    });
    fixture = TestBed.createComponent(CriarTipoRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
