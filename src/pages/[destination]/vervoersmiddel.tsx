/** @jsx jsx */
import AdviceContext, {
	MeansOfTransport,
} from 'components/advice/AdviceContext';
import ProgressMarker from 'components/advice/ProgressMarker';
import { getAdvicePath } from 'components/advice/utils';
import { ButtonStyledAsSubmit } from 'components/button/ButtonStyled';
import { Dialog } from 'components/dialog';
import { InternalLink } from 'components/Links';
import MetaTags from 'components/meta/MetaTags';
import { RadioButton } from 'components/radio-button';
import BodyContainer from 'components/structure/BodyContainer';
import { Hero, Page } from 'components/structure/Page';
import { alignLogoRightOnMobileStyles } from 'components/structure/RoHeaderLogo';
import { countries } from 'config/countries';
import { useDestination } from 'hooks/use-destination';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { Box, Flex, jsx } from 'theme-ui';
import { isBrowser } from 'utilities/is-browser';

const MeansOfTransportPage = ({ destination }: { destination: string }) => {
	const country = useDestination(destination as string);
	const formRef = useRef<HTMLFormElement>(null);
	const {
		setMeansOfTransport,
		meansOfTransport,
		from,
		to,
		stage,
	} = React.useContext(AdviceContext);
	const router = useRouter();
	const [showDialog, setShowDialog] = useState(false);

	const openDialog = (event: any) => {
		event.preventDefault();
		setShowDialog(true);
	};

	/**
	 * Navigate to next step.
	 */
	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		if (!meansOfTransport) return;

		router.push(
			getAdvicePath.result({
				destination,
				meansOfTransport,
				// As string casting since we now for sure that
				// we have from and to date here, otherwise a redirect would have occured.
				stage: stage as string,
				fromDate: from as string,
				toDate: to as string,
			}),
		);
	};

	/**
	 * Store means of transport in context.
	 */
	const handleMeansOfTransportSelect = (
		selectedTransport: MeansOfTransport,
	) => {
		setMeansOfTransport(selectedTransport);
	};

	if (!country) {
		if (isBrowser()) router.push(getAdvicePath.destination());
		return null;
	}

	if (country && (!from || !to)) {
		if (isBrowser()) router.push(getAdvicePath.period({ destination }));
		return null;
	}

	return (
		<>
			<MetaTags
				title="Planning | Quarantaine Reischeck | Rijksoverheid.nl"
				description="Actuele informatie over bestemming en maatregelen."
				url={`/${destination}/vervoersmiddel`}
			/>

			<Page
				title="Hoe reis je terug naar Nederland?"
				cleanPageOnMobile
				sx={alignLogoRightOnMobileStyles}
			>
				<Hero>
					<ProgressMarker stage={3} totalStages={3} />
					<InternalLink href="" onClick={openDialog}>
						Waarom vragen we dit?
					</InternalLink>
					<Dialog
						title="Waarom vragen we hoe je terug reist naar Nederland?"
						isVisible={showDialog}
						closeDialog={() => setShowDialog(false)}
					>
						<p>
							De regels zijn afhankelijk van hoe je reist. Als je aangeeft hoe
							je terugreist, kunnen wij je voorzien van actuele informatie.
						</p>
					</Dialog>
				</Hero>

				<BodyContainer>
					<form method="POST" action="" onSubmit={handleSubmit} ref={formRef}>
						<RadioButton<MeansOfTransport>
							name="meansOfTransport"
							label="Met het vliegtuig"
							value="vliegtuig"
							onChange={handleMeansOfTransportSelect}
						/>
						<RadioButton<MeansOfTransport>
							name="meansOfTransport"
							label="Met de auto"
							value="auto"
							onChange={handleMeansOfTransportSelect}
						/>
						<RadioButton<MeansOfTransport>
							name="meansOfTransport"
							label="Met de trein"
							value="trein"
							onChange={handleMeansOfTransportSelect}
						/>
						<RadioButton<MeansOfTransport>
							name="meansOfTransport"
							label="Met de bus"
							value="bus"
							onChange={handleMeansOfTransportSelect}
						/>
						<RadioButton<MeansOfTransport>
							name="meansOfTransport"
							label="Met de ferry (boot)"
							value="ferry"
							onChange={handleMeansOfTransportSelect}
						/>
						<RadioButton<MeansOfTransport>
							name="meansOfTransport"
							label="Ik reis op een andere manier terug naar Nederland"
							value="anders"
							onChange={handleMeansOfTransportSelect}
						/>
						{meansOfTransport && (
							<Flex sx={{ justifyContent: 'flex-end', paddingTop: 30 }}>
								<Box>
									<ButtonStyledAsSubmit>
										Naar het resultaat
									</ButtonStyledAsSubmit>
								</Box>
							</Flex>
						)}
					</form>
				</BodyContainer>
			</Page>
		</>
	);
};

export interface AdviceMeansOfTransportStaticProps {
	params: {
		destination: string;
	};
}

export const getStaticProps = async ({
	params,
}: AdviceMeansOfTransportStaticProps) => {
	return {
		props: {
			destination: params.destination,
		},
	};
};

export const getStaticPaths = () => ({
	paths: countries.map((country) => ({
		params: { destination: country.slug },
	})),
	fallback: false,
});

export default MeansOfTransportPage;
