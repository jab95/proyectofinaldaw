import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaPreguntaComponent } from './modifica-pregunta.component';

describe('ModificaPreguntaComponent', () => {
  let component: ModificaPreguntaComponent;
  let fixture: ComponentFixture<ModificaPreguntaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificaPreguntaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
