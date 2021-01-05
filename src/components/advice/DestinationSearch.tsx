/** @jsx jsx */
import React, { useState } from 'react';
import { Container, jsx } from 'theme-ui';
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from '@reach/combobox';
import { useRouter } from 'next/router';
import { searchCities } from 'services/CountryService';
import { getCountrySlug } from 'utilities/pathUtils';
import '@reach/combobox/styles.css';
import { Country } from 'config/countries';

const DestinationSearch = () => {
	const [searchResults, setSearchResults] = useState<Country[]>([]);
	const router = useRouter();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		if (value === '') {
			setSearchResults([]);
		} else {
			setSearchResults(searchCities(value));
		}
	};

	const getDestinationName = (dest: Country) => dest.fullName;

	const handleSelect = (destinationName: string) => {
		// @TODO: Handle invalid destination names which return in null being returned
		// from the slug.
		const location = `/${getCountrySlug(destinationName)}/periode`;

		router.push(location);
	};

	const handleSubmit = (event: any) => {
		if (event.key === 'Enter' && searchResults.length > 0) {
			handleSelect(getDestinationName(searchResults[0]));
		}
	};

	return (
		<Container>
			<Combobox
				sx={{
					width: '100%',
					paddingLeft: ['mobilePadding', 0],
					paddingRight: ['mobilePadding', 0],
				}}
				onSelect={handleSelect}
			>
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
						color: 'black',
					}}
					onKeyPress={handleSubmit}
					onChange={handleChange}
					selectOnClick={true}
					placeholder='Bijvoorbeeld "Frankrijk"'
				/>
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
							color: 'black',
						},
						li: {
							paddingBottom: 0,
							marginBottom: 0,
							paddingTop: 0,
						},
					}}
				>
					<ComboboxList sx={{}}>
						{searchResults.map((country) => (
							<ComboboxOption
								key={country.fullName}
								value={country.fullName}
								sx={{ p: { padding: 0 } }}
							>
								<p>{country.fullName}</p>
							</ComboboxOption>
						))}
					</ComboboxList>
				</ComboboxPopover>
			</Combobox>
		</Container>
	);
};

export default DestinationSearch;
