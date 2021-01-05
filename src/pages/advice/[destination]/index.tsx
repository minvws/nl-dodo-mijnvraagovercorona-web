/** @jsx jsx */
import React, { useState } from 'react';
import { jsx, Container, Button } from 'theme-ui';
import Link from 'next/link';

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

const Period = (props: any) => {
	const country = useDestination(props.destination as string);
	const router = useRouter();

	const [fromDate, setFromDate] = useState<Date>();
	const [toDate, setToDate] = useState<Date>();

	const updateDate = (from: Date, to?: Date) => {
		setFromDate(from);
		setToDate(to);
	};

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

	/**
	 * TODO:
	 * * Change result to include before, during and after
	 * * change period to query params
	 */
	const resultLink = () =>
		`${props.destination}/${calculateStage({
			fromDate,
			toDate,
		})}?from=${formatDate(fromDate)}&to=${formatDate(toDate)}`;

	if (!country) {
		if (isBrowser()) router.push('/advice');
		return null;
	}

	return (
		<>
			<AdviceHeader
				header="In welke periode ben of was je daar?"
				questionStage={2}
				totalStages={2}
			>
				<InternalLink href="">Waarom vragen we dit?</InternalLink>
			</AdviceHeader>

			<PeriodSelect country={country?.fullName} onUpdate={updateDate} />
			<BodyContainer>
				{fromDate && toDate && country && (
					<div
						sx={{
							textAlign: 'right',
							paddingRight: 'mobilePadding',
							paddingTop: ['auto', '51px'],
							paddingBottom: ['auto', '63px'],
						}}
					>
						<Link href={resultLink()}>
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
	fallback: true,
});

export default Period;
