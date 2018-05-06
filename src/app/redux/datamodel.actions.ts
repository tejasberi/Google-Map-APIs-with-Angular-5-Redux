import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { datamodal } from './datamodel';

type Payload = datamodal[];

@Injectable()
export class actions {
    static readonly ADD_DATA = 'ADD_DATA';
    @dispatch()
    addData = (payload) => ({
        type: actions.ADD_DATA,
        payload: payload
    });
}
