/** @jsx jsx */
import { Image, Container, jsx, SxStyleProp } from 'theme-ui';

type HeaderLogoProps = {
	alt: string;
};

export const alignLogoRightOnMobileStyles: SxStyleProp = {
	'.logo': {
		textAlign: ['right', 'center'],
		paddingRight: ['34px', 0],
	},
	'.language-selector': {
		display: ['none', 'flex'],
	},
	header: {
		backgroundImage: 'none',
	},
};

export const Logo = ({ alt }: HeaderLogoProps) => {
	return (
		<Container className="logo" sx={{ textAlign: 'center' }}>
			<a href="/">
				<Image
					sx={{ width: ['54px', '68px'], height: 'auto' }}
					src="/icons/RO logo.svg"
					alt={alt}
				/>
			</a>
		</Container>
	);
};
