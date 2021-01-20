/** @jsx jsx */
import React, { FormEvent, useState } from 'react';
import { Container, Flex, jsx } from 'theme-ui';
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from '@reach/combobox';
import { useRouter } from 'next/router';

import { CountryMatches, searchCities } from 'services/CountryService';
import { getCountrySlug } from 'utilities/pathUtils';
import '@reach/combobox/styles.css';
import AdviceContext from 'components/advice/AdviceContext';
import { ButtonStyledAsSubmit } from 'components/button/ButtonStyled';

const DestinationSearch = () => {
	const [searchResults, setSearchResults] = useState<CountryMatches[]>([]);
	const [userInput, setUserInput] = useState<string>('');
	const { setDestination } = React.useContext(AdviceContext);

	const router = useRouter();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setUserInput(value);

		if (value === '') {
			setSearchResults([]);
		} else {
			setSearchResults(searchCities(value));
		}
	};

	const getDestinationName = (dest: CountryMatches) => dest.fullName;

	const handleSelect = (destinationName: string) => {
		// @TODO: Handle invalid destination names which return in null being returned
		// from the slug.
		const location = `/${getCountrySlug(destinationName)}/periode`;

		if (setDestination) setDestination(getCountrySlug(destinationName));
		router.push(location);
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		const match = searchResults.find(
			(results) => results.fullName === userInput,
		);

		// If there is a match on the full name, use this value.
		if (match) {
			handleSelect(getDestinationName(match));
			return;
		}

		// If there is no full match but there are suggestions available,
		// pick the first one.
		if (searchResults.length > 0) {
			handleSelect(getDestinationName(searchResults[0]));
		}
	};

	return (
		<Container>
			<form onSubmit={handleSubmit} method="POST">
				<Combobox
					sx={{
						width: '100%',
						paddingLeft: ['mobilePadding', 0],
						paddingRight: ['mobilePadding', 0],
					}}
					onSelect={(country) => setUserInput(country)}
				>
					<ComboboxInput
						sx={{
							border: '1px solid',
							borderColor: 'inputBorder',
							borderRadius: '5px',
							width: '100%',
							height: '55px',
							paddingLeft: '56px',
							fontSize: ['bodyMobile', 'body'],
							lineHeight: ['bodyMobile', 'body'],
							fontFamily: 'body',

							backgroundImage: 'url("/icons/Search.svg")',
							backgroundRepeat: 'no-repeat',
							backgroundPositionY: '15px',
							backgroundPositionX: '17px',
							color: 'black',

							'&::placeholder': {
								color: 'detailText',
							},
						}}
						onChange={handleChange}
						selectOnClick={true}
						placeholder='Bijvoorbeeld "Frankrijk"'
					/>
					<ComboboxPopover
						sx={{
							maxHeight: 'auto',
							border: 'none',
							overflow: 'hidden',
							borderBottomLeftRadius: '5px',
							borderBottomRightRadius: '5px',
							padding: '0',
							fontSize: '20px',
							backgroundColor: ['white', '#EFF7F9'],
						}}
					>
						<ComboboxList sx={{}}>
							{searchResults.length ? (
								searchResults.map((country) => (
									<ComboboxOption
										key={country.fullName}
										value={country.fullName}
										sx={{
											padding: 0,

											':hover': {
												backgroundColor: '#EFF7F9',
												color: '#01689B',
											},

											'&[aria-selected="true"], &[aria-selected="true"]:hover': {
												backgroundColor: '#154273',
												color: 'white',
											},

											p: { padding: 0 },
										}}
									>
										<div
											sx={{
												padding: '16px',

												span: { fontSize: 16, fontWeight: 'bold' },
											}}
											dangerouslySetInnerHTML={{
												__html:
													country.fullName.replace(
														new RegExp(userInput, 'gi'),
														'<strong>$&</strong>',
													) +
													/* If country is matched on a synonym, show the matching synonym */
													(country.matchedOn !== country.fullName
														? ` <span>(${country.matchedOn})</span>`
														: ''),
											}}
										/>
									</ComboboxOption>
								))
							) : (
								<p
									sx={{
										padding: '16px',
										margin: '0',
									}}
								>
									Er zijn geen landen gevonden die voldoen aan de zoekterm "
									{userInput}".
								</p>
							)}
						</ComboboxList>
					</ComboboxPopover>
					{userInput && (
						<Flex
							sx={{
								button: {
									marginTop: ['12px', '28px'],
									marginLeft: 'auto',
								},
							}}
						>
							<ButtonStyledAsSubmit>Naar vraag 2</ButtonStyledAsSubmit>
						</Flex>
					)}
				</Combobox>
			</form>
		</Container>
	);
};

export default DestinationSearch;
