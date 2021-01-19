/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from 'theme-ui';

import MetaTags from 'components/meta/MetaTags';
import AdviceHeader from 'components/advice/AdviceHeader';
import { InternalLink } from 'components/Links';
import VisuallyHidden from '@reach/visually-hidden';
import '@reach/dialog/styles.css';
import BodyContainer from 'components/structure/BodyContainer';
import DestinationSearch from 'components/advice/DestinationSearch';
import DataProtectionPanel from 'components/DataProtectionPanel';
import Footer from 'components/structure/Footer';
import { Dialog } from 'components/dialog';

const Destination = () => {
	const [showDialog, setShowDialog] = useState(false);
	const openDialog = (event: any) => {
		event.preventDefault();
		setShowDialog(true);
	};

	return (
		<>
			<MetaTags
				title="Bestemming | Quarantaine Reischeck | Reizentijdenscorona.nl"
				description="Actuele informatie over bestemming en maatregelen."
				url="/bestemming"
			/>
			<AdviceHeader
				header="Welk land is of was je bestemming?"
				questionStage={1}
				totalStages={2}
			>
				<InternalLink href="" onClick={openDialog}>
					Waarom vragen we dit?
				</InternalLink>
				<Dialog
					title="Waarom vragen we je naar je bestemming?"
					isVisible={showDialog}
					closeDialog={() => setShowDialog(false)}
				>
					<p>
						Door deze informatie kunnen we je specifiek advies geven, afgestemd
						op jouw bestemming. Op dit moment bieden wij enkel landelijk advies.
						Binnenkort adviseren we ook op stedelijk en regionaal niveau op deze
						website.
					</p>
				</Dialog>
			</AdviceHeader>
			<BodyContainer>
				<div
					sx={{
						paddingTop: ['71px', '73px'],
						marginBottom: '80px',
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
