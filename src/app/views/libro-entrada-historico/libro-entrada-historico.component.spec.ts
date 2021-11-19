import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroEntradaHistoricoComponent } from './libro-entrada-historico.component';

describe('LibroEntradaHistoricoComponent', () => {
  let component: LibroEntradaHistoricoComponent;
  let fixture: ComponentFixture<LibroEntradaHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroEntradaHistoricoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroEntradaHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
