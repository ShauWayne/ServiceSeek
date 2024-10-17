// Importaciones necesarias desde Angular y el servicio a probar
import { TestBed } from '@angular/core/testing';
import { GmapsService } from './gmaps.service';

// Describe el conjunto de pruebas para el servicio GmapsService
describe('GmapsService', () => {
  // Variable para almacenar la instancia del servicio GmapsService
  let service: GmapsService;

  // Configuración inicial que se ejecuta antes de cada prueba
  beforeEach(() => {
    // Configura el entorno de pruebas utilizando TestBed
    TestBed.configureTestingModule({});
    // Inyecta una instancia de GmapsService para ser utilizada en las pruebas
    service = TestBed.inject(GmapsService);
  });

  // Prueba para verificar si el servicio ha sido creado exitosamente
  it('should be created', () => {
    // Verifica que el servicio se haya creado y no sea nulo
    expect(service).toBeTruthy();
  });
});
