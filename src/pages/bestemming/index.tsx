/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from 'theme-ui';

import MetaTags from 'components/meta/MetaTags';
import AdviceHeader from 'components/advice/AdviceHeader';
import { InternalLink } from 'components/Links';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import VisuallyHidden from '@reach/visually-hidden';
import '@reach/dialog/styles.css';
import BodyContainer from 'components/structure/BodyContainer';
import DestinationSearch from 'components/advice/DestinationSearch';
import DataProtectionPanel from 'components/DataProtectionPanel';
import Footer from 'components/structure/Footer';

const Destination = () => {
	const [showDialog, setShowDialog] = useState(false);
	const openDialog = (event: any) => {
		event.preventDefault();
		setShowDialog(true);
	};
	const closeDialog = () => setShowDialog(false);

	return (
		<>
			<MetaTags
				title="Bestemming | Quarantaine Reischeck | Reizentijdenscorona.nl"
				description="Actuele informatie over bestemming en maatregelen."
				url="/faq"
			/>
			<AdviceHeader
				header="Welk land is of was je bestemming?"
				questionStage={1}
				totalStages={2}
			>
				<InternalLink href="" onClick={openDialog}>
					Waarom vragen we dit?
				</InternalLink>
				<DialogOverlay
					aria-label="Waarom we vragen je naar je bestemming?"
					isOpen={showDialog}
					onDismiss={closeDialog}
					sx={{
						background: 'rgba(1, 104, 155, 0.7)',
						paddingRight: [0, '300px', '400px'],
						paddingTop: [0, '67px'],
						p: {
							fontSize: ['bodyMobile', 'body'],
							lineHeight: ['bodyMobile', 'body'],
						},
					}}
				>
					<DialogContent
						sx={{
							width: '100%',
							maxWidth: '434px',
							height: ['100%', 'auto'],
							borderRadius: [0, '20px'],
							color: 'header',
							marginTop: ['auto', '168px'],
						}}
					>
						<button
							className="close-button"
							onClick={closeDialog}
							sx={{
								background: 'url("/icons/Close.svg")',
								backgroundRepeat: 'no-repeat',
								backgroundSize: '18px 18px',
								backgroundPosition: 'right top',
								border: 'none',
								float: 'right',
								height: '18px',
								width: '18px',
								marginTop: '-12px',
								marginRight: '-15px',
							}}
						>
							<VisuallyHidden>Close</VisuallyHidden>
						</button>
						<h2>Waarom vragen we je naar je bestemming?</h2>
						<p>
							Vaak wordt per regio bepaald hoe veilig het er is. Zo kunnen de
							steden code oranje hebben en landelijke regio's code geel.
						</p>
					</DialogContent>
				</DialogOverlay>
			</AdviceHeader>
			<BodyContainer>
				<div
					sx={{
						paddingTop: ['71px', '73px'],
						marginBottom: ['auto', '405px'],
						minHeight: '30vh', // need a better solution here
					}}
				>
					<DestinationSearch />
				</div>
			</BodyContainer>
			<DataProtectionPanel onlyDesktop={true} />
			<Footer onlyDesktop={true} />
		</>
	);
};

export default Destination;
