import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPassagemComponent } from './criar-passagem.component';

describe('CriarPassagemComponent', () => {
  let component: CriarPassagemComponent;
  let fixture: ComponentFixture<CriarPassagemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriarPassagemComponent]
    });
    fixture = TestBed.createComponent(CriarPassagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
