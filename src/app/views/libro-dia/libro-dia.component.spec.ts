import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroDiaComponent } from './libro-dia.component';

describe('LibroDiaComponent', () => {
  let component: LibroDiaComponent;
  let fixture: ComponentFixture<LibroDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroDiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
