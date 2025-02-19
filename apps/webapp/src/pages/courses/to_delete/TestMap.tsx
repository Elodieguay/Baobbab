// A METTRE SUR LA PAGE PRINCIPALE

// import { useParams } from 'react-router';
// import { coursesNantes } from '@/utils/coursesGeocoding';
// import { getCoordinates } from '@/api/geocoding';
// import { useQuery } from '@tanstack/react-query';
// import { useState } from 'react';
// import CardsCourses from '@/components/map/CardsCourses';
// import LeafletMap from '@/components/map/LeafletMap';
//

// const CourseByCity = (): JSX.Element | null => {
//     const { city } = useParams<{ city: string }>();
//     if (!city) {
//         return null;
//     }

//     const {
//         data: coordinates,
//         isLoading,
//         error,
//     } = useQuery({
//         queryKey: ['coordinates', city],
//         queryFn: () => getCoordinates(city),
//         enabled: !!city,
//     });

//     const [hoveredCardId, setHoveredCardId] = useState<number | null>(null); // ID de la carte survolée

//     return (
//         <div className="flex w-full h-full mt-4 fixed ">
//             <div className="w-1/2 grid grid-cols items-center justify-center px-9 gap-4 overflow-y-scroll scrollbar-none ">
//                 {coursesNantes.map((item) => (
//                     <Card
//                         key={item.id}
//                         className="w-full h-44 shadow-sm border rounded-md overflow-hidden flex border-none relative"
//                         onMouseEnter={() => setHoveredCardId(item.id)} // Survol : définir l'ID de la carte
//                         onMouseLeave={() => setHoveredCardId(null)} // Quitter : réinitialiser l'ID
//                     >
//                         <div className="relative w-1/3 h-full ">
//                             <img
//                                 src={`https://fakeimg.pl/300x150?text=${encodeURIComponent(
//                                     item.name
//                                 )}`}
//                                 alt={item.name}
//                                 className="w-full h-full object-cover"
//                             />
//                             <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="absolute bottom-2 right-2  transition-transform transform hover:scale-110  "
//                                 onClick={() =>
//                                     console.log(
//                                         `${item.name} ajouté aux favoris`
//                                     )
//                                 }
//                             >
//                                 <Heart size={25} className="text-white scale" />
//                             </Button>
//                         </div>
//                         <div className="flex flex-col justify-around text-gray-600">
//                             <CardHeader>
//                                 <CardTitle className="text-lg font-semibold ">
//                                     {item.name}
//                                 </CardTitle>
//                                 <CardDescription className="text-sm ">
//                                     Coordonnées : {item.lng}, {item.lat}
//                                 </CardDescription>
//                             </CardHeader>
//                             <CardContent>
//                                 <p className="text-gray-600 text-sm">
//                                     Jours d'ouverture : Lundi - Vendredi
//                                 </p>
//                             </CardContent>
//                         </div>
//                     </Card>
//                 ))}
//             </div>
//             <div className="w-1/2 sticky ">
//                 <LeafletMap
//                     loadCoordinates={coordinates ?? null}
//                     isLoading={isLoading}
//                     error={error}
//                     coursesNantes={coursesNantes}
//                     hoveredCardId={hoveredCardId} // Passer l'ID de la carte survolée
//                 />
//             </div>
//         </div>
//     );
// };

// export default CourseByCity;

// CODE A METTRE DANS LE COMPOSANT MAP

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
// import { useEffect, useRef } from 'react';
// import maplibregl from 'maplibre-gl';
// import { coursesNantes } from '@/utils/coursesGeocoding';

// const Maplibre = ({
//     isLoading,
//     error,
//     data,
//     loadCoordinates,
//     hoveredCardId,
// }: {
//     loadCoordinates: { lng: number; lat: number } | null;
//     isLoading: boolean;
//     error: Error | null;
//     data: typeof coursesNantes;
//     hoveredCardId: number | null;
// }): JSX.Element => {

//     const mapContainer = useRef<HTMLDivElement | null>(null);
//     // On stock les markers
//     const markersRef = useRef<{ [key: number]: maplibregl.Marker }>({});
//     console.log('data', data);

//     useEffect(() => {
//         if (!mapContainer.current || !loadCoordinates) return;

//         const map = new maplibregl.Map({
//             container: mapContainer.current!,
//             style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
//             center: loadCoordinates,
//             zoom: 10,
//         });

//         // Lors du chargement de la carte
//         map.on('load', () => {
//             // Étendre les limites de la carte pour inclure tous les marqueurs
//             const bounds = new maplibregl.LngLatBounds();

//             data.forEach((point) => {
//                 // Créer un marker pour chaque point
//                 const marker = new maplibregl.Marker({
//                     color:'#e47890',
//                     scale:0.8
//                 })
//                     .setLngLat([point.lng, point.lat])
//                     .addTo(map);

//                 // Ajouter des styles par défaut au marker
//                 // const markerElement = marker.getElement();
//                 // markerElement.style.transition = 'transform 0.3s ease'; // Animation fluide
//                 // markerElement.style.transform = 'scale(1)'; // Échelle par défaut
//                 // Ajouter des styles par défaut au marker
//                 // const markerElement = marker.getElement();
//                 // markerElement.style.width = '20px'; // Taille par défaut
//                 // markerElement.style.height = '20px'; // Taille par défaut
//                 // markerElement.style.transition =
//                 //     'width 0.3s ease, height 0.3s ease'; // Transition fluide

//                 // Stocker le marker dans l'objet `markersRef`
//                 markersRef.current[point.id] = marker;

//                 // Ajouter les coordonnées aux limites
//                 bounds.extend([point.lng, point.lat]);
//             });

//             // Ajuster la vue pour inclure tous les marqueurs
//             map.fitBounds(bounds, { padding: 100 });
//         });

//         return () => {
//             map.remove();
//         };
//     }, [loadCoordinates, data]);

//     // Mettre à jour la couleur des markers lorsque `hoveredCardId` change
//     useEffect(() => {
//         Object.entries(markersRef.current).forEach(([id, marker]) => {
//             const markerElement = marker.getElement();

//             // Marker correspondant : agrandir la taille
//             if (Number(id) === hoveredCardId) {

//                 // markerElement.style.width = '30px'; // Largeur agrandie
//                 // markerElement.style.height = '30px'; // Hauteur agrandie
//                 // markerElement.style.color = '#ffe55a';
//             } else {
//                 // Réinitialiser la taille pour les autres markers
//                 markerElement.style.width = '20px'; // Taille par défaut
//                 markerElement.style.height = '20px'; // Taille par défaut
//                 markerElement.style.color = 'blue';
//             }
//         });
//     }, [hoveredCardId]);

//     if (isLoading) {
//         return <p>Chargement...</p>;
//     }
//     if (error) {
//         return <p>Erreur : {(error as Error).message}</p>;
//     }
//     if (
//         !loadCoordinates ||
//         !('lat' in loadCoordinates) ||
//         !('lng' in loadCoordinates)
//     ) {
//         return <p>Chargement impossible</p>;
//     }

//     return (
//         <div
//             ref={mapContainer}
//             style={{ width: '100%', height: '100%', borderRadius: '10px' }}
//         ></div>
//     );
// };

// export default Maplibre;
