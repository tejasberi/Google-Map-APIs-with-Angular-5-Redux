import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA, } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidateDateTimeService } from './services/validate-date-time.service';
import { TravelDataService } from './services/travel-data.service';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';

class validateDateTimeServiceMock { }

class travelDataServiceMock { }

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SearchBoxComponent
      ],
      imports: [ReactiveFormsModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [MapsAPILoader,
        { provide: ValidateDateTimeService, useClass: validateDateTimeServiceMock },
        { provide: TravelDataService, useClass: travelDataServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app component', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  describe('Testing the functions', () => {
    let params, google;
    beforeEach(() => {
      params = {
        geometry: {
          location: {
            lat: function () { return 1234 },
            lng: function () { return 5678 }
          }
        }
      };
      google = {
        maps: {
          DirectionsService: function () { }
        }
      }
    });

    it('should capture the source location', async(() => {
      component.getSourceLocation(params);
      expect(component.dir.origin).toEqual({ lat: 1234, lng: 5678 });
    }));

    it('should capture the destination location', async(() => {
      let directionSPy = spyOn(component, 'getDirections').and.returnValue(true);
      component.getDestinationLocation(params);
      expect(component.dir.destination).toEqual({ lat: 1234, lng: 5678 });
    }));

    it('should get the directions after capturing the destination location', async(() => {
      let directionSPy = spyOn(component, 'getDirections').and.returnValue(true);
      component.getDestinationLocation(params);
      expect(directionSPy).toHaveBeenCalled();
    }));
  });

});
