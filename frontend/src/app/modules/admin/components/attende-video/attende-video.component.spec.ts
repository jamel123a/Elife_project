import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeVideoComponent } from './attende-video.component';

describe('AttendeVideoComponent', () => {
  let component: AttendeVideoComponent;
  let fixture: ComponentFixture<AttendeVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendeVideoComponent]
    });
    fixture = TestBed.createComponent(AttendeVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
