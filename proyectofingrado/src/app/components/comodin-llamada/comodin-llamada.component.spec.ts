import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComodinLLamadaComponent } from './comodin-llamada.component';

describe('ComodinLLamadaComponent', () => {
  let component: ComodinLLamadaComponent;
  let fixture: ComponentFixture<ComodinLLamadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComodinLLamadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComodinLLamadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
