import { useGeocodingAddress } from '@/hooks/form/useGeocodingAddress';
import { GeocodingFeature, GetAddressesDTO } from '@baobbab/dtos';
import { useState } from 'react';
import AutoComplete from './AutoComplete';
import log from 'loglevel';

export function AddressSearch(): JSX.Element {
    // valeur de recherche
    const [searchValue, setSearchValue] = useState<string>('');
    // valeur de selection finale
    const [selectedValue, setSelectedValue] = useState<string>('');

    //Prépare l'objet GetAddressDTO pour le fetch
    const searchDTO: GetAddressesDTO = { address: searchValue || '', limit: 5 };
    // Appeler le hook pour récupérer les données de recherche sur l'api
    const { data, isLoading, error } = useGeocodingAddress(searchDTO);
    log.info('data:', data);
    // Transformer les données en format attendu par AutoComplete

    const items =
        data?.features.map((feature: GeocodingFeature) => ({
            value: feature.properties.name, // Nom simple
            label: feature.properties.label, // Label complet avec adresse
        })) ?? [];

    console.log('items:', items);
    log.info('searchValue:', searchValue);

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
