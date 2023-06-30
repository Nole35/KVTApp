import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountDataComponent } from './user-account-data.component';

describe('UserAccountDataComponent', () => {
  let component: UserAccountDataComponent;
  let fixture: ComponentFixture<UserAccountDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAccountDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAccountDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
