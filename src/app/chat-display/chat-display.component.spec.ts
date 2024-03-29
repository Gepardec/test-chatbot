import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDisplayComponent } from './chat-display.component';

describe('ChatDisplayComponent', () => {
  let component: ChatDisplayComponent;
  let fixture: ComponentFixture<ChatDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatDisplayComponent]
    });
    fixture = TestBed.createComponent(ChatDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
