/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';

import MetaTags from 'components/meta/MetaTags';
import { Content, Page } from 'components/structure/Page';

const Cookies = () => {
	return (
		<>
			<MetaTags
				title="Copyright | Quarantaine Reischeck | Reizentijdenscorona.nl"
				description="Tenzij anders vermeld is op de inhoud van deze website de Creative Commons zero verklaring (CC0) van toepassing. Dit houdt in dat hergebruik van de inhoud van deze site is toegestaan, tenzij bij een bepaald onderdeel (bijvoorbeeld een document) staat aangegeven dat op dat onderdeel een auteursrechtelijke beperking van toepassing is."
				url="/copyright"
			/>
			<Page title="Copyright" showBackLink="previous">
				<Content>
					<Styled.p>
						Tenzij anders vermeld is op de inhoud van deze website de Creative
						Commons zero verklaring (CC0) van toepassing. Dit houdt in dat
						hergebruik van de inhoud van deze site is toegestaan, tenzij bij een
						bepaald onderdeel (bijvoorbeeld een document) staat aangegeven dat
						op dat onderdeel een auteursrechtelijke beperking van toepassing is.
					</Styled.p>
					<Styled.h2>Uitzondering voor beeld</Styled.h2>
					<Styled.p>
						Op foto's, video's, infographics en alle andere vormen van beeld is
						de CC0-verklaring niet van toepassing. Het is dus niet toegestaan om
						beeld te hergebruiken of over te dragen, tenzij bij het beeld
						expliciet is aangegeven dat dat wél is toegestaan. Bij hergebruik
						van beeld is het overnemen van de naam van de maker – indien vermeld
						– verplicht. Daarnaast geldt dat bij het citeren van de inhoud niet
						de indruk gewekt mag worden dat de Rijksoverheid zonder meer de
						strekking van het afgeleide werk onderschrijft.
					</Styled.p>
					<Styled.h2>Auteursrechten</Styled.h2>
					<Styled.p>
						De redactie van deze website heeft in alle zorgvuldigheid rekening
						gehouden met de auteursrechten op de gepubliceerde beelden. Is dat
						naar uw mening bij een beeld niet of niet correct gebeurd? Neem dan
						contact op via reizentijdenscorona@minvws.nl
					</Styled.p>
				</Content>
			</Page>
		</>
	);
};

export default Cookies;
