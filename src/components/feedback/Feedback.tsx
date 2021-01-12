/** @jsx jsx */
import React from 'react';
import { jsx, Styled } from 'theme-ui';

import { ButtonPrimary } from 'components/button';

const Feedback = () => (
	<>
		<h2
			sx={{
				paddingTop: ['36px', '44px'],
				color: 'header',
				fontSize: ['h2Mobile', 'h2'],
			}}
		>
			Waar zou je nog meer mee geholpen zijn?
		</h2>
		<Styled.p>
			Help deze website beter te maken. Deel je mening anoniem in een paar
			vragen.
		</Styled.p>
		<ButtonPrimary href="https://valsplat.typeform.com/to/hlgYe4qs" external>
			Deel je mening
		</ButtonPrimary>
	</>
);

export default Feedback;
