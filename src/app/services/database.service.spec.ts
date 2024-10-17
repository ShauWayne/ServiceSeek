import { TestBed } from '@angular/core/testing'; // Importar TestBed para configurar el módulo de pruebas
import { Platform } from '@ionic/angular'; // Importar Platform de Ionic
import { ApiRestService } from './api-rest.service'; // Importar el servicio ApiRestService
import { SQLite } from '@ionic-native/sqlite/ngx'; // Importar SQLite de Ionic Native
import { DatabaseService } from './database.service'; // Importar el servicio DatabaseService que será probado
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { of } from 'rxjs';

describe('DatabaseService', () => {
  let service: DatabaseService; // Declarar la instancia del servicio a probar
  let platformSpy: jasmine.SpyObj<Platform>; // Declarar el espía para Platform
  let sqliteSpy: jasmine.SpyObj<SQLite>; // Declarar el espía para SQLite
  let apiRestServiceSpy: jasmine.SpyObj<ApiRestService>; // Declarar el espía para ApiRestService

  beforeEach(() => {
    // Crear objetos espía (mocks) para Platform, SQLite y ApiRestService
    const platformSpyObj = jasmine.createSpyObj('Platform', ['ready']); // Crear un espía para Platform con el método 'ready'
    const sqliteSpyObj = jasmine.createSpyObj('SQLite', ['create']); // Crear un espía para SQLite con el método 'create'
    const apiRestServiceSpyObj = jasmine.createSpyObj('ApiRestService', ['getServicios']); // Crear un espía para ApiRestService con el método 'getServicios'

    // Configurar el módulo de pruebas con los proveedores de dependencias
    TestBed.configureTestingModule({
      providers: [
        { provide: Platform, useValue: platformSpyObj }, // Proporcionar el espía de Platform
        { provide: SQLite, useValue: sqliteSpyObj }, // Proporcionar el espía de SQLite
        { provide: ApiRestService, useValue: apiRestServiceSpyObj }, // Proporcionar el espía de ApiRestService
      ],
    });
    // Inyectar los espías para usarlos en las pruebas
    platformSpy = TestBed.inject(Platform) as jasmine.SpyObj<Platform>; // Inyectar Platform como un espía
    sqliteSpy = TestBed.inject(SQLite) as jasmine.SpyObj<SQLite>; // Inyectar SQLite como un espía
    apiRestServiceSpy = TestBed.inject(ApiRestService) as jasmine.SpyObj<ApiRestService>; // Inyectar ApiRestService como un espía
    service = TestBed.inject(DatabaseService); // Inyectar el servicio DatabaseService
  });

  it('should be created', () => {
    // Prueba para verificar que el servicio se ha creado correctamente
    expect(service).toBeTruthy(); // Verificar que la instancia del servicio es verdadera (existe)
  });

  it('should call platform.ready when creating the database', async () => {
    // Configurar el espía para que el método 'ready' de Platform devuelva una promesa resuelta
    platformSpy.ready.and.returnValue(Promise.resolve('ready'));

    // Configurar el espía para que el método 'create' de SQLite devuelva una promesa resuelta
    sqliteSpy.create.and.returnValue(Promise.resolve(new SQLiteObject({} as any)));


    // Llamar al método 'crearDB' del servicio
    await service.crearDB();

    // Verificar que se haya llamado al método 'ready' de Platform
    expect(platformSpy.ready).toHaveBeenCalled();
    // Verificar que se haya llamado al método 'create' de SQLite
    expect(sqliteSpy.create).toHaveBeenCalled();
  });

  it('should call apiRestService.getServicios when inserting data from API', async () => {
    // Configurar el espía para que el método 'ready' de Platform devuelva una promesa resuelta
    platformSpy.ready.and.returnValue(Promise.resolve('ready'));
    // Configurar el espía para que el método 'create' de SQLite devuelva una promesa resuelta
    sqliteSpy.create.and.returnValue(Promise.resolve({} as SQLiteObject));
    // Configurar el espía para que el método 'getServicios' de ApiRestService devuelva un observable vacío
    // Configurar el espía para que el método 'getServicios' de ApiRestService devuelva un observable vacío
    apiRestServiceSpy.getServicios.and.returnValue(of([]));

    // Llamar al método 'crearDB' del servicio
    await service.crearDB();

    // Verificar que se haya llamado al método 'getServicios' de ApiRestService
    expect(apiRestServiceSpy.getServicios).toHaveBeenCalled();
  });
});
