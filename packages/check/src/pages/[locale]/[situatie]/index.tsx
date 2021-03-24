/** @jsx jsx */
import { MetaTags } from 'components/meta-tags';
import { Page } from 'components/page';
import { Box, jsx, Styled } from 'theme-ui';
import { useRouter } from 'next/router';
import { BodyContainer, Link } from '@quarantaine/common';
import {
	QuarantaineOverviewBlock,
	QuarantaineOverviewBullet,
} from 'components/quarantine-overview';
import { GGDSpecialInstructions } from 'components/ggd-special-instructions';

// @TODO: CMS
const pageSettings = {
	title: 'Ga direct in quarantaine en laat je testen',
	quarantineOverviewTitle: 'Dit is jouw thuisquarantaine overzicht',
};

export default function JouwSituatie() {
	const router = useRouter();

	return (
		<>
			<MetaTags title={pageSettings.title} description="" url={router.asPath} />
			<Page title={pageSettings.title} withoutContainer>
				<Box sx={{ backgroundColor: 'headerBackground', py: 'box' }}>
					<BodyContainer sx={{ paddingRight: [, '165px'] }}>
						<Styled.h2>{pageSettings.quarantineOverviewTitle}</Styled.h2>
						<QuarantaineOverviewBlock
							title="Zat 6 maart"
							subtitle="(laatste contact)"
							day="Dag 0"
						/>
						<QuarantaineOverviewBlock
							title="Don 11 maart"
							subtitle="(vandaag)"
							day="Dag 5"
						>
							<QuarantaineOverviewBullet>
								<p>
									<strong>Ga direct in thuisquarantaine</strong> en vermijd
									contact met andere personen.
								</p>

								<p>
									<strong>Dus niet meer naar buiten,</strong> geen boodschappen
									doen en niet naar je werk.
								</p>
							</QuarantaineOverviewBullet>
							<QuarantaineOverviewBullet>
								<p>
									<strong>Laat je zo snel mogelijk testen</strong> op corona:
									<Link href="https://www.rijksoverheid.nl" external>
										maak nu een afspraak
									</Link>
								</p>

								<p>
									<strong>Is de testuitslag negatief?</strong> Dan mag je de
									thuisquarantaine beeindigen. Vermijd wel contact met kwetsbare
									personen tot en met dag 10 na het laatste coronacontact.
								</p>

								<p>
									<strong>Is de testuitslag positief?</strong> Dan heb je
									coroan. De GGD vertelt je meer en je moet{' '}
									<Link href="https://www.rijksoverheid.nl" external>
										in isolatie
									</Link>
									.
								</p>
							</QuarantaineOverviewBullet>
						</QuarantaineOverviewBlock>
						<QuarantaineOverviewBlock
							title="Din 16 maart"
							subtitle="(einde)"
							day="Dag 10"
						>
							<QuarantaineOverviewBullet>
								<p>
									<strong>Geen klachten?</strong> Dan mag je je thuisquarantaine
									beeindigen.
								</p>
								<p>
									<strong>Heb je wel coronaklachten?</strong> Blijf thuis en
									<Link href="https://www.rijksoverheid.nl" external>
										laat je opnieuw testen
									</Link>
								</p>
							</QuarantaineOverviewBullet>
						</QuarantaineOverviewBlock>

						<Box sx={{ mt: 'box' }}>
							<GGDSpecialInstructions />
						</Box>
					</BodyContainer>
				</Box>
			</Page>
		</>
	);
}

export async function getStaticProps() {
	return { props: {} };
}

export async function getStaticPaths() {
	return {
		paths: [
			{
				params: {
					situatie: 'in-de-buurt-geweest-van-iemand-met-corona',
					locale: 'nl',
				},
			},
		],
		fallback: false,
	};
}
