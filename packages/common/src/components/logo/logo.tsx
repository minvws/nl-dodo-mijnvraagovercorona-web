/** @jsx jsx */
import { Image, Container, jsx, SxStyleProp } from 'theme-ui';

import { useCurrentLocale } from '@quarantaine/common';

type HeaderLogoProps = {
	alt: string;
};

export const alignLogoRightOnMobileStyles: SxStyleProp = {
	'.logo': {
		textAlign: ['right', 'center'],
		paddingRight: ['34px', 0],
	},
	'.locale-selector': {
		display: ['none', 'flex'],
	},
	header: {
		backgroundImage: 'none',
	},
};

export const Logo = ({ alt }: HeaderLogoProps) => {
	const { urlPrefix } = useCurrentLocale();

	return (
		<Container className="logo" sx={{ textAlign: 'center' }}>
			<a href={urlPrefix}>
				<Image
					sx={{ width: ['54px', '68px'], height: 'auto' }}
					src="/icons/RO logo.svg"
					alt={alt}
				/>
			</a>
		</Container>
	);
};
