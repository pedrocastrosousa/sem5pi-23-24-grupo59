import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRobotsComponent } from './listar-robots.component';

describe('ListarRobotsComponent', () => {
  let component: ListarRobotsComponent;
  let fixture: ComponentFixture<ListarRobotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarRobotsComponent]
    });
    fixture = TestBed.createComponent(ListarRobotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
