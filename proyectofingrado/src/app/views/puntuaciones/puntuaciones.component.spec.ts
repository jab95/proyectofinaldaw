import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntuacionesComponent } from './puntuaciones.component';

describe('PuntuacionesComponent', () => {
  let component: PuntuacionesComponent;
  let fixture: ComponentFixture<PuntuacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntuacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntuacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
