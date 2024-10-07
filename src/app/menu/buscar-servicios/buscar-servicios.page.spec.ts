import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarServiciosPage } from './buscar-servicios.page';

describe('BuscarServiciosPage', () => {
  let component: BuscarServiciosPage;
  let fixture: ComponentFixture<BuscarServiciosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarServiciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
