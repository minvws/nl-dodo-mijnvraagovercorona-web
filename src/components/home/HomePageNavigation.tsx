/** @jsx jsx */
import React from 'react';
import { Container, jsx } from 'theme-ui';
import { AnchorLink } from 'components/Links';

const HomePageNavigation = () => {
	return (
		<Container
			sx={{
				paddingLeft: ['mobilePadding', 0],
				paddingBottom: '10px',
				marginBottom: 0,
				marginTop: '37px',
				paddingRight: ['auto', 'sidePanel'],
			}}
			as="nav"
		>
			<div
				sx={{
					display: 'grid',
					gridTemplateColumns: ['1fr', '1fr 1fr 1fr'], // todo: replace this with repeat()
					paddingLeft: [0, 'mobilePadding', 0],
					paddingBottom: '23px',
					columnGap: '29px',
					rowGap: '22px',
					maxWidth: ['maxWidthBody', '898px'],
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
