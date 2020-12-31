/** @jsx jsx */
import React, { useState } from 'react';
import { Container, Flex, Image, Input, jsx } from 'theme-ui';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, ComboboxOptionText } from '@reach/combobox';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Destination, searchCities } from '../../services/CountryService';
import { formatDestination } from '../../utilities/pathUtils';
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

    const renderDestinationOption = (dest: Destination) => {
        const key = dest.city.length > 0 ?
                                       `${dest.city}, ${dest.country.name}`
                                       : dest.country.name;
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
            const dest = searchResults[0];
            handleSelect(`${dest.city}, ${dest.country.name}`);
        }
    }

    return (
      <Container sx={{marginTop: '4em'}}>
        <Flex
          sx={{
            marginTop: '6em',
            border: '1px solid',
            borderColor: 'inputBorder',
            borderRadius: '10px',
            margin: '1em',
            padding: '0.5em 1em'
          }}>
          <Image src='/icons/Search.svg' />
          <Combobox
              sx={{ width: '100%' }}
              onSelect={handleSelect}>
            <ComboboxInput
              sx={{
                width: '100%',
                padding: '0.5em',
                fontSize:'1.1em',
                border: 'none'
              }}
              onKeyPress={handleSubmit}
              onChange={handleChange}
              selectOnClick={true}
              placeholder='Bijvoorbeeld "Antwerpen"'/>
            <ComboboxPopover
              sx={{
                border: 'none',
                marginTop: '1em',
                  marginLeft: '-1em',
                  paddingLeft: '1em',
                  paddingBottom: '0',
                fontSize: 20,
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
              <ComboboxList>
                { searchResults.map(renderDestinationOption) }
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
        </Flex>
      </Container>
    );
}

export default DestinationSearch;
