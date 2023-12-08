import { TestBed } from '@angular/core/testing';

import { MessageService } from '../services/message.service';
import { PassagemService } from '../services/passagem.service';
import { HttpClient } from '@angular/common/http';
import { Passagem } from '../domain/passagem';

describe('PassagensService', () => {
  let service: PassagemService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'patch']);
    service = new PassagemService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a passagem', () => {
    const passagem: Passagem = { passagemId: 'passagem1', piso1: 'A', piso2: 'A', codigoPassagem: 'passagem1' };

    httpClientSpy.post.and.returnValue(of(passagem));

    service.createPassagem(passagem).subscribe(
      result => {
        expect(result).toEqual(passagem);
      },
      fail
    );

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should list passagens', () => {
    const mockPassagens: Passagem[] = [
      { passagemId: 'passagem1', piso1: 'A', piso2: 'B', codigoPassagem: 'passagem1'},
      { passagemId: 'passagem1', piso1: 'B', piso2: 'C', codigoPassagem: 'passagem1'}
    ];

    httpClientSpy.get.and.returnValue(of(mockPassagens));

    service.listPassagens().subscribe(
      passagens => {
        expect(passagens.length).toBe(2);
        expect(passagens).toEqual(mockPassagens);
      },
      fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });



  it('should handle error during API call', () => {
    const errorResponse = new HttpErrorResponse({ status: 404, statusText: 'Not Found' });

    httpClientSpy.get.and.returnValue(throwError(errorResponse));

    service.listPassagens().subscribe(
      () => fail('expected an error, but succeeded'),
      error => {
        expect(error).toBe(errorResponse);
      }
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should list passagens entre edifícios', () => {
    const edificio1 = 'EdificioA';
    const edificio2 = 'EdificioB';
    const mockPassagens: Passagem[] = [
      
      { passagemId: 'passagem1', piso1: 'A', piso2: 'B', codigoPassagem: 'passagem1'},
      { passagemId: 'passagem1', piso1: 'B', piso2: 'C', codigoPassagem: 'passagem1'}
    ];
    
    httpClientSpy.get.and.returnValue(of(mockPassagens));

    service.listPassagensEntreEdificios(edificio1, edificio2).subscribe(
      passagens => {
        expect(passagens.length).toBe(2);
        expect(passagens).toEqual(mockPassagens);
      },
      fail
    );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    expect(httpClientSpy.get.calls.first().args[0]).toBe(`passagens/listarPassagensEntre2Edificios/`);
  });


  
  it('should throw error when trying to create a passagem with the same pisos', () => {
    const passagem: Passagem = { passagemId: 'passagem1', piso1: 'A', piso2: 'A', codigoPassagem: 'passagem1' };
    const errorResponse = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });

    httpClientSpy.post.and.returnValue(throwError(errorResponse));

    service.createPassagem(passagem).subscribe(
      () => fail('expected an error, but succeeded'),
      error => {
        expect(error).toBe(errorResponse);
      }
    );

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should throw error when trying to create a passagem without piso1', () => {
    const passagem: Passagem = { passagemId: 'passagem1', piso1: '', piso2: 'A', codigoPassagem: 'passagem1'};
    const errorResponse = new HttpErrorResponse({ status: 400, statusText: 'Bad Request' });

    httpClientSpy.post.and.returnValue(throwError(errorResponse));

    service.createPassagem(passagem).subscribe(
      () => fail('expected an error, but succeeded'),
      error => {
        expect(error).toBe(errorResponse);
      }
    );

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });
});