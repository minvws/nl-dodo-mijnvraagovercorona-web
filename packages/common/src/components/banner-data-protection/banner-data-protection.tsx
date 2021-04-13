/** @jsx jsx */
import { Box, Styled, jsx } from 'theme-ui';

type BannerDataProtectionProps = {
	content: {
		title: string;
		beloftes: string[];
	};
};

export const BannerDataProtection = ({
	content,
}: BannerDataProtectionProps) => {
	return (
		<Box
			sx={{
				background:
					'linear-gradient(360deg, #EFF7F9 0%, rgba(255, 255, 255, 0) 100%), #FFFFFF',
				boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
				borderRadius: '11px',
				padding: '30px 30px 10px 30px',
			}}
		>
			<Styled.h2
				sx={{
					color: 'copyHeading',
				}}
			>
				{content.title}
			</Styled.h2>
			<ul
				sx={{
					fontSize: 'asideText',
					listStyle: 'none',
					lineHeight: 1.26,
					padding: 0,
					li: {
						background:
							'url("/icons/Privacy Protection.svg") no-repeat left top',
						paddingLeft: '40px',
						paddingBottom: '16px',
						':last-child': {
							paddingBottom: 0,
						},
					},
				}}
			>
				{content.beloftes.map((belofte) => (
					<li key={belofte}>{belofte}</li>
				))}
			</ul>
		</Box>
	);
};
