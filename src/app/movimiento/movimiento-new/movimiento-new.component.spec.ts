import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoNewComponent } from './movimiento-new.component';

describe('MovimientoNewComponent', () => {
  let component: MovimientoNewComponent;
  let fixture: ComponentFixture<MovimientoNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovimientoNewComponent]
    });
    fixture = TestBed.createComponent(MovimientoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
