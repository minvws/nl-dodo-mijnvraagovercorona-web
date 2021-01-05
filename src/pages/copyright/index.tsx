/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';

import MetaTags from 'components/meta/MetaTags';
import ContentPage from 'components/structure/ContentPage';

const Cookies = () => {
	return (
		<>
			<MetaTags
				title="Quarantaine Reischeck | Reizentijdenscorona.nl"
				description=""
				url="/copyright"
			/>
			<ContentPage title="Copyright">
				<Styled.p sx={{ paddingTop: '63px' }}>
					Tenzij anders vermeld is op de inhoud van deze website de Creative
					Commons zero verklaring (CC0) van toepassing. Dit houdt in dat
					hergebruik van de inhoud van deze site is toegestaan, tenzij bij een
					bepaald onderdeel (bijvoorbeeld een document) staat aangegeven dat op
					dat onderdeel een auteursrechtelijke beperking van toepassing is.
				</Styled.p>
				<Styled.h3>Uitzondering voor beeld</Styled.h3>
				<Styled.p>
					Op foto's, video's, infographics en alle andere vormen van beeld is de
					CC0-verklaring niet van toepassing. Het is dus niet toegestaan om
					beeld te hergebruiken of over te dragen, tenzij bij het beeld
					expliciet is aangegeven dat dat wél is toegestaan. Bij hergebruik van
					beeld is het overnemen van de naam van de maker – indien vermeld –
					verplicht. Daarnaast geldt dat bij het citeren van de inhoud niet de
					indruk gewekt mag worden dat de Rijksoverheid zonder meer de strekking
					van het afgeleide werk onderschrijft.
				</Styled.p>
				<Styled.h3>Auteursrechten</Styled.h3>
				<Styled.p sx={{ paddingBottom: '80px' }}>
					De redactie van deze website heeft in alle zorgvuldigheid rekening
					gehouden met de auteursrechten op de gepubliceerde beelden. Is dat
					naar uw mening bij een beeld niet of niet correct gebeurd? Neem dan
					contact op via reizentijdenscorona@minvws.nl
				</Styled.p>
			</ContentPage>
		</>
	);
};

export default Cookies;
