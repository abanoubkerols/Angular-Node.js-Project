import { Order } from 'src/app/shared/models/order';
import { LocationService } from './../../../services/location.service';
import { Component, ElementRef, Input, ViewChild, OnChanges } from '@angular/core';
import { icon, latLng, LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, map, Map, marker, Marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges {

  @Input() order!: Order
  @Input() readonly = false
  private readonly DEFAULT_LATING: LatLngTuple = [13.74, 21.62]
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  @ViewChild('map', { static: true }) mapRef!: ElementRef

  map!: Map
  currentMarker!: Marker
  constructor(private LocationService: LocationService) { }

  ngOnChanges(): void {
    if (!this.order) {
      return
    }
    this.initializeMap()

    if (this.readonly && this.addressLatLng) {
      this.showLocationOnREadOnlyMode()
    }
  }
  showLocationOnREadOnlyMode() {
    const m = this.map
    this.setMarker(this.addressLatLng)
    m.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL)


    m.dragging.disable()
    m.touchZoom.disable()
    m.doubleClickZoom.disable()
    m.scrollWheelZoom.disable()
    m.boxZoom.disable()
    m.keyboard.disable()
    m.off('click')
    m.tap?.disable()
    this.currentMarker.dragging?.disable()


  }

  initializeMap() {
    if (this.map) {
      return
    }

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATING, 1)

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map)

    this.map.on('click', (e: LeafletMouseEvent) => {
      this.setMarker(e.latlng)
    })
  }

  findMyLocation() {
    this.LocationService.getCurrentLocation().subscribe({
      next: (latLng) => {
        this.map.setView(latLng, this.MARKER_ZOOM_LEVEL)
        this.setMarker(latLng)
      }
    })
  }

  setMarker(latlng: LatLngExpression) {

    this.addressLatlang = latlng as LatLng

    if (this.currentMarker) {
      this.currentMarker.setLatLng(latlng)
      return
    }

    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON

    }).addTo(this.map)

    this.currentMarker.on('dragend', () => {
      this.addressLatlang = this.currentMarker.getLatLng()
    })
  }

  set addressLatlang(latLng: LatLng) {
    if (!latLng.lat.toFixed) {
      return
    }
    latLng.lat = parseFloat(latLng.lat.toFixed(8))
    latLng.lng = parseFloat(latLng.lng.toFixed(8))
    this.order.addressLatLng = latLng
  }

  get addressLatLng() {
    return this.order.addressLatLng!
  }

}


