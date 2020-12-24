/** @jsx jsx */
import React, { useState} from 'react';
import { Container, Flex, Image, Input, jsx } from 'theme-ui';
import Link from 'next/link';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, ComboboxOptionText } from '@reach/combobox';
import '@reach/combobox/styles.css';
import searchDestination, { destination } from '../../utilities/destinationUtil';

const DestinationSearch = () => {
    const [searchResults, setSearchResults] = useState([] as destination[]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === '') {
            setSearchResults([]);
        } else {
            setSearchResults(searchDestination(value));
        }
    };

    const renderDestinationOption = (dest: destination) => {
        const key = `${dest.city}, ${dest.country}`;
        return (
            <ComboboxOption key={key} value={key}>
                <Link href={`/advice/${dest.country}`}>
                    <a>{key}</a>
                </Link>
            </ComboboxOption>
        );
    }

    return (
      <Container>
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
            sx={{ width: '100%' }}>
            <ComboboxInput
              sx={{
                width: '100%',
                padding: '0.5em',
                fontSize:'1.1em',
                border: 'none'
              }}
              onChange={handleChange}
              placeholder='Bijvoorbeeld "Antwerpen"'/>
            <ComboboxPopover
              sx={{
                border: 'none',
                padding: '1em',
                marginTop: '1em',
                marginLeft: '-1em',

                fontSize: 20,
                a: {
                  textDecoration: 'none',
                  color: 'black'
                },
                li: {
                  paddingBottom: '1em'
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
