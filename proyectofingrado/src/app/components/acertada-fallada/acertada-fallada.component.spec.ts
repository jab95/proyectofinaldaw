import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcertadaFalladaComponent } from './acertada-fallada.component';

describe('AcertadaFalladaComponent', () => {
  let component: AcertadaFalladaComponent;
  let fixture: ComponentFixture<AcertadaFalladaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcertadaFalladaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcertadaFalladaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
