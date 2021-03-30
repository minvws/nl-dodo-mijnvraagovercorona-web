/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

import { Header as HeaderComponent } from '@quarantaine/common';

type HeaderProps = {
	title: string;
	headerPrefix?: React.ReactNode;
};

export const Header = ({ title, headerPrefix }: HeaderProps) => {
	return <HeaderComponent title={title} headerPrefix={headerPrefix} />;
};
