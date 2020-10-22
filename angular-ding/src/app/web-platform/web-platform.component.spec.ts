import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebPlatformComponent } from './web-platform.component';

describe('WebPlatformComponent', () => {
  let component: WebPlatformComponent;
  let fixture: ComponentFixture<WebPlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebPlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
