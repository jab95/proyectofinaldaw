import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Comodin50Component } from './comodin50.component';

describe('Comodin50Component', () => {
  let component: Comodin50Component;
  let fixture: ComponentFixture<Comodin50Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Comodin50Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Comodin50Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
