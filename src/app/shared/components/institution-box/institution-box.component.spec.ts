import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionBoxComponent } from './institution-box.component';

describe('InstitutionBoxComponent', () => {
  let component: InstitutionBoxComponent;
  let fixture: ComponentFixture<InstitutionBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
