/** @jsx jsx */
import { jsx } from 'theme-ui';
import { MetaTags } from 'components/meta-tags';
import React from 'react';
import { Page } from 'components/page';
import { Link, QuickLinks } from '@quarantaine/common';

export default function Home() {
	return (
		<>
			<MetaTags title="Quarantaine check" description="" url="/" />
			<Page title="Moet ik in quarantaine?">
				<QuickLinks>
					<Link href="test">Help verspreiding van het virus voorkomen</Link>
					<Link href="test">
						Weet binnen 1 minuut of je in thuisquarantaine moet
					</Link>
					<Link href="test">We helpen je met je thuisquarantaine</Link>
					<Link href="test" sx={{ display: ['block', 'none'] }}>
						Je privacy is altijd beschermd
					</Link>
				</QuickLinks>
			</Page>
		</>
	);
}
