/** @jsx jsx */
import { jsx } from 'theme-ui';

import { Footer } from 'components/footer';
import { Page as PageComponent, Header } from '@quarantaine/common';

interface PageProps {
	showBackLink?: 'result' | 'previous' | 'retry';
	// If true: hides DataProtectionPanel, Footer and Alleen Samen logo on mobile.
	cleanPageOnMobile?: boolean;
	className?: string;
	noHeader?: boolean;
}

export const Page: React.FC<PageProps> = ({
	children,
	cleanPageOnMobile,
	className,
	noHeader,
}) => {
	return (
		<PageComponent
			header={noHeader ? null : <Header />}
			footer={<Footer />}
			cleanPageOnMobile={cleanPageOnMobile}
			className={className}
		>
			{children}
		</PageComponent>
	);
};
