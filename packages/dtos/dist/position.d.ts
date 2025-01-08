export interface GetAddressesDTO {
    address: string;
    limit: number;
}
export interface Point {
    lat: number;
    lng: number;
}
export interface coordinate{
    longitude: number,
    latitude: number
}
export interface Geometry {
    type: Point;
    coordinates: [number, number];
}
export interface GeocodingProperties {
    label: string;
    score: number;
    housenumber: string;
    id: string;
    type: string;
    name: string;
    postcode: string;
    citycode: string;
    x: number;
    y: number;
    city: string;
    context: string;
    importance: number;
    street: string;
}
export interface GeocodingFeature {
    type: string;
    geometry: Geometry;
    properties: GeocodingProperties;
}
export interface GeocodingFeatureCollection {
    type: string;
    version: string;
    features: GeocodingFeature[];
    attribution: string;
    licence: string;
    query: string;
    limit: number;
}
