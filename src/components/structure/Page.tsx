/** @jsx jsx */
import DataProtectionPanel from 'components/DataProtectionPanel';
import { ImageAlleenSamen } from 'components/image-alleen-samen';
import { Box, Flex, jsx } from 'theme-ui';
import BodyContainer from './BodyContainer';
import Header from './Header';
import Footer from './Footer';
import { LanguageSelector } from 'components/language-selector';

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
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						position: 'relative',
					}}
				>
					<Header
						message={title}
						headerPrefix={headerPrefix}
						showBackLink={showBackLink}
						backgroundImage={illustrationMobileUrl}
					/>
					<LanguageSelector />
					<main>{children}</main>
					<div
						sx={{
							display: cleanPageOnMobile ? ['none', 'block'] : undefined,
							marginTop: 'auto',
						}}
					>
						<BodyContainer>
							<DataProtectionPanel sx={{ display: ['block', 'none'] }} />
							<ImageAlleenSamen />
						</BodyContainer>
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
			// If the here is nested INSIDE the main element, this means that no only the header
			// has a hero, but also the page content has a hero section.
			// The negative margin top makes sure that these two hero sections "connect" with
			// each other.
			'main > &': {
				marginTop: '-45px',
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
		sx={{
			paddingTop: '65px',
			'> :first-child': { marginTop: 0 },
		}}
	>
		{children}
	</BodyContainer>
);
