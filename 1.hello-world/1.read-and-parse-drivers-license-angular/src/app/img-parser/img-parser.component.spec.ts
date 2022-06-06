import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgParserComponent } from './img-parser.component';

describe('HelloWorldComponent', () => {
  let component: ImgParserComponent;
  let fixture: ComponentFixture<ImgParserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgParserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
