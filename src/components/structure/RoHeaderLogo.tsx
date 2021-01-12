/** @jsx jsx */
import React from 'react';
import Link from 'next/link';

import { Image, Container, ThemeUICSSObject, jsx } from 'theme-ui';

type RoHeaderLogoProps = {
	align?: string;
	children?: React.ReactNode;
};

const RoHeaderLogo = (props: RoHeaderLogoProps) => {
	const containerStyle: ThemeUICSSObject =
		props.align && props.align === 'center'
			? {
					textAlign: 'center',
			  }
			: {
					textAlign: 'right',
					paddingRight: '1em',
			  };
	return (
		<Container sx={containerStyle}>
			<Link href="/" passHref>
				<a sx={{ img: { width: ['54px', '68px'], height: 'auto' } }}>
					<Image src="/icons/RO logo.svg" />
					{props.children}
				</a>
			</Link>
		</Container>
	);
};

export default RoHeaderLogo;
