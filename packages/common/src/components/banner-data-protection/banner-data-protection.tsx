/** @jsxRuntime classic /
/** @jsx jsx */
import { Tile } from '@quarantaine/common';
import { Themed, jsx } from 'theme-ui';

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
		<Tile>
			<Themed.h2
				sx={{
					color: 'copyHeading',
				}}
			>
				{content.title}
			</Themed.h2>
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
					},
				}}
			>
				{content.beloftes.map((belofte) => (
					<li key={belofte}>{belofte}</li>
				))}
			</ul>
		</Tile>
	);
};
