/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import { Flex, Container, Input, jsx } from 'theme-ui';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, ComboboxOptionText } from '@reach/combobox';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Destination, searchCities } from 'services/CountryService';
import { formatDestination } from 'utilities/pathUtils';
import '@reach/combobox/styles.css';

const DestinationSearch = () => {
    const [searchResults, setSearchResults] = useState([] as Destination[]);
    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === '') {
            setSearchResults([]);
        } else {
            setSearchResults(searchCities(value));
        }
    };

    const getDestinationName = (dest: Destination) => {
        return dest.city.length > 0
                                ? `${dest.city}, ${dest.country.name}`
                                : dest.country.name;
    }

    const renderDestinationOption = (dest: Destination) => {
        const key = getDestinationName(dest);
        return (
            <ComboboxOption key={key} value={key}
                            sx={{ p: { padding: 0} }}>
                <p sx={{
                    padding: 0,
                    fontWeight: 'lighter'
                }}>{dest.city}<br />{dest.country.name}</p>
            </ComboboxOption>
        );
    }

    const handleSelect = (destination: string) => {
        const location = `/advice/${formatDestination(destination)}`;

        router.push(location);
    }

    const handleSubmit = (event: any) => {
        if (event.key === 'Enter' && searchResults.length > 0) {
            handleSelect(getDestinationName(searchResults[0]));
        }
    }

    return (
        <Container>
            <Combobox
                sx={{
                    width: '100%',
                    paddingLeft: ['mobilePadding', 0],
                    paddingRight: ['mobilePadding', 0]
                }}
                onSelect={handleSelect}>
                <ComboboxInput
                    sx={{
                        border: '1px solid',
                        borderColor: 'inputBorder',
                        borderRadius: '5px',
                        width: '100%',
                        height: '55px',
                        paddingLeft: '56px',
                        fontSize: '20px',

                        backgroundImage: 'url("/icons/Search.svg")',
                        backgroundRepeat: 'no-repeat',
                        backgroundPositionY: '15px',
                        backgroundPositionX: '17px',
                        color: 'black'
                    }}

                    onKeyPress={handleSubmit}
                    onChange={handleChange}
                    selectOnClick={true}
                    placeholder='Bijvoorbeeld "Antwerpen"'/>
                <ComboboxPopover
                    sx={{
                        maxHeight: ['auto', '295px'],
                        border: 'none',
                        overflow: 'hidden',
                        borderBottomLeftRadius: '5px',
                        borderBottomRightRadius: '5px',
                        paddingLeft: '50px',
                        paddingBottom: '0',
                        fontSize: 20,
                        backgroundColor: ['white', '#EFF7F9'],
                        a: {
                            textDecoration: 'none',
                            color: 'black'
                        },
                        li: {
                            paddingBottom: 0,
                            marginBottom: 0,
                            paddingTop: 0
                        }
                    }}>
                    <ComboboxList sx={{

                    }}>
                        { searchResults.map(renderDestinationOption) }
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>

        </Container>
    );
}

export default DestinationSearch;
