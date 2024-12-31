import { useGeocodingAddress } from '@/hooks/useGeocodingAddress';
import { GetAddressesDTO } from '@baobbab/dtos';
import { useState } from 'react';
import AutoComplete from './AutoComplete';

export function AddressSearch(): JSX.Element {
    // valeur de recherche
    const [searchValue, setSearchValue] = useState<string>('');
    // valeur de selection finale
    const [selectedValue, setSelectedValue] = useState<string>('');

    //Prépare l'objet GetAddressDTO pour le fetch
    const searchDTO: GetAddressesDTO = { address: searchValue || '', limit: 5 };
    // Appeler le hook pour récupérer les données de recherche sur l'api
    const { data, isLoading, error } = useGeocodingAddress(searchDTO);

    // Transformer les données en format attendu par AutoComplete
    const items =
        data?.flatMap((featureCollection) =>
            featureCollection.features.map((feature) => ({
                value: feature.properties.city,
                label: feature.properties.city,
            }))
        ) ?? [];

    return (
        <div>
            <AutoComplete
                selectedValue={selectedValue}
                onSelectedValueChange={setSelectedValue}
                searchValue={searchValue}
                onSearchValueChange={setSearchValue}
                items={items}
                isLoading={isLoading}
                placeholder="Rechercher une ville..."
                emptyMessage={
                    error
                        ? 'Erreur lors du chargement'
                        : 'Aucun résultat trouvé'
                }
            />
        </div>
    );
}
