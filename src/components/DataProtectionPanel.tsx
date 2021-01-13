/** @jsx jsx */
import React from 'react';
import { jsx, Container, Box } from 'theme-ui';
import { InternalLink } from 'components/Links';
import PrivacyList from 'components/PrivacyList';

type DataProtectionPanelProps = {
	onlyDesktop?: boolean;
};

const DataProtectionPanel = ({
	onlyDesktop = false,
}: DataProtectionPanelProps) => {
	const mobileDisplay = onlyDesktop ? 'none' : 'inherit';
	return (
		<Box
			id="privacy"
			sx={{
				display: [mobileDisplay, 'inherit'],
				backgroundColor: ['white', 'sidePanel'],
				position: ['relative', 'fixed'],
				height: ['auto', '100%'],
				top: [0],
				right: [0],
				maxWidth: ['100%', '400px'],
				padding: ['mobilePadding', '30px'],
				backgroundImage: ['none', 'url("/images/Koffer_DesktopRetina.svg")'],
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'right -60px bottom 20px',
				backgroundSize: ['auto', '339px', '439px'],
				alignItems: 'flex-start',
			}}
		>
			<Box
				sx={{
					background:
						'linear-gradient(360deg, #EFF7F9 0%, rgba(255, 255, 255, 0) 100%), #FFFFFF',
					boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
					borderRadius: '11px',
					paddingLeft: ['20px'],
					paddingTop: ['29px'],
					paddingRight: ['16px'],
				}}
			>
				<h3
					sx={{
						fontSize: ['h2Mobile', 'h2'],
						color: 'secondaryHeader',
						paddingLeft: '4px',
						paddingBottom: '8px',
						margin: 0,
					}}
				>
					Zo gaan we om met jouw gegevens:
				</h3>
				<PrivacyList>
					<li>Niemand weet wie je bent. Het invullen is volledig anoniem.</li>
					<li>We slaan geen reisgegevens op.</li>
					<li>
						We houden alleen bij welke onderdelen bezocht worden, zodat we deze
						website kunnen verbeteren.
					</li>
				</PrivacyList>
			</Box>
		</Box>
	);
};

export default DataProtectionPanel;
