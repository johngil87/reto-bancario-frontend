import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoClienteComponent } from './movimiento-cliente.component';

describe('MovimientoClienteComponent', () => {
  let component: MovimientoClienteComponent;
  let fixture: ComponentFixture<MovimientoClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovimientoClienteComponent]
    });
    fixture = TestBed.createComponent(MovimientoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
