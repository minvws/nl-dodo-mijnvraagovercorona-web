/** @jsx jsx */
import { jsx, Container, Styled } from 'theme-ui';
import Link from 'next/link';

import MetaTags from 'components/meta/MetaTags';
import ContentPage from 'components/structure/ContentPage';

const Privacy = () => {
	return (
		<>
			<MetaTags
				title="Privacy | Quarantaine Reischeck | Rijksoverheid.nl"
				description="Wilt u meer informatie over het privacybeleid van de Rijksoverheid, kijk dan op www.rijksoverheid.nl/privacy."
				url="/privacy"
			/>

			<ContentPage title="Privacy">
				<Styled.p
					sx={{
						marginTop: '63px',
					}}
				>
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
					Reizentijdenscorona.rijksoverheid.nl gebruikt cookies voor
					webstatistieken om te begrijpen hoe bezoekers de website gebruiken.
					Lees <Link href="/cookies">hier</Link> meer.
				</Styled.p>
				<Styled.p
					sx={{
						marginBottom: '80px',
					}}
				>
					Omdat onze website nog in de testfase zit, bieden wij u de
					mogelijkheid ons te vertellen wat u van de website vindt. Bij het
					beantwoorden van een aantal korte vragen worden geen persoonsgegevens
					gevraagd, opgeslagen of verwerkt. Uw antwoorden worden alleen gebruikt
					om onze website te verbeteren.
				</Styled.p>
			</ContentPage>
		</>
	);
};

export default Privacy;
