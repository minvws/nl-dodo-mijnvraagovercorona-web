/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from 'theme-ui';

import MetaTags from 'components/meta/MetaTags';
import { InternalLink } from 'components/Links';
import '@reach/dialog/styles.css';
import DestinationSearch from 'components/advice/DestinationSearch';
import { Dialog } from 'components/dialog';
import { Content, Hero, Page } from 'components/structure/Page';
import ProgressMarker from 'components/advice/ProgressMarker';
import { alignLogoRightOnMobileStyles } from 'components/structure/RoHeaderLogo';
import AdviceContext from 'components/advice/AdviceContext';
import { getCountrySlug } from 'utilities/pathUtils';
import { useRouter } from 'next/router';
import { getAdvicePath } from 'components/advice/utils';

const Destination = () => {
	const [showDialog, setShowDialog] = useState(false);
	const { setDestination } = React.useContext(AdviceContext);
	const router = useRouter();
	const openDialog = (event: any) => {
		event.preventDefault();
		setShowDialog(true);
	};

	const handleDestinationChose = (destinationName: string) => {
		const destination = getCountrySlug(destinationName);

		// @TODO: Handle invalid destination names which return in null being returned
		// from the slug.
		if (!destination) return;

		setDestination(destination);
		router.push(getAdvicePath.period({ destination }));
	};

	return (
		<>
			<MetaTags
				title="Bestemming | Quarantaine Reischeck | Rijksoverheid.nl"
				description="Actuele informatie over bestemming en maatregelen."
				url="/bestemming"
			/>
			<Page
				title="Welk land is of was je bestemming?"
				cleanPageOnMobile
				sx={alignLogoRightOnMobileStyles}
			>
				<Hero>
					<ProgressMarker stage={1} totalStages={3} />
					<InternalLink href="" onClick={openDialog}>
						Waarom vragen we dit?
					</InternalLink>
					<Dialog
						title="Waarom vragen we je naar je bestemming?"
						isVisible={showDialog}
						closeDialog={() => setShowDialog(false)}
					>
						<p>
							Door deze informatie kunnen we je specifiek advies geven,
							afgestemd op jouw bestemming. Op dit moment bieden wij enkel
							landelijk advies. Binnenkort adviseren we ook op stedelijk en
							regionaal niveau op deze website.
						</p>
					</Dialog>
				</Hero>
				<Content>
					<DestinationSearch onDestinationChosen={handleDestinationChose} />
				</Content>
			</Page>
		</>
	);
};

export default Destination;
