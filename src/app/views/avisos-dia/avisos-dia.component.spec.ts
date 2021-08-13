import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisosDiaComponent } from './avisos-dia.component';

describe('AvisosDiaComponent', () => {
  let component: AvisosDiaComponent;
  let fixture: ComponentFixture<AvisosDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisosDiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisosDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
