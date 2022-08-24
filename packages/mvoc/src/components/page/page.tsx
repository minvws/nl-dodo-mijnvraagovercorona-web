/** @jsx jsx */
import { jsx } from 'theme-ui';

import { Footer } from 'components/footer';
import {
	Page as PageComponent,
	Header,
	HeaderProps,
} from '@quarantaine/common';

interface PageProps {
	showBackLink?: 'result' | 'previous' | 'retry';
	// If true: hides DataProtectionPanel, Footer and Alleen Samen logo on mobile.
	cleanPageOnMobile?: boolean;
	className?: string;
	noHeader?: boolean;
	headerProps?: HeaderProps;
}

export const Page: React.FC<PageProps> = ({
	children,
	cleanPageOnMobile,
	className,
	noHeader,
	headerProps,
}) => {
	return (
		<PageComponent
			header={noHeader ? null : <Header {...headerProps} />}
			footer={<Footer />}
			cleanPageOnMobile={cleanPageOnMobile}
			className={className}
		>
			{children}
		</PageComponent>
	);
};
