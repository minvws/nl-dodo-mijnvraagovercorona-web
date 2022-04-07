/** @jsx jsx */
import { ContentBlock } from '@quarantaine/common';
import React from 'react';
import { jsx, Box, Styled, Button } from 'theme-ui';

export type InformContactsProps = {
	title: string;
	preButtonContent?: Object[];
	steps?: {
		title: string;
		content: Object[];
		points?: {
			title: string;
			content: Object[];
		}[];
	}[];
	buttons: {
		situation: {
			url: string;
			showDate: boolean;
			showExceptions: boolean;
		};
		copyButton: {
			label: string;
			labelCopied: string;
		};
		shareButton: {
			label: string;
			message: string;
		};
	};
};

export const InformContacts: React.FC<InformContactsProps> = ({
	title,
	preButtonContent,
	steps,
	buttons,
}) => {
	return (
		<Box>
			<Styled.h2>{title}</Styled.h2>
			{steps ? (
				<ol>
					{steps.map((step) => (
						<li key={step.title}>
							<Styled.h3>{step.title}</Styled.h3>
							<ContentBlock content={step.content} />
							{step.points ? (
								<ul>
									{step.points.map((point) => (
										<li key={point.title}>
											<Styled.h4>{point.title}</Styled.h4>
											<ContentBlock content={point.content} />
										</li>
									))}
								</ul>
							) : null}
						</li>
					))}
				</ol>
			) : null}
			{preButtonContent ? <ContentBlock content={preButtonContent} /> : null}
			{
				/*navigator && navigator['share'] dit werkt niet 🤦🏻‍♂️ moet even omheen gebouwd worden */ true ? (
					<Button>{buttons.shareButton.label}</Button>
				) : (
					<Button>{buttons.copyButton.label}</Button>
				)
			}
		</Box>
	);
};
