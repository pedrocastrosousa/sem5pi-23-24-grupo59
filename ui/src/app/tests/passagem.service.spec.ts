import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PassagemService } from '../services/passagem.service';
import { Passagem } from '../domain/passagem';
import { Observable } from 'rxjs';


describe('PassagemService', () => {
    let service: PassagemService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PassagemService],
        });

        service = TestBed.inject(PassagemService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', inject([PassagemService], (passagemService: PassagemService) => {
        expect(passagemService).toBeTruthy();
    }));

    // List Passagens entre dois edificios
    it('should make a GET request to retrieve Passagens entre dois edificios', () => {
        const piso1 = {
            nome: "1",
            descricao: "1",
            edificio: "AAAAA",
            codigoPiso: "AAAAA-1"
        };
        const piso2 = {
            nome: "2",
            descricao: "1",
            edificio: "BBBBB",
            codigoPiso: "BBBBB-2"
        };
        const piso3 = {
            nome: "3",
            descricao: "1",
            edificio: "AAAAA",
            codigoPiso: "AAAAA3"
        };
        const piso4 = {
            nome: "4",
            descricao: "1",
            edificio: "BBBBB",
            codigoPiso: "BBBBB-4"
        };
    
        const mockPassagens: ArrayLike<Passagem> = [
            { passagemId: "teste1", piso1: piso1.codigoPiso, piso2: piso2.codigoPiso,codigoPassagem: "AAAAA-1-BBBBB-2"},
            {passagemId: "teste2", piso1: piso3.codigoPiso, piso2: piso4.codigoPiso,codigoPassagem: "AAAAA-3-BBBBB-4"},
        ];
    
        const edificio1:string= "AAAAA";
        const edificio2:string= "BBBBB";
    
        service.listPassagensEntreEdificios(edificio1,edificio2).subscribe((passagens) => {
            expect(passagens).toEqual(mockPassagens);
        });
    
        const req = httpTestingController.expectOne(
            `${service['listarPassagemEntreEdificiosUrl']}?edificio1=${edificio1}&edificio2=${edificio2}`
        );
    
        expect(req.request.method).toBe('GET');
        req.flush(mockPassagens);
    });


    it('should handle errors when creating a passagem', () => {
        const mockPassagemBody: Passagem = {
            passagemId: 'test1',
            piso1: 'piso1',
            piso2: 'piso2',
            codigoPassagem: 'piso1-piso2'
         };

        const errorMessage = 'Internal Server Error';

        service.createPassagem(mockPassagemBody).subscribe(
            () => {
                // This should not be called in case of an error
                fail('Expected an error, but received success');
            },
            (error) => {
                expect(error.status).toBe(500);
                expect(error.error).toBe(errorMessage);
            }
        );

        const req = httpTestingController.expectOne(`${service['criarPassagemUrl']}`);
        req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });

    });



    it('should make a POST request to create a building and handle success', () => {
    
        const mockPassagemBody: Passagem = {
            passagemId: 'test1',
            piso1: 'piso1',
            piso2: 'piso2',
            codigoPassagem: 'piso1-piso2'
         };

        service.createPassagem(mockPassagemBody).subscribe((response) => {
            expect(response).toBeTruthy();
        });

        const req = httpTestingController.expectOne(`${service['criarPassagemUrl']}`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(mockPassagemBody);

        const mockSuccessResponse = { status: 200, statusText: 'Success' };
        req.flush(mockSuccessResponse); // Simulate a successful HTTP response.


    });


});
