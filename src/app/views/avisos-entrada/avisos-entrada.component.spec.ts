import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisosEntradaComponent } from './avisos-entrada.component';

describe('AvisosEntradaComponent', () => {
  let component: AvisosEntradaComponent;
  let fixture: ComponentFixture<AvisosEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisosEntradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisosEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
