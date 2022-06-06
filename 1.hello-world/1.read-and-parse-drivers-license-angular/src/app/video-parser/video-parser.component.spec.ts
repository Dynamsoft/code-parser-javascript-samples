import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoParserComponent } from './video-parser.component';

describe('BarcodeScannerComponent', () => {
  let component: VideoParserComponent;
  let fixture: ComponentFixture<VideoParserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoParserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
