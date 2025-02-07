export interface GetAddressesDTO {
    address: string;
    limit: number;
}

export interface Point {
    latitude: number;
    longitude: number;
}

export interface Geometry {
    type: Point;
    coordinate: [number, number];
}

// DTO pour les propriétés
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

// DTO pour les fonctionnalités
export interface GeocodingFeature {
    type: string;
    geometry: Geometry;
    properties: GeocodingProperties;
}

// DTO pour la collection de fonctionnalités
export interface GeocodingFeatureCollection {
    type: string;
    version: string;
    features: GeocodingFeature[];
    attribution: string;
    licence: string;
    query: string;
    limit: number;
}
