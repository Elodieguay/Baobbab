import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import log from 'loglevel';
import { CoursesDTOGeojson } from '@baobbab/dtos';
import { createRoot } from 'react-dom/client';
import PinCards from './PinCards';

const Maplibre = ({
    isLoading,
    error,
    courseData,
    loadCoordinates,
    hoveredCardId,
}: {
    loadCoordinates: { lng: number; lat: number } | null;
    isLoading: boolean;
    error: Error | null;
    courseData: CoursesDTOGeojson[];
    hoveredCardId: string | null;
}): JSX.Element => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    log.debug('loadCordinates', loadCoordinates);
    log.debug('coursedata de maplibre', courseData);
    const adjustPositions = useCallback(
        (courseData: CoursesDTOGeojson[]): CoursesDTOGeojson[] => {
            const seenCoords = new Map();

            return courseData.map((course) => {
                const coordsKey = course.position.coordinates.join(',');

                if (seenCoords.has(coordsKey)) {
                    // On a déjà vu ces coordonnées → On ajoute un petit décalage
                    const count = seenCoords.get(coordsKey);
                    const offset = count * 0.0001; // Décalage progressif
                    seenCoords.set(coordsKey, count + 1);

                    return {
                        ...course,
                        position: {
                            ...course.position,
                            coordinates: [
                                course.position.coordinates[0] + offset, // Décalage en longitude
                                course.position.coordinates[1] + offset, // Décalage en latitude
                            ],
                        },
                    };
                } else {
                    // Première fois qu'on voit ces coordonnées
                    seenCoords.set(coordsKey, 1);
                    return course;
                }
            });
        },
        []
    );

    const validData = courseData?.filter((course) => {
        const coordinates = course.position?.coordinates;
        return (
            coordinates && coordinates[0] !== null && coordinates[1] !== null
        );
    });

    const adjustedData = useMemo(() => adjustPositions(validData), [validData]);
    // const adjustedData = useMemo(
    //     () => adjustPositions(validData),
    //     [validData, adjustPositions]
    // );

    // log.debug('validata:', validData);

    useEffect(() => {
        if (!mapContainer.current || !loadCoordinates) return;

        const map = new maplibregl.Map({
            container: mapContainer.current!,
            style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
            center: loadCoordinates,
            zoom: 10,
        });

        map.on('load', () => {
            // log.info('Map loaded, adding points layer...');

            map.addSource('points', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: adjustedData.map((course) => ({
                        type: 'Feature',
                        geometry: course.position,
                        properties: {
                            id: course.id,
                            title: course.title,
                        },
                    })),
                },
            });

            // On ajoute une couche pour les marqueurs
            map.addLayer({
                id: 'points-layer',
                type: 'circle',
                source: 'points',
                paint: {
                    'circle-radius': [
                        'case',
                        // Si l'ID correspond à hoveredCardId
                        ['==', ['get', 'id'], hoveredCardId ?? ''],
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
                    const cardId = pointCliked.properties.id;
                    log.info('pointCliked', cardId);
                    const container = document.createElement('div');

                    const root = createRoot(container);
                    root.render(<PinCards cardId={cardId} data={courseData} />);
                    new maplibregl.Popup()
                        .setDOMContent(container)
                        .setLngLat(coordinates)
                        .addTo(map);
                }
            });

            // On ajuste la vue pour inclure tous les marqueurs
            const bounds = new maplibregl.LngLatBounds();
            adjustedData.forEach((point) => {
                const coords = point.position.coordinates;
                bounds.extend([coords[0], coords[1]]);
            });
            log.info('Bounds to fit:', bounds);
            map.fitBounds(bounds, { padding: 100 });
            map.setZoom(12);
            mapRef.current = map;
        });

        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
        };
    }, [loadCoordinates]);

    useEffect(() => {
        if (!mapRef.current) return;

        const map = mapRef.current;

        // Applique des mises à jour sur les sources existantes sans recréer la carte
        (map.getSource('points') as maplibregl.GeoJSONSource)?.setData({
            type: 'FeatureCollection',
            features: adjustedData.map((course) => ({
                type: 'Feature',
                geometry: course.position,
                properties: {
                    id: course.id,
                    title: course.title,
                },
            })),
        });
    }, [adjustedData]);

    useEffect(() => {
        if (!mapRef.current || !hoveredCardId) return;

        const layer = mapRef.current.getLayer('points-layer');
        if (!layer) return;
        // On vérifie si la couche existe avant de modifier son style
        // if (mapRef.current.getLayer('points-layer')) {

        mapRef.current.setPaintProperty('points-layer', 'circle-radius', [
            'case',
            ['==', ['get', 'id'], hoveredCardId],
            10,
            8,
        ]);
        mapRef.current.setPaintProperty('points-layer', 'circle-color', [
            'case',
            ['==', ['get', 'id'], hoveredCardId],
            '#01a274',
            '#e47890',
        ]);
        // }
    }, [hoveredCardId]);

    if (isLoading) {
        return <p>Chargement des cours...</p>;
    }

    if (error) {
        return <p>Erreur : {error.message}</p>;
    }
    return (
        <div
            ref={mapContainer}
            style={{ width: '100%', height: '100%', borderRadius: '10px' }}
        ></div>
    );
};
export default Maplibre;
