import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicioResenasPage } from './servicio-resenas.page';

describe('ServicioResenasPage', () => {
  let component: ServicioResenasPage;
  let fixture: ComponentFixture<ServicioResenasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioResenasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
