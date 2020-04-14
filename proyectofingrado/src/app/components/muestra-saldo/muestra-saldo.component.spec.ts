import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuestraSaldoComponent } from './muestra-saldo.component';

describe('MuestraSaldoComponent', () => {
  let component: MuestraSaldoComponent;
  let fixture: ComponentFixture<MuestraSaldoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuestraSaldoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuestraSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
