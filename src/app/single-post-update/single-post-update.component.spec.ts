import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePostUpdateComponent } from './single-post-update.component';

describe('SinglePostUpdateComponent', () => {
  let component: SinglePostUpdateComponent;
  let fixture: ComponentFixture<SinglePostUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglePostUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglePostUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
