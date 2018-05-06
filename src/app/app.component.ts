import { Component } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidateDateTimeService } from './services/validate-date-time.service';
import { TravelDataService } from './services/travel-data.service';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  // Subscribing to the data in redux store
  @select(['datareducer']) tableData: Observable<any>;

  dir = { origin: undefined, destination: undefined };
  pickUpAddress: string;
  dropAddress: string;
  contactForm: FormGroup;
  isFormSubmitted: boolean;
  isDateInValid: boolean;
  travelDuration: string;
  distance: string;

  constructor(
    private formBuilder: FormBuilder,
    private validateDateTimeService: ValidateDateTimeService,
    private travelDataService: TravelDataService
  ) { this.buildForm(); }

  ngOnInit() { }

  buildForm = () => {
    this.contactForm = this.formBuilder.group({
      mobileNumber: this.formBuilder.control(null, [Validators.required, Validators.pattern('^04[0-9]{8}$')]),
      dateTime: this.formBuilder.control(null, [Validators.required])
    });
  }

  getSourceLocation = (event) => {
    this.pickUpAddress = event;
    this.dir.origin = { lat: event.geometry.location.lat(), lng: event.geometry.location.lng() };
  }

  getDestinationLocation = (event) => {
    this.dropAddress = event;
    this.dir.destination = { lat: event.geometry.location.lat(), lng: event.geometry.location.lng() };
    this.getDirections();
  }

  onSubmit = (contactForm) => {
    this.isFormSubmitted = true;
    if (contactForm.controls.dateTime.value) {
      this.validateInputs(contactForm);
    }
  }

  validateInputs = (contactForm) => {
    this.isDateInValid = !this.validateDateTimeService.validateInput(contactForm.controls.dateTime.value);
    if (!this.isDateInValid && this.dir.origin && this.dir.destination && !contactForm.controls.mobileNumber.errors) {
      this.travelDataService.addData(this.pickUpAddress, this.dropAddress, this.travelDuration, this.distance);
    }
  }

  getDirections = () => {
    var request = {
      origin: this.dir.origin,
      destination: this.dir.destination,
      travelMode: google.maps.TravelMode.DRIVING
    }
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, (result, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        this.travelDuration = result.routes[0].legs[0].duration.text;
        this.distance = result.routes[0].legs[0].distance.text;
      } else {
        alert("Could not calculate directions. Try again, or buy a map!");
      }
    });
  }
}
