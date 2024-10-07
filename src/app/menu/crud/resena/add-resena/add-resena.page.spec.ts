import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddResenaPage } from './add-resena.page';

describe('AddResenaPage', () => {
  let component: AddResenaPage;
  let fixture: ComponentFixture<AddResenaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
