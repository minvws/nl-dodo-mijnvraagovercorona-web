import React from 'react';
import { ButtonPrimary } from 'components/button';

export const StartCheckButton = ({
	children,
}: {
	children: React.ReactNode;
}) => <ButtonPrimary href="/bestemming">{children}</ButtonPrimary>;
