import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatevideoComponent } from './updatevideo.component';

describe('UpdatevideoComponent', () => {
  let component: UpdatevideoComponent;
  let fixture: ComponentFixture<UpdatevideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatevideoComponent]
    });
    fixture = TestBed.createComponent(UpdatevideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
