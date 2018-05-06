import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})

export class SearchBoxComponent implements OnInit {

  latFrom: number;
  lngFrom: number;
  isAussieAddress: boolean;
  isAddressSelected = false;

  @ViewChild('search1') public searchElement: ElementRef;
  @Output() directions: EventEmitter<any> = new EventEmitter<any>();

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ["address"] });

      // triggred on every address change 
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.checkAddress(place);
        });
      });
    });
  }

  // check if the address is australian
  checkAddress = (place) => {
    this.isAddressSelected = true;
    this.isAussieAddress = place.formatted_address.indexOf('Australia') > -1 ? true : false;
    this.isAussieAddress ? this.emitAddress(place) : this.searchElement.nativeElement.value = '' ;
  }

  // emit address details to parent component
  emitAddress = (place) => {
    this.directions.emit(place);
  }

}
