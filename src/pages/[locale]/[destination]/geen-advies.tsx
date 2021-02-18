/** @jsx jsx */
import { jsx } from 'theme-ui';

import { cartesianProduct } from 'utilities/pathUtils';
import { countries } from 'config/countries';
import { useDestination } from 'hooks/use-destination';
import MetaTags from 'components/meta/MetaTags';
import { CallGGD, MakeOnlineAppointment } from 'components/results/TestBooking';
import Feedback from 'components/feedback/Feedback';
import { Content, Hero, Page } from 'components/structure/Page';
import { getTravelSchemeContentBlocks } from 'utilities/travel-advice';
import { getAdvicePath } from 'components/advice/utils';
import { contentEn, contentNl } from 'content/travel-scheme';
import { Languages } from 'config/languages';
import { getSiteSettingsQuery } from 'utilities/sanity';
import { useTranslation } from 'hooks/translation';

interface NoAdviceProps {
	destination: string;
	locale: Languages;
}

const NoAdvice = ({ destination, locale }: NoAdviceProps) => {
	const country = useDestination(destination as string);
	const { t_s } = useTranslation();
	const c = getTravelSchemeContentBlocks({
		currentCategory: country?.riskLevel,
	});

	return (
		<>
			<MetaTags
				title={`Geen Advies ${t_s(country!.slug)}`}
				description={`Er is geen advies mogelijk voor je reis naar ${t_s(
					country!.slug,
				)} op basis van de door jou opgegeven data.`}
				url={getAdvicePath.noResult({ destination, locale })}
				noIndex
			/>

			<Page title="Helaas, we kunnen je geen advies geven" showBackLink="retry">
				<Hero>
					<ul
						sx={{
							paddingLeft: '17px',
							marginBottom: 0,
							fontFamily: 'body',
							color: 'text',
							fontSize: ['bodyMobile', 'body'],
							lineHeight: ['bodyMobile', 'body'],
							listStyleImage: 'url("/icons/Polygon 6.svg")',
							'li:not(:last-child)': {
								marginBottom: '16px',
							},
						}}
					>
						{c.bullets__10dgn_verstreken && (
							<li>
								Er zijn meer dan <strong>10 dagen verstreken</strong> sinds je
								thuiskomst.
							</li>
						)}
						{c.bullets__thuisquarantaine_voorbij && (
							<li>
								Je <strong>thuisquarantaine periode is voorbij</strong>.
							</li>
						)}
						{c.bullets__doe_de_check_opnieuw && (
							<li>
								Toch <strong>noodzakelijk</strong> naar het buitenland? Doe de
								check opnieuw.
							</li>
						)}
						{c.bullets__klachten_dan_testen && (
							<li>
								Heb je klachten? <strong>Laat je dan testen</strong>.
							</li>
						)}
					</ul>
				</Hero>

				<Content>
					<div
						sx={{
							maxWidth: 'widgetMaxWidth',
							marginTop: ['10px'],
						}}
					>
						<MakeOnlineAppointment ggdCtaButtonText="Heb je klachten? Maak direct een afspraak op de website van de GGD" />
						<CallGGD />
					</div>
					<Feedback />
				</Content>
			</Page>
		</>
	);
};

export interface NoAdviceStaticProps {
	params: {
		destination: string;
		locale: Languages;
	};
}

export const getStaticProps = async ({
	params: { destination, locale },
}: NoAdviceStaticProps) => {
	const content = locale === 'en' ? contentEn : contentNl;
	const siteSettings = await getSiteSettingsQuery({ locale });

	return {
		props: {
			destination,
			locale,
			siteSettings,
			localPageTranslations: content,
		},
	};
};

export const getStaticPaths = () => ({
	paths: cartesianProduct(
		countries.map((country) => `${country.slug}`),
		['nl', 'en'].map((locale) => `${locale}`),
	).map(([destination, locale]: string[]) => ({
		params: { destination, locale },
	})),
	fallback: false,
});

export default NoAdvice;
