import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaredificiosComponent } from './listar-edificios.component';

describe('ListaredificiosComponent', () => {
  let component: ListaredificiosComponent;
  let fixture: ComponentFixture<ListaredificiosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaredificiosComponent],
    });
    fixture = TestBed.createComponent(ListaredificiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
