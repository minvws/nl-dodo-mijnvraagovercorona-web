/** @jsx jsx */
import { jsx } from 'theme-ui';

import { Header } from 'components/header';
import { Footer } from 'components/footer';
import { Page as PageComponent } from '@quarantaine/common';

interface PageProps {
	title: string;
	headerPrefix?: string;
	showBackLink?: 'result' | 'previous' | 'retry';
	// If true: hides DataProtectionPanel, Footer and Alleen Samen logo on mobile.
	cleanPageOnMobile?: boolean;
	className?: string;
	illustrationUrl?: string;
	showRetryLink?: boolean;
}

export const Page: React.FC<PageProps> = ({
	title,
	headerPrefix,
	children,
	cleanPageOnMobile,
	className,
	illustrationUrl = '/images/Koffer_DesktopRetina.svg',
	showRetryLink,
}) => {
	return (
		<PageComponent
			header={
				<Header
					title={title}
					headerPrefix={headerPrefix}
					showRetryLink={showRetryLink}
				/>
			}
			footer={<Footer />}
			cleanPageOnMobile={cleanPageOnMobile}
			className={className}
			illustrationUrl={illustrationUrl}
		>
			{children}
		</PageComponent>
	);
};
