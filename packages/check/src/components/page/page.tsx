/** @jsx jsx */
import { jsx } from 'theme-ui';

import { Header } from 'components/header';
import { Footer } from 'components/footer';
import { Page as PageComponent } from '@quarantaine/common';

interface PageProps {
	showBackLink?: 'result' | 'previous' | 'retry';
	// If true: hides DataProtectionPanel, Footer and Alleen Samen logo on mobile.
	cleanPageOnMobile?: boolean;
	className?: string;
	illustrationUrl?: string;
	showRetryLink?: boolean;
}

export const Page: React.FC<PageProps> = ({
	children,
	cleanPageOnMobile,
	className,
	illustrationUrl = '/images/illustration-couch.svg',
	showRetryLink,
}) => {
	return (
		<PageComponent
			header={<Header showRetryLink={showRetryLink} />}
			footer={<Footer />}
			cleanPageOnMobile={cleanPageOnMobile}
			className={className}
			illustrationUrl={illustrationUrl}
		>
			{children}
		</PageComponent>
	);
};
