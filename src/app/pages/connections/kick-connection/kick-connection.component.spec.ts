import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KickConnectionComponent } from './kick-connection.component';

describe('KickConnectionComponent', () => {
  let component: KickConnectionComponent;
  let fixture: ComponentFixture<KickConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KickConnectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KickConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
