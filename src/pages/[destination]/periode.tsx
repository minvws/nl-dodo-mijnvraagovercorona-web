/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import { jsx, Container, Button } from 'theme-ui';
import Link from 'next/link';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import VisuallyHidden from '@reach/visually-hidden';
import '@reach/dialog/styles.css';

import MetaTags from 'components/meta/MetaTags';
import AdviceHeader from 'components/advice/AdviceHeader';
import { InternalLink } from 'components/Links';
import PeriodSelect from 'components/advice/PeriodSelect';
import DataProtectionPanel from 'components/DataProtectionPanel';
import BodyContainer from 'components/structure/BodyContainer';
import Footer from 'components/structure/Footer';
import { formatDate } from 'utilities/pathUtils';
import { useDestination } from 'hooks/use-destination';
import { useRouter } from 'next/router';
import { countries } from 'config/countries';
import { isBrowser } from 'utilities/is-browser';
import AdviceContext from 'components/advice/AdviceContext';

const calculateStage = ({
	fromDate,
	toDate,
}: {
	fromDate?: Date;
	toDate?: Date;
}): 'voor-vertrek' | 'tijdens-je-reis' | 'na-thuiskomst' => {
	if (!fromDate || !toDate) {
		return 'voor-vertrek';
	}

	const now = new Date().getTime();
	const from = fromDate.getTime();
	const to = toDate.getTime();

	if (now < from) {
		return 'voor-vertrek';
	}
	if (now < to) {
		return 'tijdens-je-reis';
	}
	return 'na-thuiskomst';
};

const generateResultLink = ({
	fromDate,
	toDate,
	destination,
	stage,
}: {
	fromDate: Date;
	toDate: Date;
	destination: string;
	stage: string;
}) => ({
	pathname: `/${destination}/${stage}`,
	query: { van: formatDate(fromDate), tot: formatDate(toDate) },
});

const Period = ({ destination }: { destination: string }) => {
	const country = useDestination(destination as string);
	const { setFrom, setTo, setStage } = React.useContext(AdviceContext);
	const router = useRouter();

	const [fromDate, setFromDate] = useState<Date>();
	const [toDate, setToDate] = useState<Date>();
	const [resultLink, setResultLink] = useState<Object | string>('');
	const [showDialog, setShowDialog] = useState(false);

	const openDialog = (event: any) => {
		event.preventDefault();
		setShowDialog(true);
	};
	const closeDialog = () => setShowDialog(false);

	useEffect(() => {
		if (fromDate && toDate) {
			const stage = calculateStage({ fromDate, toDate });

			setResultLink(
				generateResultLink({ fromDate, toDate, destination, stage }),
			);

			if (setFrom) setFrom(formatDate(fromDate));
			if (setTo) setTo(formatDate(toDate));
			if (setStage) setStage(stage);
		}
	}, [fromDate, toDate, destination]);

	const updateDate = (from: Date, to?: Date) => {
		setFromDate(from);
		setToDate(to);
	};

	if (!country) {
		if (isBrowser()) router.push('/bestemming');
		return null;
	}

	return (
		<>
			<MetaTags
				title="Planning | Quarantaine Reischeck | Reizentijdenscorona.nl"
				description="Actuele informatie over bestemming en maatregelen."
				url={`/${destination}/periode`}
			/>

			<AdviceHeader
				header="In welke periode ben of was je daar?"
				questionStage={2}
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
						<h2>Waarom vragen we je naar je reisperiode?</h2>
						<p>
							Het is mogelijk dat een land van kleur verandert tijdens je
							verblijf.
						</p>
						<p>
							Daarnaast bieden we je andere informatie als je op reis gaat, dan
							wanneer je net terug bent.
						</p>
					</DialogContent>
				</DialogOverlay>
			</AdviceHeader>

			<PeriodSelect country={country?.fullName} onUpdate={updateDate} />
			<BodyContainer>
				{fromDate && toDate && country && (
					<div
						sx={{
							textAlign: 'right',
							paddingLeft: 'mobilePadding',
							paddingRight: 'mobilePadding',
							paddingTop: ['auto', '51px'],
							paddingBottom: ['auto', '63px'],
						}}
					>
						<Link href={resultLink}>
							<Button
								sx={{
									width: ['100%', 'auto'],
									paddingLeft: ['auto', 'buttonPadding'],
									paddingRight: ['auto', 'buttonPadding'],
									paddingTop: ['16px', '15px'],
									paddingBottom: ['16px', '15px'],
									fontSize: ['buttonMobile', 'button'],
									fontFamily: 'body',
									fontWeight: 'bold',
									backgroundColor: 'button',
								}}
							>
								Toon het resultaat
							</Button>
						</Link>
					</div>
				)}
			</BodyContainer>
			<DataProtectionPanel onlyDesktop={true} />
			<Footer onlyDesktop={true} />
		</>
	);
};

export interface AdviceDestinationStaticProps {
	params: {
		destination: string;
	};
}

export const getStaticProps = async ({
	params,
}: AdviceDestinationStaticProps) => {
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

export default Period;
