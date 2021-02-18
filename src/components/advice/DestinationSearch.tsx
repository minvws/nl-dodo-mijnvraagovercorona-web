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

import { Languages } from 'config/languages';

import { CountryMatches, searchCities } from 'services/CountryService';

import { ButtonStyledAsSubmit } from 'components/button';

import { useTranslation } from 'hooks/translation';

import '@reach/combobox/styles.css';

interface DestinationSearchProps {
	onDestinationChosen: (destination: string) => void;
	locale: Languages;
}

export const DestinationSearch = ({
	onDestinationChosen,
	locale,
}: DestinationSearchProps) => {
	const [searchResults, setSearchResults] = useState<CountryMatches[]>([]);
	const [userInput, setUserInput] = useState<string>('');
	const { t_s } = useTranslation();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setUserInput(value);

		if (value === '') {
			setSearchResults([]);
		} else {
			setSearchResults(searchCities(value, locale));
		}
	};

	const handleSelect = (destinationName: string) => {
		onDestinationChosen(destinationName);
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		const match = searchResults.find(
			(results) => t_s(results.slug) === userInput,
		);

		// If there is a match on the full name, use this value.
		if (match) {
			handleSelect(match.slug);
			return;
		}

		// If there is no full match but there are suggestions available,
		// pick the first one.
		if (searchResults.length > 0) {
			handleSelect(searchResults[0].slug);
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
										key={country.slug}
										value={t_s(country.slug)}
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
													t_s(country.slug).replace(
														new RegExp(userInput, 'gi'),
														'<strong>$&</strong>',
													) +
													/* If country is matched on a synonym, show the matching synonym */
													(country.matchedOn !== t_s(country.slug)
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
