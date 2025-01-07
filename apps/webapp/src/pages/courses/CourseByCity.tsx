import Maplibre from '@/components/map/Maplibre';
import { useParams } from 'react-router';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { coursesNantes, coursesNantesProps } from '@/utils/coursesGeocoding';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { getCoordinates } from '@/api/geocoding';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import LeafletMap from '@/components/map/LeafletMap';

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

//     console.log("coordinates dans coursebycity", coordinates);

//     // const [center, setCenter] = useState<{ lng: number; lat: number }>({ lng: coordinates?.lng ?? 0, lat: coordinates?.lat ?? 0 })
//     // const [selectMarker, setSelectMarker] = useState<number | undefined>()
//     // const handleCardClick = (coursesNantes: coursesNantesProps) => {
//     //     setSelectMarker(coursesNantes.id); // Mettre à jour le centre de la carte
//     // }

//     return (
//         <div className="flex w-full h-full mt-4 fixed ">
//             <div className="w-1/2 grid grid-cols items-center justify-center px-9 gap-4 overflow-y-scroll  scrollbar-none ">

//                 {coursesNantes.map((item) => (
//                     <Card
//                         key={item.id}
//                         className="w-full h-44 shadow-sm border rounded-md overflow-hidden flex  border-none relative"
//                         // onMouseEnter={() => handleCardClick(item.id)}
//                     >
//                        {/* Image avec le cœur */}
//                        <div className="relative w-1/3 h-full ">
//                             <img
//                                 src={`https://fakeimg.pl/300x150?text=${encodeURIComponent(item.name)}`}
//                                 alt={item.name}
//                                 className="w-full h-full object-cover"
//                             />

//                             {/* Bouton avec le cœur */}
//                             <Button
//                                 variant= 'ghost'
//                                 size='icon'
//                                 className="absolute bottom-2 right-2  transition-transform transform hover:scale-110  "
//                                 onClick={() => console.log(`${item.name} ajouté aux favoris`)}
//                             >
//                                 <Heart size={25} className='text-white' />
//                             </Button>
//                         </div>
//                         <div className='flex flex-col justify-around text-gray-600'>
//                         <CardHeader>
//                             <CardTitle className="text-lg font-semibold ">
//                                 {item.name}
//                             </CardTitle>
//                             <CardDescription className="text-sm ">
//                                 Coordonnées : {item.lng}, {item.lat}
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             <p className="text-gray-600 text-sm">
//                                 Jours d'ouverture : Lundi - Vendredi
//                             </p>
//                         </CardContent>
//                         {/* <div className="p-4">
//                             <Button className=" text-sm px-4 py-2 rounded-md hover:bg-[#dfa438]">
//                                 Voir plus
//                             </Button>

//                         </div> */}
//                         </div>
//                     </Card>
//                 ))}
//             </div>
//             <div className="w-1/2 sticky ">
//                 <Maplibre loadCoordinates={coordinates ?? null} isLoading= {isLoading} error={error}  data={coursesNantes} />
//             </div>
//         </div>
//     );
// };

// export default CourseByCity;

//

const CourseByCity = (): JSX.Element | null => {
    const { city } = useParams<{ city: string }>();
    if (!city) {
        return null;
    }

    const {
        data: coordinates,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['coordinates', city],
        queryFn: () => getCoordinates(city),
        enabled: !!city,
    });

    const [hoveredCardId, setHoveredCardId] = useState<number | null>(null); // ID de la carte survolée

    return (
        <div className="flex w-full h-full mt-4 fixed ">
            <div className="w-1/2 grid grid-cols items-center justify-center px-9 gap-4 overflow-y-scroll scrollbar-none ">
                {coursesNantes.map((item) => (
                    <Card
                        key={item.id}
                        className="w-full h-44 shadow-sm border rounded-md overflow-hidden flex border-none relative"
                        onMouseEnter={() => setHoveredCardId(item.id)} // Survol : définir l'ID de la carte
                        onMouseLeave={() => setHoveredCardId(null)} // Quitter : réinitialiser l'ID
                    >
                        <div className="relative w-1/3 h-full ">
                            <img
                                src={`https://fakeimg.pl/300x150?text=${encodeURIComponent(
                                    item.name
                                )}`}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute bottom-2 right-2  transition-transform transform hover:scale-110  "
                                onClick={() =>
                                    console.log(
                                        `${item.name} ajouté aux favoris`
                                    )
                                }
                            >
                                <Heart size={25} className="text-white scale" />
                            </Button>
                        </div>
                        <div className="flex flex-col justify-around text-gray-600">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold ">
                                    {item.name}
                                </CardTitle>
                                <CardDescription className="text-sm ">
                                    Coordonnées : {item.lng}, {item.lat}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-sm">
                                    Jours d'ouverture : Lundi - Vendredi
                                </p>
                            </CardContent>
                        </div>
                    </Card>
                ))}
            </div>
            <div className="w-1/2 sticky ">
                <LeafletMap
                    loadCoordinates={coordinates ?? null}
                    isLoading={isLoading}
                    error={error}
                    coursesNantes={coursesNantes}
                    hoveredCardId={hoveredCardId} // Passer l'ID de la carte survolée
                />
            </div>
        </div>
    );
};

export default CourseByCity;
