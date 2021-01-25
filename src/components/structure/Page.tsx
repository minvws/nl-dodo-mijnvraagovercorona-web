/** @jsx jsx */
import DataProtectionPanel from 'components/DataProtectionPanel';
import { ImageAlleenSamen } from 'components/image-alleen-samen';
import { Box, Flex, jsx } from 'theme-ui';
import BodyContainer from './BodyContainer';
import Header from './Header';
import Footer from './Footer';

interface PageProps {
	title: string;
	headerPrefix?: string;
	showBackLink?: 'result' | 'previous' | 'retry';
	// If true: hides DataProtectionPanel, Footer and Alleen Samen logo on mobile.
	cleanPageOnMobile?: boolean;
	className?: string;
	illustrationUrl?: string;
	illustrationMobileUrl?: string;
}

export const Page: React.FC<PageProps> = ({
	title,
	headerPrefix,
	children,
	showBackLink,
	cleanPageOnMobile,
	className,
	illustrationUrl = '/images/Koffer_DesktopRetina.svg',
	illustrationMobileUrl = '/images/Koffer_MobielRetina.svg',
}) => {
	return (
		<>
			<Flex
				className={className}
				sx={{
					minHeight: '100vh',
					flexDirection: ['column', 'row'],
				}}
			>
				<Box sx={{ width: '100%' }}>
					<Header
						message={title}
						headerPrefix={headerPrefix}
						showBackLink={showBackLink}
						backgroundImage={illustrationMobileUrl}
					/>
					<main>{children}</main>
					<div sx={cleanPageOnMobile ? { display: ['none', 'block'] } : {}}>
						<DataProtectionPanel sx={{ display: ['block', 'none'] }} />
						<ImageAlleenSamen />
						<Footer />
					</div>
				</Box>
				<DataProtectionPanel
					sx={{ display: ['none', 'block'] }}
					illustrationUrl={illustrationUrl}
				/>
			</Flex>
		</>
	);
};

export const Hero: React.FC = ({ children }) => (
	<div
		sx={{
			backgroundColor: 'headerBackground',
			paddingBottom: '36px',
			'main > &': {
				marginTop: '-50px',
			},
			'> div': {
				paddingTop: '18px',
			},
		}}
	>
		<Content>{children}</Content>
	</div>
);

export const Content: React.FC = ({ children }) => (
	<BodyContainer
		sx={{ paddingTop: '65px', '> :first-child': { marginTop: 0 } }}
	>
		{children}
	</BodyContainer>
);
