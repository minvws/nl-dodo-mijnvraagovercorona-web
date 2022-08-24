import * as React from 'react';

import resolveProductionUrl from '../../resolveProductionUrl';

/**
 * A document preview which renders the requested page inside an iFrame
 */
export const WebPreview = ({
	document,
}: {
	document: { displayed: { url: string } };
}) => (
	<iframe
		src={resolveProductionUrl(document)}
		style={{
			border: 0,
			height: '100%',
			left: 0,
			top: 0,
			position: 'absolute',
			width: '100%',
		}}
		frameBorder={0}
	/>
);
