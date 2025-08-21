import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosFaltaComponent } from './pos-falta.component';

describe('PosFaltaComponent', () => {
  let component: PosFaltaComponent;
  let fixture: ComponentFixture<PosFaltaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PosFaltaComponent]
    });
    fixture = TestBed.createComponent(PosFaltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
