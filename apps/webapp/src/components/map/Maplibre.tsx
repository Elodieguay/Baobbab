import maplibregl from 'maplibre-gl';
import { useEffect, useRef } from 'react';
import PinCards from './PinCards';
import { createRoot } from 'react-dom/client';

const Maplibre = ({
    isLoading,
    error,
    data,
    loadCoordinates,
    hoveredCardId,
}: {
    loadCoordinates: { lng: number; lat: number } | null;
    isLoading: boolean;
    error: Error | null;
    data: { id: number; lng: number; lat: number }[]; // Exemple du type des données
    hoveredCardId: number | null;
}): JSX.Element => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);

    // Préparer les données GeoJSON
    const geojsonData: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
        type: 'FeatureCollection',
        features: data.map((point) => ({
            type: 'Feature',
            properties: {
                id: point.id,
            },
            geometry: {
                type: 'Point',
                coordinates: [point.lng, point.lat],
            },
        })),
    };

    useEffect(() => {
        if (!mapContainer.current || !loadCoordinates) return;

        const map = new maplibregl.Map({
            container: mapContainer.current!,
            style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
            center: loadCoordinates,
            zoom: 10,
        });

        map.on('load', () => {
            // Ajouter une source GeoJSON
            map.addSource('points', {
                type: 'geojson',
                data: geojsonData,
            });

            // On Ajouter une couche pour les marqueurs
            map.addLayer({
                id: 'points-layer',
                type: 'circle',
                source: 'points',
                paint: {
                    'circle-radius': [
                        'case',
                        // Si l'ID correspond à hoveredCardId
                        ['==', ['get', 'id'], hoveredCardId ?? -1],
                        10,
                        // Taille par défaut
                        8,
                    ],
                    'circle-color': [
                        'case',
                        ['==', ['get', 'id'], hoveredCardId ?? ''],
                        '#ffe55a',
                        '#e47890',
                    ],
                },
            });

            map.on('click', 'points-layer', (e) => {
                const pointCliked = e.features ? e.features[0] : null;
                if (pointCliked && pointCliked.geometry.type === 'Point') {
                    const coordinates = (pointCliked.geometry as GeoJSON.Point)
                        .coordinates as [number, number];
                    const container = document.createElement('div');

                    const root = createRoot(container);
                    root.render(<PinCards />);
                    new maplibregl.Popup()
                        .setDOMContent(container)
                        .setLngLat(coordinates)
                        .addTo(map);
                }
            });

            // On ajuste la vue pour inclure tous les marqueurs
            const bounds = new maplibregl.LngLatBounds();
            data.forEach((point) => bounds.extend([point.lng, point.lat]));
            map.fitBounds(bounds, { padding: 100 });

            mapRef.current = map;
        });

        return () => {
            map.remove();
        };
    }, [loadCoordinates, data]);

    // Mettre à jour la source et le style lorsque `hoveredCardId` change
    useEffect(() => {
        if (!mapRef.current) return;

        const map = mapRef.current;

        if (map.getSource('points')) {
            // Mettre à jour les données GeoJSON
            (map.getSource('points') as maplibregl.GeoJSONSource).setData({
                type: 'FeatureCollection',
                features: data.map((point) => ({
                    type: 'Feature',
                    properties: {
                        id: point.id,
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [point.lng, point.lat],
                    },
                })),
            });
            // Mettre à jour les propriétés de la couche
            map.setPaintProperty('points-layer', 'circle-radius', [
                'case',
                ['==', ['get', 'id'], hoveredCardId],
                10,
                8,
            ]);

            map.setPaintProperty('points-layer', 'circle-color', [
                'case',
                ['==', ['get', 'id'], hoveredCardId],
                '#ffe55a',
                '#e47890',
            ]);
        }
    }, [hoveredCardId]);

    if (isLoading) {
        return <p>Chargement...</p>;
    }
    if (error) {
        return <p>Erreur : {error.message}</p>;
    }
    if (
        !loadCoordinates ||
        !('lat' in loadCoordinates) ||
        !('lng' in loadCoordinates)
    ) {
        return <p>Chargement impossible</p>;
    }

    console.log('hovercardId', hoveredCardId);

    return (
        <div
            ref={mapContainer}
            style={{ width: '100%', height: '100%', borderRadius: '10px' }}
        ></div>
    );
};
export default Maplibre;
