/** @jsx jsx */
import Image from 'next/image';
import { jsx } from 'theme-ui';

export const ImageAlleenSamen = () => (
	<a
		href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/coronavirus-beeld-en-video/communicatiemiddelen-campagne"
		target="_blank"
		rel="noopener noreferrer"
		sx={{
			width: '360px',
			maxWidth: '80%',
			margin: '20px auto 40px auto',
			display: 'block',
		}}
	>
		<Image
			src="/images/logo-alleen-samen.svg"
			alt="Alleen samen krijgen we corona onder controle. Ga naar de campagnewebsite."
			width="360"
			height="90"
		/>
	</a>
);
