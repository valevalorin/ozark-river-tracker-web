import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

// Custom Components
import { MapComponent } from './map/map.component';
import { GaugeWrapperComponent } from './gauge-wrapper/gauge-wrapper.component';

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
    LeafletModule
  ],
  entryComponents: [GaugeWrapperComponent],
  providers: [],
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
