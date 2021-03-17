/** @jsx jsx */
import React from 'react';
import { Box, jsx } from 'theme-ui';

import { BodyContainer } from '@quarantaine/common';

type BannerDataProtectionProps = {
	content: {
		title: string;
		beloftes: string[];
	};
	className?: string;
	illustrationUrl?: string;
	withContainer?: boolean;
};

const OptionalBodyContainer = ({
	withContainer,
	children,
}: {
	withContainer?: boolean;
	children: React.ReactNode;
}) =>
	withContainer ? (
		<BodyContainer as="aside">{children}</BodyContainer>
	) : (
		<>{children}</>
	);

export const BannerDataProtection = ({
	className,
	illustrationUrl,
	content,
	withContainer,
}: BannerDataProtectionProps) => {
	return (
		<OptionalBodyContainer withContainer={withContainer}>
			<Box
				id="privacy"
				className={className}
				sx={{
					backgroundColor: ['white', 'sidePanel'],
					position: ['relative', 'sticky'],
					top: ['inherit', 0],
					right: ['inherit', 0],
					height: ['auto', '100vh'],
					maxWidth: ['100%', '400px'],
					padding: ['mobilePadding', '30px'],
					backgroundImage: ['none', `url("${illustrationUrl}")`],
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'right -60px bottom 20px',
					backgroundSize: ['auto', '339px', '439px'],
				}}
				{...(!withContainer
					? {
							as: 'aside',
					  }
					: {})}
			>
				<Box
					sx={{
						background:
							'linear-gradient(360deg, #EFF7F9 0%, rgba(255, 255, 255, 0) 100%), #FFFFFF',
						boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
						borderRadius: '11px',
						paddingLeft: '20px',
						paddingTop: '29px',
						paddingRight: '16px',
					}}
				>
					<h3
						sx={{
							fontSize: ['h2Mobile', 'h2'],
							color: 'secondaryHeader',
							paddingLeft: '4px',
							paddingBottom: '8px',
							margin: 0,
						}}
					>
						{content.title}
					</h3>
					<ul
						sx={{
							fontSize: ['bodyMobile', 'body'],
							listStyle: 'none',
							lineHeight: ['bodyMobile', 'body'],
							padding: 0,
							li: {
								background:
									'url("/icons/Privacy Protection.svg") no-repeat left top',
								paddingLeft: '40px',
								paddingBottom: '22px',
							},
						}}
					>
						{content.beloftes.map((belofte) => (
							<li key={belofte}>{belofte}</li>
						))}
					</ul>
				</Box>
			</Box>
		</OptionalBodyContainer>
	);
};
