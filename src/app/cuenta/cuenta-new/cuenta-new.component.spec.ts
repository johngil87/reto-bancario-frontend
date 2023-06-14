import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaNewComponent } from './cuenta-new.component';

describe('CuentaNewComponent', () => {
  let component: CuentaNewComponent;
  let fixture: ComponentFixture<CuentaNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuentaNewComponent]
    });
    fixture = TestBed.createComponent(CuentaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
