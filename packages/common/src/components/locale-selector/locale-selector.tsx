/** @jsx jsx */
import { useContext } from 'react';

import { useRouter } from 'next/router';
import { Flex, jsx } from 'theme-ui';
import { getCurrentUrlForLocale } from './utils';

import {
	ScreenReaderOnly,
	TranslationContext,
	Locale,
	useCurrentLocale,
	useTranslation,
	NavLink,
} from '@quarantaine/common';

interface LocaleLinkProps {
	locale: Locale;
	currentPath: string;
}

const LocaleLink = ({ locale, currentPath }: LocaleLinkProps) => {
	const { t } = useTranslation();
	const currentLocale = useCurrentLocale();
	const isCurrentLocale = currentLocale.id === locale.id;

	if (!currentLocale) return null;

	return (
		<NavLink
			withChevron={false}
			className={isCurrentLocale ? 'active' : undefined}
			href={getCurrentUrlForLocale(currentPath, locale, currentLocale)}
			lang={currentLocale.id}
		>
			{locale.shortName}{' '}
			{isCurrentLocale && (
				<ScreenReaderOnly>({t('general__huidige_taal')})</ScreenReaderOnly>
			)}
		</NavLink>
	);
};

export const LocaleSelector = () => {
	const { asPath } = useRouter();
	const { t } = useTranslation();
	const { locales } = useContext(TranslationContext);

	return (
		<Flex
			className="locale-selector"
			sx={{
				position: 'absolute',
				top: '2rem',
				right: 'mobilePadding',
				left: 'inherit',
				a: {
					margin: '0 8px',
					fontWeight: 'normal',
					display: 'block',
					fontSize: ['linkMobile', 'link'],
					textDecoration: 'none',
					textTransform: 'uppercase',
					'&::after': {
						content: '""',
						display: 'block',
						height: '2px',
						width: '100%',
						backgroundColor: 'link',
						opacity: 0,
						transform: 'translate3d(0, 5px, 0)',
						transition: '150ms ease-in-out',
						transitionProperty: 'transform, opacity',
					},
					'&.active, &:hover, &:focus': {
						'&::after': {
							opacity: 1,
							transform: 'translate3d(0,0,0)',
						},
					},
				},
			}}
		>
			<ScreenReaderOnly>{t('general__wissel_van_taal')}:</ScreenReaderOnly>
			{locales.map((locale) => (
				<LocaleLink key={locale.id} locale={locale} currentPath={asPath} />
			))}
		</Flex>
	);
};
