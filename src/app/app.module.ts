import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input'

// Other 3rd Party
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ChartsModule } from 'ng2-charts';

// Custom Components
import { MapComponent } from './map/map.component';
import { GaugeWrapperComponent } from './gauge-wrapper/gauge-wrapper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RiverService } from './services/river.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    GaugeWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
    MatIconModule,
    LeafletModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  entryComponents: [GaugeWrapperComponent],
  providers: [
    RiverService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
  constructor(private injector: Injector) {
    const GaugeWrapperElement = createCustomElement(GaugeWrapperComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('gauge-wrapper', GaugeWrapperElement);
  }
}
