/** @jsx jsx */
import React, { useEffect, useRef, useState } from 'react';
import { jsx } from 'theme-ui';

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
import { Dialog } from 'components/dialog';
import { ButtonPrimary } from 'components/button';

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
	const submitButtonRef = useRef<HTMLButtonElement>(null);

	const [fromDate, setFromDate] = useState<Date>();
	const [toDate, setToDate] = useState<Date>();
	const [resultLink, setResultLink] = useState<Object | string>('');
	const [showDialog, setShowDialog] = useState(false);

	const openDialog = (event: any) => {
		event.preventDefault();
		setShowDialog(true);
	};

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

	/**
	 * On smaller screen devices scroll submit button into view after
	 * start and end date are selected.
	 */
	useEffect(() => {
		if (
			fromDate &&
			toDate &&
			submitButtonRef.current &&
			window.innerWidth < 800 &&
			typeof submitButtonRef.current.scrollIntoView === 'function'
		) {
			submitButtonRef.current.scrollIntoView();
		}
	}, [fromDate, toDate]);

	const updateDate = ({ from, to }: { from?: Date; to?: Date }) => {
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
				<Dialog
					title="Waarom vragen we je naar je reisperiode?"
					isVisible={showDialog}
					closeDialog={() => setShowDialog(false)}
				>
					<p>
						Het is mogelijk dat een land van kleur verandert tijdens je
						verblijf.
					</p>
					<p>
						Daarnaast bieden we je andere informatie als je op reis gaat, dan
						wanneer je net terug bent.
					</p>
				</Dialog>
			</AdviceHeader>

			<PeriodSelect country={country?.fullName} updatePage={updateDate} />
			<BodyContainer>
				{fromDate && toDate && country && (
					<div
						sx={{
							textAlign: 'right',
							paddingLeft: 'mobilePadding',
							paddingRight: 'mobilePadding',
							paddingTop: ['auto', '18px'],
							paddingBottom: ['auto', '63px'],
						}}
					>
						<ButtonPrimary href={resultLink}>Toon het resultaat</ButtonPrimary>
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
