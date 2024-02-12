import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyConnectionComponent } from './spotify-connection.component';

describe('SpotifyConnectionComponent', () => {
  let component: SpotifyConnectionComponent;
  let fixture: ComponentFixture<SpotifyConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifyConnectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpotifyConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
