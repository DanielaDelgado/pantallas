import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExpedientePage } from './expediente.page';

describe('ExpedientePage', () => {
  let component: ExpedientePage;
  let fixture: ComponentFixture<ExpedientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpedientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpedientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
