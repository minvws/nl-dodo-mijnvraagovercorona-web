/** @jsx jsx */
import React, { useState} from 'react';
import { Input, jsx } from 'theme-ui';
import Link from 'next/link';
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

    const renderDestinationLink = (dest: destination) => {
        return (
            <div key={dest.city}>
                <Link href={`/advice/${dest.country}`}>
                    <a>{dest.city} - {dest.country}</a>
                </Link>
            </div>
        );
    }

    return (
        <>
            <Input type="text"
                   placeholder='Bijvoorbeeld "Antwerpen"'
                   onChange={handleChange} />
            {searchResults.map(renderDestinationLink)}
        </>
    )
}

export default DestinationSearch;
