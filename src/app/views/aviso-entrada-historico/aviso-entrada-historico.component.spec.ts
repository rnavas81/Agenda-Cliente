import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoEntradaHistoricoComponent } from './aviso-entrada-historico.component';

describe('AvisoEntradaHistoricoComponent', () => {
  let component: AvisoEntradaHistoricoComponent;
  let fixture: ComponentFixture<AvisoEntradaHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisoEntradaHistoricoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisoEntradaHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
