/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BancarioService } from './bancario.service';

describe('Service: Bancario', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BancarioService]
    });
  });

  it('should ...', inject([BancarioService], (service: BancarioService) => {
    expect(service).toBeTruthy();
  }));
});
