/** @jsx jsx */
import { jsx } from 'theme-ui';

interface BannerAlleenSamenProps {
	alt: string;
}

export const BannerAlleenSamen = ({ alt }: BannerAlleenSamenProps) => {
	return (
		<aside
			sx={{
				backgroundColor: ['backgroundSecondary', 'white'],
				padding: '40px 0',
			}}
		>
			<a
				href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/coronavirus-beeld-en-video/communicatiemiddelen-campagne"
				target="_blank"
				rel="noopener noreferrer"
				sx={{
					width: '360px',
					maxWidth: '80%',
					margin: '0 auto ',
					display: 'block',
				}}
			>
				<img src="/images/logo-alleen-samen.svg" alt={alt} />
			</a>
		</aside>
	);
};
