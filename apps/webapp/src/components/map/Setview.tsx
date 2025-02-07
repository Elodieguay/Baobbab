import { useMap } from 'react-leaflet';

// Composant pour définir la vue initiale de la carte
export const SetView = ({
    centerNantes,
}: {
    centerNantes: [number, number];
}): JSX.Element | null => {
    const map = useMap();
    map.setView(centerNantes, 12); // 12 = niveau de zoom initial
    return null;
};
