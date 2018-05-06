import { Injectable } from '@angular/core';
import { actions } from '../redux/datamodel.actions';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

@Injectable()
export class TravelDataService {

    constructor(private actions: actions) { }

    // Subscribing to the data in redux store
    @select(['datareducer']) tableData: Observable<any>;

    addData = (pickUpAddress, dropAddress, travelDuration, distance) => {
        this.actions.addData({
            pickUpAddress: pickUpAddress.formatted_address,
            dropAddress: dropAddress.formatted_address,
            duration: travelDuration,
            distance: distance,
            timeZone: pickUpAddress.utc_offset
        })
    }
}
