import { Component, OnInit, AfterViewInit, Injector } from '@angular/core';
import { NgElement, WithProperties, createCustomElement } from '@angular/elements';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { latLng, LatLng, tileLayer, marker, icon } from 'leaflet';
import { GaugeWrapperComponent } from '../gauge-wrapper/gauge-wrapper.component';
import { RiverService } from '../services/river.service';
import { River } from '../classes/river.class';
import { Util } from '../classes/util';
declare const L: any;
const MAPBOX_TOKEN = 'pk.eyJ1IjoidmFsZXZhbG9yaW4iLCJhIjoiY2thbGdidnNlMTFkNDJyczBvbDVpZjVkMCJ9.kFuIDpDHu_dX6zCfIsqP4A';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(
    private injector: Injector,
    private formBuilder: FormBuilder,
    private riverService: RiverService
  ) { }

  private map: any;
  public leafletOptions: any = {};
  public leafletLayers: any[] = [];
  public leafletZoom: number = 13;
  public leafletCenter = latLng( 36.956008, -90.994107);
  private leafletMarker = icon({
    iconUrl: 'assets/img/gauge_light_margin.png',
    iconSize: [41, 59],
    iconAnchor: [20, 59]
  })

  public rivers: River[] = [];
  public filteredRivers: River[];
  public autocompleteOpen: boolean = false;
  public activeRiver: River = null;

  public form: FormGroup;
  
  ngOnInit() {
    // initialize form
    this.form = this.formBuilder.group({
      searchInput: ['', null],
      selectedRiver: [null, null]
    });

    this.form.get('searchInput').valueChanges.subscribe((name: any) => {
      if(Util.nnue(name)) {
        if(name instanceof River) {
          name = name.name;
        }
        
        this.filteredRivers = this.rivers.filter((river: River) => {
          let riverName = this.stripPunctuation(river.name.toLowerCase());
          let input = this.stripPunctuation(name.toLowerCase());
          if(riverName.includes(input)) {
            return true;
          }
          return false;
        });
      } else {
        this.filteredRivers = this.rivers;
      }
    });

    this.riverService.getRivers().then((rivers) => {
      this.rivers = rivers;

      let firstRiver = rivers[0];
      this.form.get('searchInput').setValue(firstRiver.name);
      this.activeRiverChanged(firstRiver);
      this.filteredRivers = rivers;
    });

    this.initializeMap();
  }

  public autocompleteRiverSelected(river: River) {
    if(river instanceof River && (Util.inu(this.activeRiver) || this.activeRiver.id !== river.id)) {
      this.activeRiverChanged(river);
    }
  }

  public stripPunctuation(input: string) {
    return input.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"]/g,"");
  }

  public openAutocomplete() {
    this.autocompleteOpen = true;
  }

  public centerOnGauge(gauge: any) {
    this.leafletCenter = latLng(gauge.lat, gauge.long);
    this.leafletZoom = this.activeRiver.zoom;
  }

  private initializeMap(): void {
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
      ]
    };
  }

  private activeRiverChanged(river: River): void {
    this.riverService.getGauges(river.id).then((gauges) => {
      this.activeRiver = river;
      river.gauges = gauges;
      this.renderActiveRiver();
    });
  }

  private renderActiveRiver(): void {
    this.leafletCenter = latLng(this.activeRiver.centerLat, this.activeRiver.centerLong);
    this.leafletZoom = this.activeRiver.zoom;

    this.leafletLayers = [];

    this.activeRiver.gauges.forEach((gauge) => {
      let m = marker([ gauge.lat, gauge.long ], {icon: this.leafletMarker});
      this.leafletLayers.push(m);

      m.bindPopup( layer => {
        const popupEl: NgElement & WithProperties<GaugeWrapperComponent> = document.createElement('gauge-wrapper') as any;
        // Listen to the close event
        popupEl.addEventListener('closed', () => document.body.removeChild(popupEl));
        popupEl.gauge = gauge;
        // Add to the DOM
        document.body.appendChild(popupEl);
        return popupEl;
      }, {});
    });

  }

}
