import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComodinPublicoComponent } from './comodin-publico.component';

describe('ComodinPublicoComponent', () => {
  let component: ComodinPublicoComponent;
  let fixture: ComponentFixture<ComodinPublicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComodinPublicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComodinPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
