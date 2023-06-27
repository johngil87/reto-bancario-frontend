import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteComponent } from './cliente.component';
import { FormBuilder, Validators } from '@angular/forms';

describe('ClienteComponent', () => {
  let component: ClienteComponent;
  let fixture: ComponentFixture<ClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteComponent]
    });
    fixture = TestBed.createComponent(ClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Validando formulario', () => {
    expect(component.myForm.controls['nombre'].hasValidator(Validators.required)).toBeTrue();
  });

  it('should create', () => {
    expect(component.actualizarCliente()).toBeNull();
  });
});
