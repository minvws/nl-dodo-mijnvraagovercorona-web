/** @jsx jsx */
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { jsx } from 'theme-ui';
import { isAfter, addDays } from 'date-fns';

import sanity, { getPageQuery, getLocaleProperty } from 'utilities/sanity';
import { formatDate } from 'utilities/pathUtils';
import { isBrowser } from 'utilities/is-browser';

import { MetaTags } from 'components/meta';
import { InternalLink } from 'components/links';
import { PeriodSelect } from 'components/advice/PeriodSelect';
import { Dialog } from 'components/dialog';
import { ButtonPrimary } from 'components/button';
import { ProgressMarker } from 'components/advice/ProgressMarker';
import {
	BodyContainer,
	alignLogoRightOnMobileStyles,
	Hero,
	Page,
} from 'components/structure';
import { getAdvicePath } from 'components/advice/utils';
import AdviceContext from 'components/advice/AdviceContext';

import {
	useCurrentLanguage,
	useSanityPageContent,
	useTranslation,
} from 'hooks/translation';
import { useDestination } from 'hooks/use-destination';

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

interface PageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
		modal: {
			link: string;
			text: string;
			title: string;
		};
	};
	datumTussentekst: string;
	maanden: string[];
	dagen: string[];
	url: string;
	button: string;
}

interface PeriodeProps {
	locale: 'nl' | 'en';
}

const Periode = ({ locale }: PeriodeProps) => {
	const page = useSanityPageContent<PageContent>();
	const language = useCurrentLanguage();
	const { t_s } = useTranslation();
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
			setResultLink(
				getAdvicePath.noResult({ destination, locale: language.id }),
			);
		} else {
			setResultLink(getAdvicePath.meansOfTransport(language.id));
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
		if (isBrowser()) router.push(getAdvicePath.destination(language.id));
		return null;
	}

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.description}
				url={page.url}
			/>

			<Page
				title={page.header.title}
				cleanPageOnMobile
				sx={alignLogoRightOnMobileStyles}
			>
				<Hero>
					<ProgressMarker stage={2} totalStages={3} />
					<InternalLink href="" onClick={openDialog}>
						{page.header.modal.link}
					</InternalLink>
					<Dialog
						title={page.header.modal.title}
						isVisible={showDialog}
						closeDialog={() => setShowDialog(false)}
					>
						<p>{page.header.modal.text}</p>
					</Dialog>
				</Hero>
				<PeriodSelect country={t_s(country!.slug)} updatePage={updateDate} />
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
							<ButtonPrimary href={resultLink}>{page.button}</ButtonPrimary>
						</div>
					)}
				</BodyContainer>
			</Page>
		</>
	);
};

export const getStaticProps = async ({
	params: { locale },
}: {
	params: { locale: 'nl' | 'en' };
}) => {
	const pageProjection = `{
		"metaData": {
			${getLocaleProperty({ name: 'title', path: 'metaData.title', locale })},
			${getLocaleProperty({
				name: 'description',
				path: 'metaData.description',
				locale,
			})},
		},
		"header": {
			${getLocaleProperty({ name: 'title', path: 'header.title', locale })},
			"modal": {
				${getLocaleProperty({ name: 'link', path: 'header.modal.link', locale })},
				${getLocaleProperty({ name: 'text', path: 'header.modal.text', locale })},
				${getLocaleProperty({ name: 'title', path: 'header.modal.title', locale })},
			}
		},
		${getLocaleProperty({ name: 'button', locale })},
		${getLocaleProperty({ name: 'datumTussentekst', locale })},
		${getLocaleProperty({ name: 'placeholder', locale })},
		${getLocaleProperty({ name: 'maanden', locale, array: true })},
		${getLocaleProperty({ name: 'dagen', locale, array: true })},
		url
	}`;
	const { page, siteSettings } = await sanity.fetch(
		getPageQuery({
			type: 'periode-page',
			pageProjection,
			locale,
		}),
	);

	return {
		props: {
			page,
			siteSettings,
			locale,
		},
	};
};

export const getStaticPaths = () => ({
	paths: ['nl', 'en'].map((locale) => ({
		params: { locale },
	})),
	fallback: false,
});

export default Periode;
