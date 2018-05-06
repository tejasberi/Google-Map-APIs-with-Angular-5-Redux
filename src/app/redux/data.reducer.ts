import { datamodal } from './datamodel';
import { actions } from './datamodel.actions';
import { datamodal_initial_state } from './datamodel.initialstate';

// Adds the data to the redux store
export function datareducer(state: datamodal = datamodal_initial_state, action) {
    switch (action.type) {
        case actions.ADD_DATA:
            return {
                ...state,
                loaded: true,
                data: { ...state.data, [action.payload.timeZone]: action.payload }
            };

    }
    return state;
}