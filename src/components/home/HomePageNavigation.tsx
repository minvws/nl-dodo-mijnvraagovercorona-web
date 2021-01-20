/** @jsx jsx */
import React from 'react';
import { Container, jsx } from 'theme-ui';
import { AnchorLink } from 'components/Links';

const HomePageNavigation = () => {
	return (
		<Container as="nav">
			<div
				sx={{
					display: 'grid',
					gridTemplateColumns: ['1fr', '1fr 1fr 1fr'], // todo: replace this with repeat()
					paddingX: ['17px'],
					paddingBottom: '23px',
					columnGap: '29px',
					rowGap: '22px',
					maxWidth: ['maxWidthBody', '665px'],
					margin: '0 auto',
					borderBottom: ['none', '1px solid #AEC1D1'],
				}}
			>
				<AnchorLink href="#snel">Binnen 2 minuten resultaat</AnchorLink>
				<AnchorLink href="#actueel">
					Actuele infomatie over je bestemming en thuiskomst
				</AnchorLink>
				<AnchorLink href="#thuis-quarantaine">
					We helpen je met je thuisquarantaine
				</AnchorLink>
				<span sx={{ display: ['block', 'none'] }}>
					<AnchorLink href="#privacy">
						Je privacy is altijd beschermd
					</AnchorLink>
				</span>
			</div>
		</Container>
	);
};

export default HomePageNavigation;
