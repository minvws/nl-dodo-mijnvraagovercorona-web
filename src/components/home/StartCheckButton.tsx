import React from 'react';
import { ButtonPrimary } from '../button';

const StartCheckButton = ({ children }: { children: React.ReactNode }) => (
	<ButtonPrimary href="/bestemming">{children}</ButtonPrimary>
);

export default StartCheckButton;
