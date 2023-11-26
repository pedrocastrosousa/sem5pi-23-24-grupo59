import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EdificioService } from './edificio.service';

describe('EdificioService', () => {
  let service: EdificioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EdificioService, MatSnackBar],
    });

    service = TestBed.inject(EdificioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create an Edificio', inject([EdificioService], (edificioService: EdificioService) => {
    const mockEdificio = {
      codigoEdificio: '001',
      descricaoEdificio: 'Descrição do Edifício',
      nomeEdificio: 'Edifício Principal',
      dimensaoMaximaPisos: {
        comprimento: 100,
        largura: 50,
      },
    };

    service
      .createEdificio(
        mockEdificio.codigoEdificio,
        mockEdificio.descricaoEdificio,
        mockEdificio.nomeEdificio,
        mockEdificio.dimensaoMaximaPisos.comprimento,
        mockEdificio.dimensaoMaximaPisos.largura,
      )
      .subscribe(edificio => {
        expect(edificio).toEqual(mockEdificio);
      });

    const req = httpMock.expectOne('http://localhost:4000/api/edificios');
    expect(req.request.method).toBe('POST');
    req.flush(mockEdificio);
  }));

   it('should update an Edificio', inject([EdificioService], (edificioService: EdificioService) => {
     const mockUpdatedEdificio = {
       codigoEdificio: '001',
       descricaoEdificio: 'Nova Descrição',
       nomeEdificio: 'Novo Nome',
       dimensaoMaximaPisos: {
         comprimento: 120,
         largura: 60,
       },
     };

     service.updateEdificio(mockUpdatedEdificio).subscribe(updatedEdificio => {
       expect(updatedEdificio).toEqual(mockUpdatedEdificio);
     });

     const req = httpMock.expectOne('http://localhost:4000/api/edificios');
     expect(req.request.method).toBe('PUT');
     req.flush(mockUpdatedEdificio);
   }));

   it('should retrieve all Edificios', inject([EdificioService], (edificioService: EdificioService) => {
     const mockEdificios = [
       {
         codigoEdificio: '001',
         descricaoEdificio: 'Descrição 1',
         nomeEdificio: 'Edifício 1',
         dimensaoMaximaPisos: {
           comprimento: 100,
           largura: 50,
         },
       },
       {
         codigoEdificio: '002',
         descricaoEdificio: 'Descrição 2',
         nomeEdificio: 'Edifício 2',
         dimensaoMaximaPisos: {
           comprimento: 120,
           largura: 60,
         },
       },
     ];

     service.getAllEdificios().subscribe(edificios => {
       expect(edificios).toEqual(mockEdificios);
     });

     const req = httpMock.expectOne('http://localhost:4000/api/edificios');
     expect(req.request.method).toBe('GET');
     req.flush(mockEdificios);
   }));

});
