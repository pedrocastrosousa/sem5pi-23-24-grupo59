import { TestBed } from '@angular/core/testing';

import { TipoRobotService } from '../services/tipo-robot.service';

describe('TipoRobotService', () => {
  let service: TipoRobotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoRobotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
