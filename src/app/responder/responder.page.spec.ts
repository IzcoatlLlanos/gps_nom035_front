import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponderPage } from './responder.page';

describe('ResponderPage', () => {
  let component: ResponderPage;
  let fixture: ComponentFixture<ResponderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResponderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
