import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColocaSeguroComponent } from './coloca-seguro.component';

describe('ColocaSeguroComponent', () => {
  let component: ColocaSeguroComponent;
  let fixture: ComponentFixture<ColocaSeguroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColocaSeguroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColocaSeguroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
