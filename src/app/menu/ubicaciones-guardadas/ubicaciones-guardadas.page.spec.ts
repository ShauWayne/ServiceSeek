import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UbicacionesGuardadasPage } from './ubicaciones-guardadas.page';

describe('UbicacionesGuardadasPage', () => {
  let component: UbicacionesGuardadasPage;
  let fixture: ComponentFixture<UbicacionesGuardadasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionesGuardadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
