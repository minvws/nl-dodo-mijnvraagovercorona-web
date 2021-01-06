/** @jsx jsx */
import React from 'react';
import { Link, Container, jsx } from 'theme-ui';
import PrivacyList from 'components/PrivacyList';

const TestBooking = () => {
	return (
		<>
			<a
				href="https://coronatest.nl/ik-wil-me-laten-testen/een-online-afspraak-maken"
				target="_blank"
				rel="noopener noreferrer"
				sx={{ textDecoration: 'none' }}
			>
				<Container
					sx={{
						marginTop: '2em',
						backgroundImage: `url("/icons/Button Arrow.svg")`,
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'right 1em top 50%',
					}}
				>
					<div
						sx={{
							border: '1px solid #0E6999',
							borderColor: 'header',
							borderRadius: '11px',
							paddingLeft: '4.5em',
							paddingTop: '0.7em',
							paddingBottom: '0.7em',
							backgroundImage: 'url("/icons/Test.svg")',
							backgroundRepeat: 'no-repeat',
							backgroundPositionY: 'center',
							backgroundPositionX: '1em',
							cursor: 'pointer',
						}}
					>
						<p
							sx={{
								marginLeft: '14px',
								fontSize: ['bodyMobile', 'body'],
								fontWeight: 'bold',
								width: '70%',
								color: 'header',
							}}
						>
							Heb je klachten? Maak direct een afspraak op de website van de GGD
						</p>
					</div>
				</Container>
			</a>
			<p
				sx={{
					fontSize: ['bodyMobile', 'body'],
				}}
			>
				Of bel <strong>0800-1202</strong>. Houd je burgerservicenummer (BSN) bij
				de hand.
			</p>
			<p
				sx={{
					fontSize: 'smallText',
					color: '#6E6E6E',
					'::before': {
						content: '""',
						backgroundImage: 'url("/icons/Privacy Protection.svg")',
						backgroundSize: '30px 30px',
						marginTop: '-5px',
						marginRight: '10px',
						float: 'left',
						height: '30px',
						width: '30px',
					},
				}}
			>
				We delen geen gegevens met de GGD
			</p>
		</>
	);
};

export default TestBooking;
