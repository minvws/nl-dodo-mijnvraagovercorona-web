/** @jsx jsx */
import { jsx } from 'theme-ui';

import { Footer } from 'components/footer';
import { Page as PageComponent, Header } from '@quarantaine/common';

interface PageProps {
	showBackLink?: 'result' | 'previous' | 'retry';
	// If true: hides DataProtectionPanel, Footer and Alleen Samen logo on mobile.
	cleanPageOnMobile?: boolean;
	className?: string;
}

export const Page: React.FC<PageProps> = ({
	children,
	cleanPageOnMobile,
	className,
}) => {
	return (
		<PageComponent
			header={<Header />}
			footer={<Footer />}
			cleanPageOnMobile={cleanPageOnMobile}
			className={className}
		>
			{children}
		</PageComponent>
	);
};
