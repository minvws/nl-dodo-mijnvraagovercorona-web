/** @jsx jsx */
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { endOfDay, startOfDay } from 'date-fns';
import { jsx, Container, Box } from 'theme-ui';

import { getFaqsQuery } from 'utilities/sanity';
import { parseDate, addDays } from 'utilities/dateUtils';
import { cartesianProduct } from 'utilities/pathUtils';
import { getTravelSchemeContentBlocks } from 'utilities/travel-advice';

import { countries, RiskLevel } from 'config/countries';
import { Languages } from 'config/languages';

import { MetaTags } from 'components/meta';
import { TestBooking } from 'components/test-booking';
import { ReminderCalendarInvite } from 'components/travel-plan';
import { Faqs, FaqListShort } from 'components/faq';
import { DialogLink, InternalLink } from 'components/links';
import {
	TravelPlanStage,
	TravelAdvicePanel,
	TravelInformationLink,
} from 'components/travel-plan';
import { Dialog } from 'components/dialog';
import { Feedback } from 'components/feedback';
import { getAdvicePath } from 'components/advice/utils';
import { Content, Hero, Page } from 'components/structure';
import { ExpansionPanel } from 'components/structure';
import { Card } from 'components/card';
import AdviceContext, {
	MeansOfTransport,
	meansOfTransport,
	travelStage,
	TravelStage,
} from 'components/advice/AdviceContext';

import { contentNl, contentEn } from 'content/travel-scheme';

import { useTranslation } from 'hooks/translation';
import { useDestination } from 'hooks/use-destination';
import { getRequiredFaqs, orderByReferences } from 'utilities/faqs';

type AdviceProps = {
	destination: string;
	stage: TravelStage;
	meansOfTransport: MeansOfTransport;
	locale: 'nl' | 'en';
	faqs: Faqs;
};

const AdviceResult = ({
	destination,
	stage,
	meansOfTransport,
	locale,
	faqs,
}: AdviceProps) => {
	const { setFrom, setTo, setStage, setDestination } = useContext(
		AdviceContext,
	);
	const router = useRouter();
	const country = useDestination(destination as string);
	const { van, tot } = router.query;
	const fromDate: Date | undefined = van ? parseDate(van) : undefined;
	const toDate: Date | undefined = tot ? parseDate(tot) : undefined;
	const [showDialog, setShowDialog] = useState(false);
	const { t, t_s } = useTranslation();

	// Gets show/hide booleans for all content blocks.
	const c = getTravelSchemeContentBlocks({
		fromDate,
		toDate,
		currentTravelStage: stage,
		currentCategory: country?.riskLevel,
		currentMeansOfTransport: meansOfTransport,
		coronaMelderCountry: country?.coronaMelderCountry,
		transportRestrictions: country?.transportRestrictions,
	});

	const duringOrAfter =
		stage === 'tijdens-je-reis' || stage === 'na-thuiskomst';

	const showQuarantaine =
		country?.riskLevel === RiskLevel.A_RISICOVOL ||
		country?.riskLevel === RiskLevel.D_EU_INREISVERBOD;

	const pageTitle =
		country?.riskLevel === RiskLevel.A_RISICOVOL ||
		country?.riskLevel === RiskLevel.D_EU_INREISVERBOD
			? t('page_title__high_risk')
			: t('page_title');

	/**
	 * Update the AdviceContext so when landing on a results page and skipping the period and destination pages
	 * will allow users to navigate back to the results page
	 */
	useEffect(() => {
		if (setFrom && van) setFrom(van);
		if (setTo && tot) setTo(tot);
		if (setStage && stage) setStage(stage);
		if (setDestination && destination) setDestination(destination);
	}, [destination, van, tot, stage]);

	return (
		<>
			<MetaTags
				title={t_s('page_meta_title', {
					stage: t_s(`general__${stage}`),
					countryName: t_s(country!.slug),
					meansOfTransport: t_s(`general__${meansOfTransport}`),
				})}
				description={t_s('page_meta_description', {
					countryName: t_s(country!.slug),
					stage: t_s(`page_meta_description__stage_${stage}`),
					meansOfTransport: t_s(
						`page_meta_description__transport_${meansOfTransport}`,
					),
				})}
				url={
					getAdvicePath.result({
						destination,
						meansOfTransport,
						stage,
						locale,
					}).pathname
				}
			/>

			<Page title={`${pageTitle}`} showBackLink="retry">
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
						{c.bullets__na_31maart_reizen_onzeker && (
							<li>{t('bullets__na_31maart_reizen_onzeker')}</li>
						)}
						{c.bullets__tm_31maart_niet_reizen && (
							<li>{t('bullets__tm_31maart_niet_reizen')}</li>
						)}
						{c.bullets__verhoogd_risico && (
							<li>{t('bullets__verhoogd_risico')}</li>
						)}
						{c.bullets__laag_risico && <li>{t('bullets__laag_risico')}</li>}
						{c.bullets__na_reis_10dgn_thuisquarantaine && (
							<li>{t('bullets__na_reis_10dgn_thuisquarantaine')}</li>
						)}
						{c.bullets__geen_thuisquarantaine && (
							<li>{t('bullets__geen_thuisquarantaine')}</li>
						)}
						{c.bullets__ga_10dgn_thuisquarantaine && (
							<li>{t('bullets__ga_10dgn_thuisquarantaine')}</li>
						)}
					</ul>
				</Hero>
				<Content>
					{(c.banner__airboattravel_restriction ||
						c.banner__airtravel_restriction) && (
						<div sx={{ marginBottom: ['36px', '44px'] }}>
							<Card
								image="/images/Vliegtuig_streep.svg"
								imagePosition={{
									backgroundPositionX: '5px',
									backgroundPositionY: '22px',
								}}
								title={
									c.banner__airboattravel_restriction
										? t_s('banner__airboattravel_restriction')
										: t_s('banner__airtravel_restriction')
								}
								href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/vliegverbod-en-aanmeerverbod"
								external
							/>
						</div>
					)}
					<h2
						sx={{
							color: 'header',
							fontSize: ['h2Mobile', 'h2'],
							marginTop: 0,
						}}
					>
						{t('travelscheme__title')}
					</h2>
					<Container
						sx={{
							borderLeft: '2px solid #f0d5e2',
							paddingLeft: '1.8em',
							maxWidth: 'widgetMaxWidth',
							margin: 0,
						}}
					>
						{(c.reisschema__downloadReisApp || c.reisschema__coronaMelder) && (
							<TravelPlanStage
								title={t_s('travelscheme__voorbereiding_title')}
								subHeading={t_s('travelscheme__voorbereiding_subtitle')}
								date={new Date()}
							>
								{c.reisschema__downloadReisApp && (
									<TravelAdvicePanel
										title={t_s('travelscheme__downloadReisapp_title')}
									>
										{t('travelscheme__downloadReisapp_text')}
									</TravelAdvicePanel>
								)}
								{c.reisschema__coronaMelder && (
									<TravelAdvicePanel
										title={t_s('travelscheme__coronaMelder_title')}
									>
										{t('travelscheme__coronaMelder_text', {
											country: t_s(country!.slug),
										})}
									</TravelAdvicePanel>
								)}
								{c.reisschema__voorbereidenThuisQuarantaine && (
									<TravelAdvicePanel
										title={t_s(
											'travelscheme__voorbereidenThuisQuarantaine_title',
										)}
									>
										{t('travelscheme__voorbereidenThuisQuarantaine_text')}
									</TravelAdvicePanel>
								)}
							</TravelPlanStage>
						)}

						<TravelPlanStage
							title={t_s('travelscheme__vertrek_title')}
							subHeading={t_s(country!.slug)}
							date={fromDate}
						>
							{c.reisschema__reisadvies && (
								<TravelAdvicePanel
									title={t_s('travelscheme__reisadvies_title')}
									subHeading={
										duringOrAfter
											? t_s('travelscheme__reisadvies_totale_reisduur')
											: t_s('travelscheme__reisadvies_nu')
									}
								>
									{t('travelscheme__reisadvies_text', {
										country: t_s(country!.slug),
									})}
									<br />
									<TravelInformationLink
										href={`https://www.nederlandwereldwijd.nl/landen/${country?.slug}/reizen/reisadvies`}
										text={t_s('travelscheme__reisadvies_cta')}
									/>
								</TravelAdvicePanel>
							)}
							{c.reisschema__pcrtest && (
								<TravelAdvicePanel
									title={t_s('travelscheme__pcrtest_title')}
									subHeading={t_s('travelscheme__pcrtest_subtitle')}
								>
									{t('travelscheme__pcrtest_text')}
								</TravelAdvicePanel>
							)}
							{c.reisschame__pcrtest_en_verklaring && (
								<TravelAdvicePanel
									title={t_s('travelscheme__pcrtest_en_verklaring_title')}
									subHeading={t_s(
										'travelscheme__pcrtest_en_verklaring_subtitle',
									)}
								>
									{t('travelscheme__pcrtest_en_verklaring_text')}
								</TravelAdvicePanel>
							)}
							{c.reisschema__sneltest && (
								<TravelAdvicePanel
									title={t_s('travelscheme__sneltest_title')}
									subHeading={t_s('travelscheme__sneltest_subtitle')}
								>
									{t('travelscheme__sneltest_text')}
								</TravelAdvicePanel>
							)}
							{c.reisschema__gezondheidsverklaring && (
								<TravelAdvicePanel
									title={t_s('travelscheme__gezondheidsverklaring_title')}
								>
									{t('travelscheme__gezondheidsverklaring_text')}
								</TravelAdvicePanel>
							)}
						</TravelPlanStage>

						<TravelPlanStage
							title={t_s('travelscheme__thuiskomst__title')}
							subHeading={
								c.reisschema__thuisquarantaine
									? t_s('travelscheme__thuiskomst__subtitle')
									: undefined
							}
							date={toDate}
						>
							{c.reisschema__thuisquarantaine && (
								<TravelAdvicePanel
									title={t_s('travelscheme__thuisquarantaine_title')}
									subHeading={t_s('travelscheme__thuisquarantaine_subtitle')}
								>
									<DialogLink
										href=""
										onClick={(ev) => {
											ev.preventDefault();
											setShowDialog(true);
										}}
									>
										{t('travelscheme__thuisquarantaine_cta')}
									</DialogLink>
									<Dialog
										title={t_s('travelscheme__thuisquarantaine_title')}
										isVisible={showDialog}
										closeDialog={() => setShowDialog(false)}
									>
										<div
											sx={{
												h4: {
													color: 'smallText',
													fontSize: ['bodyMobile', 'body'],
													lineHeight: ['bodyMobile', 'body'],
													marginTop: '32px',
													marginBottom: '12px',
												},
												'h4 + p': {
													marginTop: '12px',
												},
											}}
										>
											<span
												sx={{
													fontSize: '24px',
													marginTop: '-20px',
													display: 'block',
												}}
											>
												Tot en met dag 10
											</span>
											<h4>Dag 1 tot en met 5</h4>
											<p>
												Als je besmet raakt met het coronavirus duurt het
												meestal 5 dagen voordat je klachten krijgt. Daarom kan
												je onbewust het coronavirus hebben en anderen besmetten.
												Blijf daarom thuis.
											</p>
											<ExpansionPanel text="Wat als ik klachten heb?">
												<p>
													Maak een testafspraak bij de GGD als je klachten hebt.
													Dit kan via{' '}
													<a
														href="https://www.coronatest.nl"
														target="_blank"
														rel="noopener noreferrer"
													>
														coronatest.nl
													</a>{' '}
													of bel naar 0800-1202. Houd je BSN bij je hand.
												</p>
											</ExpansionPanel>
											<ExpansionPanel text="Ik heb geen klachten op dag 5. Kan ik eerder uit quarantaine?">
												<p>
													Je kunt je vanaf dag 5 laten testen, ook als je geen
													klachten hebt. Als de testuitslag negatief is, mag je
													uit quarantaine. Krijg je na een negatieve testuitslag
													toch klachten, laat je dan opnieuw testen. Eerder dan
													de 5e dag testen heeft geen zin. Het kan zijn dat je
													dan te vroeg test om het virus aan te kunnen tonen.
												</p>
											</ExpansionPanel>
											<h4>Dag 5 tot en met 10</h4>
											<p>
												Niet iedereen krijgt binnen de eerste 5 dagen klachten.
												Na dag 5 kan je nog steeds onbewust het coronavirus
												hebben en anderen besmetten. Blijf daarom thuis. Uit het
												bron- en contactonderzoek van de GGD blijkt dat bij 99%
												van de contacten die klachten krijgt, dit gebeurt binnen
												10 dagen na het laatste contact met iemand die besmet is
												met het virus.
											</p>
											<ExpansionPanel text="Wat als ik klachten krijg?">
												<p>
													Maak een testafspraak bij de GGD als je klachten hebt.
													Dit kan via{' '}
													<a
														href="https://www.coronatest.nl"
														target="_blank"
														rel="noopener noreferrer"
													>
														coronatest.nl
													</a>{' '}
													of bel naar 0800-1202. Houd je BSN bij je hand.
												</p>
											</ExpansionPanel>
										</div>
									</Dialog>
								</TravelAdvicePanel>
							)}
						</TravelPlanStage>
						{c.reisschema__thuisquarantaine && (
							<TravelPlanStage
								title={t_s('travelscheme__einde_thuisquarantaine_title')}
								date={toDate && addDays(toDate, 10)}
							/>
						)}
					</Container>
					{c.agenda__reischeck_opnieuw_invullen && fromDate && (
						<Box sx={{ marginTop: ['10px', '60px'] }}>
							<ReminderCalendarInvite
								title={t_s('agenda__reischeck_opnieuw_invullen_title')}
								modalTitle={t_s(
									'agenda__reischeck_opnieuw_invullen_modal_title',
								)}
								modalBody={t_s('agenda__reischeck_opnieuw_invullen_modal_body')}
								inviteTitle={t_s(
									'agenda__reischeck_opnieuw_invullen_invite_title',
								)}
								inviteText={t_s(
									'agenda__reischeck_opnieuw_invullen_invite_text',
								)}
								singleDay={startOfDay(addDays(new Date(fromDate), -7))}
							/>
							<Container
								sx={{
									paddingLeft: '2em',
									paddingTop: '2px',
									paddingBottom: '2px',
									backgroundImage: 'url("/icons/Union.svg")',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: '0 12px',
									backgroundSize: '30px 30px',
								}}
							>
								<p
									sx={{
										lineHeight: '1.4em',
									}}
								>
									{t(
										'agenda__reischeck_opnieuw_invullen_situatie_kan_veranderen',
									)}
								</p>
							</Container>
						</Box>
					)}
					{toDate && (
						<TestBooking
							contentBlocks={c}
							toDate={toDate}
							quarantaine={showQuarantaine}
						/>
					)}
					{c.banner__thuisquarantaine && (
						<>
							<h2
								sx={{
									paddingTop: ['36px', '44px'],
									color: 'header',
									fontSize: ['h2Mobile', 'h2'],
								}}
							>
								{t('banner__thuisquarantaine_title')}
							</h2>
							<Card
								image="/images/Banner_we_helpen_jeRetina.svg"
								imagePosition={{
									backgroundPositionX: '-10px',
								}}
								title={t_s('banner__thuisquarantaine_title')}
								href="/voorbereiding"
							/>
						</>
					)}
					{c.agenda__zet_thuisquarantaine_in_agenda && toDate && (
						<ReminderCalendarInvite
							title={t_s('agenda__zet_thuisquarantaine_in_agenda_title')}
							modalTitle={t_s(
								'agenda__zet_thuisquarantaine_in_agenda_modal_title',
							)}
							modalBody={t_s(
								'agenda__zet_thuisquarantaine_in_agenda_modal_body',
							)}
							inviteTitle={t_s(
								'agenda__zet_thuisquarantaine_in_agenda_invite_title',
							)}
							inviteText={t_s(
								'agenda__zet_thuisquarantaine_in_agenda_invite_text',
							)}
							fromDate={startOfDay(toDate)}
							toDate={endOfDay(addDays(toDate, 10))}
						/>
					)}
					<h2
						sx={{
							paddingTop: ['36px', '44px'],
							color: 'header',
							fontSize: ['h2Mobile', 'h2'],
						}}
					>
						{t('veelgestelde_vragen_title')}
					</h2>
					<FaqListShort faqs={faqs} />
					<InternalLink href={`/${country?.slug}/faq`}>
						{t('veelgestelde_vragen_cta')}
					</InternalLink>
					<Feedback />
				</Content>
			</Page>
		</>
	);
};

export interface AdviceDestinationStageStaticProps {
	params: {
		destination: string;
		stage: TravelStage;
		meansOfTransport: MeansOfTransport;
		locale: Languages;
	};
}

export const getStaticProps = async ({
	params: { locale, destination, stage, meansOfTransport },
}: AdviceDestinationStageStaticProps) => {
	const content = locale === 'en' ? contentEn : contentNl;
	const requiredFaqs = getRequiredFaqs({ stage, destination });
	const { siteSettings, faqs } = await getFaqsQuery({
		locale,
		include: requiredFaqs,
	});

	return {
		props: {
			destination,
			stage,
			meansOfTransport,
			siteSettings,
			localPageTranslations: content,
			locale,
			faqs: orderByReferences({ faqs, references: requiredFaqs }),
		},
	};
};

export const getStaticPaths = () => ({
	paths: cartesianProduct(
		countries.map((country) => `${country.slug}`),
		travelStage.map((stage) => `${stage}`),
		meansOfTransport.map((means) => `${means}`),
		['nl', 'en'].map((locale) => `${locale}`),
	).map(([destination, stage, meansOfTransport, locale]: string[]) => ({
		params: { destination, stage, meansOfTransport, locale },
	})),
	fallback: false,
});

export default AdviceResult;
