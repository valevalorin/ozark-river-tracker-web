import { Component, OnInit, AfterViewInit, Injector } from '@angular/core';
import { NgElement, WithProperties, createCustomElement } from '@angular/elements';
import { latLng, LatLng, tileLayer, marker } from 'leaflet';
import { GaugeWrapperComponent } from '../gauge-wrapper/gauge-wrapper.component';
declare const L: any;
const MAPBOX_TOKEN = 'pk.eyJ1IjoidmFsZXZhbG9yaW4iLCJhIjoiY2thbGdidnNlMTFkNDJyczBvbDVpZjVkMCJ9.kFuIDpDHu_dX6zCfIsqP4A';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  constructor(private injector: Injector) { }

  private map: any;
  public leafletOptions: any = {};
  public leafletLayers: any[] = [];
  

  ngOnInit() {
    console.log('beacon');
    this.leafletOptions = {
      layers: [
        tileLayer(
          // 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            tileSize: 512,
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            accessToken: MAPBOX_TOKEN,
            zoomOffset: -1
          }
        )
      ],
      zoom: 13,
      center: latLng(36.956008, -90.994107)
    };

    // this.leafletLayers.push(
    //   marker([ 36.956008, -90.994107 ])
    // );

    let m = marker([ 36.956008, -90.994107 ]);
    this.leafletLayers.push(m);

    // m.bindPopup( layer => {
    //   // let scope = this;
    //   let injector = this.injector;
    //   const popupEl = createCustomElement(GaugeWrapperComponent, {injector});
    //   // const popupEl: NgElement & WithProperties<GaugeWrapperComponent> = document.createElement('app-gauge-wrapper') as any;
    //   // popupEl.name = 'Hello';
    //   return popupEl;
    // }, {});

    m.bindPopup( layer => {
      const popupEl: NgElement & WithProperties<GaugeWrapperComponent> = document.createElement('gauge-wrapper') as any;
      // Listen to the close event
      popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));
      popupEl.name = 'Hello';
      // Add to the DOM
      document.body.appendChild(popupEl);
      return popupEl;
      // layer.bindPopup( fl => {
        
      // });
    }, {});

    
  }

  ngAfterViewInit() {
    // this.map = L.map('mapid', {
    //   // center: [51.505, -0.09],
    //   center: [36.956008, -90.994107],
    //   zoom: 13
    // });

    // L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    //   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //   maxZoom: 18,
    //   id: 'mapbox/streets-v11',
    //   tileSize: 512,
    //   zoomOffset: -1,
    //   accessToken: MAPBOX_TOKEN
    // }).addTo(this.map);

    // var popup = L.popup()
    // .setLatLng([36.956008, -90.994107])
    // // .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    // .setContent('<app-gauge-wrapper></app-gauge-wrapper>')
    // .openOn(this.map);
  }

}
