import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEdificiosMaxMinComponent } from './listar-edificios-max-min.component';

describe('ListarEdificiosMaxMinComponent', () => {
  let component: ListarEdificiosMaxMinComponent;
  let fixture: ComponentFixture<ListarEdificiosMaxMinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarEdificiosMaxMinComponent]
    });
    fixture = TestBed.createComponent(ListarEdificiosMaxMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
