/** @jsx jsx */
import { Flex, jsx, Text } from 'theme-ui';

export const GGDSpecialInstructions = () => (
	<Flex sx={{ padding: 'box', alignItems: 'flex-start' }}>
		<img src="/icons/info.svg" sx={{ mr: '12px' }} />
		<Text variant="chapeau" as="p" sx={{ fontWeight: 'normal', margin: 0 }}>
			Let op: heb je speciale instructies van de GGD ontvangen? Dan gaan die
			altijd voor op het overzicht wat we je hier geven.
		</Text>
	</Flex>
);
