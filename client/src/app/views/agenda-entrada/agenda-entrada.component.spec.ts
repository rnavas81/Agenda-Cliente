import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaEntradaComponent } from './agenda-entrada.component';

describe('AgendaEntradaComponent', () => {
  let component: AgendaEntradaComponent;
  let fixture: ComponentFixture<AgendaEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaEntradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
