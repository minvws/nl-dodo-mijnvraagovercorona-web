/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { ExpansionPanel } from 'components/structure';

type FaqItemProps = {
	title: string;
	children: React.ReactNode;
};

export const FaqItem = ({ title, children }: FaqItemProps) => (
	<ExpansionPanel text={title}>{children}</ExpansionPanel>
);
