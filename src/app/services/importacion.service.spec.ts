import { TestBed } from '@angular/core/testing';

import { ImportacionService } from './importacion.service';

describe('ImportacionService', () => {
  let service: ImportacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
