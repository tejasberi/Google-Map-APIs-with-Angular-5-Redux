import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, isDevMode } from '@angular/core';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ValidateDateTimeService } from './services/validate-date-time.service';
import { TravelDataService } from './services/travel-data.service';
import { rootReducer } from './redux/root.reducer';
import { actions } from './redux/datamodel.actions';
import { TripTableComponent } from './components/trip-table/trip-table.component';
import { KeysPipe } from './pipes/keys.pipe'


@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    TripTableComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD5jW7KaudAAPW-_W0ZgAaOEzy0-lP59eU',
      libraries: ["places"]
    }),
    FormsModule,
    ReactiveFormsModule,
    NgReduxModule
  ],
  providers: [
    ValidateDateTimeService,
    TravelDataService,
    actions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<any>,
    devTools: DevToolsExtension
  ) {
    const devtoolInstalled = !!window['__REDUX_DEVTOOLS_EXTENSION__'];
    const enhancers = (isDevMode() && devtoolInstalled) ? [devTools.enhancer()] : [];
    ngRedux.configureStore(rootReducer, {}, [], enhancers);
  }
}
