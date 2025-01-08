import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// const LeafletMap = ({
//   isLoading,
//   error,
//   loadCoordinates,
// }: {
//   loadCoordinates: { lat: number; lng: number } | null;
//   isLoading: boolean;
//   error: any;
// }) => {

//   console.log("data in LeafletMap", loadCoordinates);

//   if (isLoading) {
//     return <p>Chargement...</p>;
//   }

//   if (error) {
//     return <p>Erreur : {(error as Error).message}</p>;
//   }

//   return (
//     <MapContainer
//     center={loadCoordinates || { lat: 0, lng: 0 }}
//     zoom={10}
//     style={{ width: '100%', height: '700px' }}
//     >
//       <TileLayer
//     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       {loadCoordinates && (
//         <Marker position={loadCoordinates}>
//           <Popup>Bonjour</Popup>
//         </Marker>
//       )}
//     </MapContainer>
//   )
// }

// export default LeafletMap
// Composant de la carte Leaflet
// const LeafletMap = ({
//   isLoading,
//   error,
//   loadCoordinates,
//   hoveredCardId,
//   courses, // Liste des cours avec leurs ID et coordonnées
// }: {
//   loadCoordinates: { lat: number; lng: number } | null;
//   isLoading: boolean;
//   error: any;
//   hoveredCardId: number | null;
//   courses: { id: number; lat: number; lng: number }[]; // Liste des cours pour les marqueurs
// }) => {
//   console.log('data in LeafletMap', loadCoordinates);

//   if (isLoading) {
//     return <p>Chargement...</p>;
//   }

//   if (error) {
//     return <p>Erreur : {(error as Error).message}</p>;
//   }

//   // Créer une fonction qui définit l'icône d'un marqueur en fonction de l'état hover
//   const getMarkerIcon = (id: number) => {
//     const isHovered = hoveredCardId === id;

//     return new L.Icon({
//       iconUrl: isHovered
//         ? 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png' // Changer d'icône si la carte est survolée
//         : 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', // Icône par défaut
//       iconSize: isHovered ? [35, 55] : [25, 41], // Agrandir si survolé
//       iconAnchor: [15, 55],
//       popupAnchor: [1, -34],
//       shadowSize: [41, 41],
//     });
//   };

//   return (
//     <MapContainer
//       center={loadCoordinates || { lat: 0, lng: 0 }}
//       zoom={10}
//       style={{ width: '100%', height: '700px' }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
//       />
//       {courses.map((course) => (
//         <Marker
//           key={course.id}
//           position={{ lat: course.lat, lng: course.lng }}
//           icon={getMarkerIcon(course.id)} // Appliquer l'icône dynamique
//         >
//           <Popup>{`Coordonnées : ${course.lat}, ${course.lng}`}</Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default LeafletMap;

const LeafletMap = ({
    isLoading,
    error,
    loadCoordinates,
    hoveredCardId, // Passer l'ID de la carte survolée
    coursesNantes, // Passer la liste des cours
}: {
    loadCoordinates: { lat: number; lng: number } | null;
    isLoading: boolean;
    error: Error | null;
    hoveredCardId: number | null; // ID de la carte survolée
    coursesNantes: { id: number; lat: number; lng: number; name: string }[]; // Liste des cours
}): JSX.Element => {
    if (isLoading) {
        return <p>Chargement...</p>;
    }

    if (error) {
        return <p>Erreur : {(error as Error).message}</p>;
    }

    // Crée une icône personnalisée pour chaque marqueur avec changement de couleur
    const createMarkerIcon = (isHovered: boolean): L.DivIcon => {
        return new L.DivIcon({
            className: 'leaflet-div-icon', // Utilise une icône de type div pour ajouter un style personnalisé
            html: `<div style="background-color: ${isHovered ? 'red' : 'blue'}; width: 20px; height: 20px; border-radius: 50%;"></div>`,
        });
    };

    return (
        <MapContainer
            center={loadCoordinates || { lat: 0, lng: 0 }}
            zoom={10}
            style={{ width: '100%', height: '700px' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Mappage des marqueurs pour chaque cours dans coursesNantes */}
            {coursesNantes.map((course) => (
                <Marker
                    key={course.id}
                    position={{ lat: course.lat, lng: course.lng }}
                    icon={createMarkerIcon(hoveredCardId === course.id)} // Modifier la couleur selon si une carte est survolée
                >
                    <Popup>{course.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default LeafletMap;
