import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarGroupadminComponent } from './navigation-bar-groupadmin.component';

describe('NavigationBarGroupadminComponent', () => {
  let component: NavigationBarGroupadminComponent;
  let fixture: ComponentFixture<NavigationBarGroupadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationBarGroupadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationBarGroupadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
