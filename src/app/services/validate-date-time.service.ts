import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class ValidateDateTimeService {

  // checks the date to be within next 48 hours
  validateInput = (dateTime) => {
    const today: number = new Date().getTime();
    const limitDate: number = today + (24 * 2 * 3600 * 1000);
    const dateInSeconds: number = new Date(dateTime).getTime();
    if (today < dateInSeconds && dateInSeconds < limitDate) {
      return true;
    }
  }

  // covret date time in given format
  getLocalTime = (time) => {
    return moment(time).format('h:mm a');
  }

}
