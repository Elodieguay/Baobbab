// import { useEffect, useRef} from 'react';
// import maplibregl from 'maplibre-gl';
// import { coursesNantes } from '@/utils/coursesGeocoding';

// const Maplibre = ({ isLoading, error, data, loadCoordinates }: { loadCoordinates: { lng: number; lat: number }|null, isLoading: boolean, error: any, data : typeof coursesNantes}) => {
//     const mapContainer = useRef<HTMLDivElement | null>(null);

//   console.log('loadCoordinates', loadCoordinates);

//     useEffect(() => {
//         if (!mapContainer.current || !loadCoordinates) return;
//         const map = new maplibregl.Map({
//             container: mapContainer.current!,
//             // style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
//             style:'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
//             center: loadCoordinates,
//             zoom:12

//         });
//         map.on('load', () => {
//             // On Crée un objet LngLatBounds
//             const bounds = new maplibregl.LngLatBounds();
//             // On ajoute chaque marqueur et étend les limites

//             data.forEach((point) => {
//                 new maplibregl.Marker({anchor:'bottom'})
//                 .setLngLat([point.lng, point.lat])
//                 .addTo(map)

//             // On ajoute les coordonnées du marqueur aux limites de la carte
//               bounds.extend([point.lng, point.lat]);

//             });
//         map.on('mouseenter', () =>{

//         })
//             // Ajuster la vue de la carte pour inclure tous les marqueurs
//             map.fitBounds(bounds, { padding: 100 });

//           });
//         return () => {
//             map.remove();
//         };
//     }, [loadCoordinates]);

//     if (isLoading) {
//         return <p>Chargement...</p>;
//     }
//     if (error) {
//         return <p>Erreur : {(error as Error).message}</p>;
//     }

//     if (!loadCoordinates || !('lat' in loadCoordinates) || !('lng' in loadCoordinates)) {
//         return <p>Chargement impossible</p>;
//     }

//     return (
//         <div ref={mapContainer} style={{ width: '100%', height: '100%', borderRadius:'10px' }}></div>
//     );
// };

// export default Maplibre;
// import { useEffect, useRef } from 'react';
// import maplibregl from 'maplibre-gl';
// import { coursesNantes } from '@/utils/coursesGeocoding';

// const Maplibre = ({
//   isLoading,
//   error,
//   data,
//   loadCoordinates,
//   onMarkerHover,
// }: {
//   loadCoordinates: { lng: number; lat: number } | null;
//   isLoading: boolean;
//   error: any;
//   data: typeof coursesNantes;
//   onMarkerHover: (id: number | null) => void; // Callback pour gérer le hover
// }) => {
//   const mapContainer = useRef<HTMLDivElement | null>(null);
//   const markersRef = useRef<maplibregl.Marker[]>([]); // Référence pour tous les marqueurs

//   useEffect(() => {
//     if (!mapContainer.current || !loadCoordinates) return;
//     const map = new maplibregl.Map({
//       container: mapContainer.current!,
//       style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
//       center: loadCoordinates,
//       zoom: 12,
//     });

//     const markers: maplibregl.Marker[] = [];

//     map.on('load', () => {
//       const bounds = new maplibregl.LngLatBounds();

//       data.forEach((point) => {
//         const marker = new maplibregl.Marker({ anchor: 'bottom' })
//           .setLngLat([point.lng, point.lat])
//           .addTo(map);

//         marker.getElement().addEventListener('mouseenter', () => {
//           onMarkerHover(point.id); // Callback au survol d'un marqueur
//         });

//         marker.getElement().addEventListener('mouseleave', () => {
//           onMarkerHover(null); // Enlever le hover
//         });

//         markers.push(marker);
//         bounds.extend([point.lng, point.lat]);
//       });

//       markersRef.current = markers; // Stocker les marqueurs dans une référence
//       map.fitBounds(bounds, { padding: 100 });
//     });

//     return () => {
//       map.remove();
//     };
//   }, [loadCoordinates]);

//   if (isLoading) return <p>Chargement...</p>;
//   if (error) return <p>Erreur : {(error as Error).message}</p>;
//   if (!loadCoordinates) return <p>Chargement impossible</p>;

//   return (
//     <div
//       ref={mapContainer}
//       style={{ width: '100%', height: '100%', borderRadius: '10px' }}
//     ></div>
//   );
// };

// export default Maplibre;
import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import { coursesNantes } from '@/utils/coursesGeocoding';

const Maplibre = ({
    isLoading,
    error,
    data,
    loadCoordinates,
    hoveredCardId, // On récupère l'ID de la carte actuellement survolée
}: {
    loadCoordinates: { lng: number; lat: number } | null;
    isLoading: boolean;
    error: Error | null;
    data: typeof coursesNantes;
    hoveredCardId: number | null; // Ajout du paramètre
}): JSX.Element => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const markersRef = useRef<{ [key: number]: maplibregl.Marker }>({}); // Stocker les markers par ID

    useEffect(() => {
        if (!mapContainer.current || !loadCoordinates) return;

        const map = new maplibregl.Map({
            container: mapContainer.current!,
            style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
            center: loadCoordinates,
            zoom: 12,
        });

        // Lors du chargement de la carte
        map.on('load', () => {
            // Étendre les limites de la carte pour inclure tous les marqueurs
            const bounds = new maplibregl.LngLatBounds();

            data.forEach((point) => {
                // Créer un marker pour chaque point
                const marker = new maplibregl.Marker({
                    color: 'green',
                    anchor: 'bottom',
                }) // Couleur par défaut : bleu
                    .setLngLat([point.lng, point.lat])
                    .addTo(map);

                // Ajouter des styles par défaut au marker
                // const markerElement = marker.getElement();
                // markerElement.style.transition = 'transform 0.3s ease'; // Animation fluide
                // markerElement.style.transform = 'scale(1)'; // Échelle par défaut
                // Ajouter des styles par défaut au marker
                const markerElement = marker.getElement();
                markerElement.style.width = '20px'; // Taille par défaut
                markerElement.style.height = '20px'; // Taille par défaut
                markerElement.style.transition =
                    'width 0.3s ease, height 0.3s ease'; // Transition fluide

                // Stocker le marker dans l'objet `markersRef`
                markersRef.current[point.id] = marker;

                // Ajouter les coordonnées aux limites
                bounds.extend([point.lng, point.lat]);
            });

            // Ajuster la vue pour inclure tous les marqueurs
            map.fitBounds(bounds, { padding: 100 });
        });

        return () => {
            map.remove();
        };
    }, [loadCoordinates]);

    // Mettre à jour la couleur des markers lorsque `hoveredCardId` change
    useEffect(() => {
        Object.entries(markersRef.current).forEach(([id, marker]) => {
            // Changer la couleur du marker correspondant à `hoveredCardId`
            //   if (Number(id) === hoveredCardId) {
            // Marker correspondant : changer la couleur en rouge
            // marker.setColor('red');
            // marker._color:'#ffe55a'
            const markerElement = marker.getElement();

            if (Number(id) === hoveredCardId) {
                // Marker correspondant : agrandir la taille
                markerElement.style.width = '30px'; // Largeur agrandie
                markerElement.style.height = '30px'; // Hauteur agrandie
                markerElement.style.color = '#ffe55a';
            } else {
                // Réinitialiser la taille pour les autres markers
                markerElement.style.width = '20px'; // Taille par défaut
                markerElement.style.height = '20px'; // Taille par défaut
                markerElement.style.color = 'blue';
            }
        });
    }, [hoveredCardId]);

    if (isLoading) {
        return <p>Chargement...</p>;
    }
    if (error) {
        return <p>Erreur : {(error as Error).message}</p>;
    }
    if (
        !loadCoordinates ||
        !('lat' in loadCoordinates) ||
        !('lng' in loadCoordinates)
    ) {
        return <p>Chargement impossible</p>;
    }

    return (
        <div
            ref={mapContainer}
            style={{ width: '100%', height: '100%', borderRadius: '10px' }}
        ></div>
    );
};

export default Maplibre;
