import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroEntradaComponent } from './libro-entrada.component';

describe('LibroEntradaComponent', () => {
  let component: LibroEntradaComponent;
  let fixture: ComponentFixture<LibroEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroEntradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
