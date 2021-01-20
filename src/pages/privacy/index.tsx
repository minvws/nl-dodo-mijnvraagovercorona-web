/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';
import Link from 'next/link';

import MetaTags from 'components/meta/MetaTags';
import { Content, Page } from 'components/structure/Page';

const Privacy = () => {
	return (
		<>
			<MetaTags
				title="Privacy | Quarantaine Reischeck | Reizentijdenscorona.nl"
				description="Wilt u meer informatie over het privacybeleid van de Rijksoverheid, kijk dan op www.rijksoverheid.nl/privacy."
				url="/privacy"
			/>

			<Page title="Privacy" showBackLink="previous">
				<Content>
					<Styled.p>
						Wilt u meer informatie over het privacybeleid van de Rijksoverheid,
						kijk dan op{' '}
						<a
							href="https://www.rijksoverheid.nl/privacy"
							target="_blank"
							rel="noopener noreferrer"
						>
							www.rijksoverheid.nl/privacy
						</a>
						.
					</Styled.p>
					<Styled.p>
						Reizentijdenscorona.nl gebruikt cookies voor webstatistieken om te
						begrijpen hoe bezoekers de website gebruiken. Lees{' '}
						<Link href="/cookies">hier</Link> meer.
					</Styled.p>
					<Styled.p>
						Omdat onze website nog in de testfase zit, bieden wij u de
						mogelijkheid ons te vertellen wat u van de website vindt. Bij het
						beantwoorden van een aantal korte vragen worden geen
						persoonsgegevens gevraagd, opgeslagen of verwerkt. Uw antwoorden
						worden alleen gebruikt om onze website te verbeteren.
					</Styled.p>
				</Content>
			</Page>
		</>
	);
};

export default Privacy;
