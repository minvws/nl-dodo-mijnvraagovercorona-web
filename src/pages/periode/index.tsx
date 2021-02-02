/** @jsx jsx */
import React, { useEffect, useRef, useState } from 'react';
import { jsx } from 'theme-ui';
import { isAfter, addDays } from 'date-fns';

import MetaTags from 'components/meta/MetaTags';
import { InternalLink } from 'components/Links';
import PeriodSelect from 'components/advice/PeriodSelect';
import { formatDate } from 'utilities/pathUtils';
import { useDestination } from 'hooks/use-destination';
import { useRouter } from 'next/router';
import { isBrowser } from 'utilities/is-browser';
import AdviceContext from 'components/advice/AdviceContext';
import { Dialog } from 'components/dialog';
import { ButtonPrimary } from 'components/button';
import { Hero, Page } from 'components/structure/Page';
import ProgressMarker from 'components/advice/ProgressMarker';
import { alignLogoRightOnMobileStyles } from 'components/structure/RoHeaderLogo';
import BodyContainer from 'components/structure/BodyContainer';
import { getAdvicePath } from 'components/advice/utils';

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

const Period = () => {
	const { destination, setFrom, setTo, setStage } = React.useContext(
		AdviceContext,
	);
	const country = useDestination(destination as string);
	const router = useRouter();
	const submitRef = useRef<HTMLDivElement>(null);

	const [fromDate, setFromDate] = useState<Date>();
	const [toDate, setToDate] = useState<Date>();
	const [resultLink, setResultLink] = useState<Object | string>('');
	const [showDialog, setShowDialog] = useState(false);

	const openDialog = (event: any) => {
		event.preventDefault();
		setShowDialog(true);
	};

	/**
	 * Store selected dates in context, and generate the next step url:
	 * This is either no advice page, or the means of transport step.
	 */
	useEffect(() => {
		if (!fromDate || !toDate) return;

		const isAfterQuarantaine = isAfter(new Date(), addDays(toDate, 11));
		const stage = calculateStage({ fromDate, toDate });

		/* Check whether the quarantaine period has ended when more then 10 days have passed */
		if (isAfterQuarantaine && destination) {
			setResultLink(getAdvicePath.noResult({ destination }));
		} else {
			setResultLink(getAdvicePath.meansOfTransport());
		}

		if (setFrom) setFrom(formatDate(fromDate));
		if (setTo) setTo(formatDate(toDate));
		if (setStage) setStage(stage);
	}, [fromDate, toDate, destination]);

	/**
	 * On smaller screen devices scroll submit button into view after
	 * start and end date are selected.
	 */
	useEffect(() => {
		if (
			fromDate &&
			toDate &&
			submitRef.current &&
			window.innerWidth < 800 &&
			typeof submitRef.current.scrollIntoView === 'function'
		) {
			submitRef.current.scrollIntoView();
		}
	}, [fromDate, toDate]);

	const updateDate = ({ from, to }: { from?: Date; to?: Date }) => {
		setFromDate(from);
		setToDate(to);
	};

	if (!country) {
		if (isBrowser()) router.push(getAdvicePath.destination());
		return null;
	}

	return (
		<>
			<MetaTags
				title="Planning | Quarantaine Reischeck | Rijksoverheid.nl"
				description="Actuele informatie over bestemming en maatregelen."
				url="/periode"
			/>

			<Page
				title="In welke periode ben of was je daar?"
				cleanPageOnMobile
				sx={alignLogoRightOnMobileStyles}
			>
				<Hero>
					<ProgressMarker stage={2} totalStages={3} />
					<InternalLink href="" onClick={openDialog}>
						Waarom vragen we dit?
					</InternalLink>
					<Dialog
						title="Waarom vragen we je naar je reisperiode?"
						isVisible={showDialog}
						closeDialog={() => setShowDialog(false)}
					>
						<p>
							Het is mogelijk dat een land van kleurcode verandert tijdens je
							verblijf.
						</p>
						<p>
							Daarnaast bieden we je andere informatie als je op reis gaat, dan
							wanneer je net terug bent.
						</p>
					</Dialog>
				</Hero>
				<PeriodSelect country={country?.fullName} updatePage={updateDate} />
				<BodyContainer>
					{fromDate && toDate && country && (
						<div
							sx={{
								textAlign: 'right',
								paddingLeft: 'mobilePadding',
								paddingRight: 'mobilePadding',
							}}
							ref={submitRef}
						>
							<ButtonPrimary href={resultLink}>Naar vraag 3</ButtonPrimary>
						</div>
					)}
				</BodyContainer>
			</Page>
		</>
	);
};

export default Period;
