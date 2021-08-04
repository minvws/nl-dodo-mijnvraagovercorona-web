/** @jsx jsx */
import { useContext, useState, useRef } from 'react';

import { useRouter } from 'next/router';
import { Flex, jsx } from 'theme-ui';
import { getCurrentUrlForLocale } from './utils';
import { AnimatePresence, motion } from 'framer-motion';

import {
	ScreenReaderOnly,
	TranslationContext,
	Locale,
	useCurrentLocale,
	useTranslation,
	NavLink,
	useOnPressEscape,
	useOnClickOutside,
	useOnRouteChange,
} from '@quarantaine/common';

import { WorldIcon } from '../../icons/world';

interface LocaleLinkProps {
	locale: Locale;
	currentPath: string;
}

const LocaleLink = ({ locale, currentPath }: LocaleLinkProps) => {
	const currentLocale = useCurrentLocale();

	return (
		<NavLink
			withChevron={false}
			href={getCurrentUrlForLocale(currentPath, locale, currentLocale)}
			lang={locale.id}
			sx={{ textDecoration: 'none', mt: 8 }}
		>
			{locale.fullName}{' '}
		</NavLink>
	);
};

export const LocaleSelector = () => {
	const [dropdownExpanded, setDropdownExpanded] = useState(false);
	const { asPath } = useRouter();
	const { t } = useTranslation();
	const { locales } = useContext(TranslationContext);
	const currentLocale = useCurrentLocale();
	const selectorRef = useRef(null);

	const closeDropdown = () => setDropdownExpanded(false);

	useOnPressEscape(closeDropdown);
	useOnClickOutside(selectorRef, closeDropdown);
	useOnRouteChange(closeDropdown);

	if (locales.length <= 1) return null;

	return (
		<Flex
			ref={selectorRef}
			className="locale-selector"
			sx={{
				position: 'absolute',
				top: '2rem',
				right: 'mobilePadding',
				left: 'inherit',
				fontSize: '16px',
				backgroundColor: 'white',
				borderRadius: 'box',
				flexDirection: 'column',
				padding: '8px 12px',
				':focus-within::before': {
					opacity: 1,
				},
				zIndex: '3',
				'&::before': {
					pointerEvents: 'none',
					opacity: dropdownExpanded ? 1 : 0,
					transition: 'opacity 300ms ease-in-out',
					borderRadius: 'box',
					content: '""',
					display: 'block',
					position: 'absolute',
					width: '100%',
					height: '100%',
					boxShadow: '0px 0px 10px rgba(21, 66, 115, 0.2)',
					left: 0,
					top: 0,
				},
				a: {
					':hover, :focus': {
						textDecoration: 'underline',
						outline: 'none',
					},
				},
			}}
		>
			<button
				aria-controls="locale-dropdown"
				aria-expanded={dropdownExpanded}
				onClick={() => setDropdownExpanded((expanded) => !expanded)}
				sx={{
					backgroundColor: 'transparent',
					border: 'none',
					display: 'flex',
					color: 'copyHeading',
					fontWeight: 'bold',
					fontSize: '16px',
					justifyContent: 'space-between',
					alignItems: 'center',
					lineHeight: '1',
					padding: 0,
					':hover, :focus': {
						outline: 'none',
						textDecoration: 'underline',
					},
				}}
			>
				<ScreenReaderOnly>{t('general__wissel_van_taal')}</ScreenReaderOnly>
				<ScreenReaderOnly>{t('general__huidige_taal')}:</ScreenReaderOnly>
				<AnimatePresence initial={false}>
					<motion.span
						key={dropdownExpanded ? 'expanded' : 'shorthand'}
						transition={{ duration: 0.3 }}
						animate={{ width: 'auto', opacity: 1 }}
						sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
						initial={{ width: 0, opacity: 0 }}
						exit={{ width: 0, opacity: 0 }}
					>
						{dropdownExpanded
							? currentLocale.fullName
							: currentLocale.shortName.toUpperCase()}
					</motion.span>
				</AnimatePresence>
				<span
					sx={{
						display: 'block',
						minWidth: '22px',
						minHeight: '22px',
						marginLeft: 8,
						path: { fill: 'copyHeading' },
					}}
					aria-hidden
				>
					<WorldIcon />
				</span>
			</button>

			<motion.div
				hidden={!dropdownExpanded}
				animate={{
					height: dropdownExpanded ? 'auto' : '0',
					width: dropdownExpanded ? 'auto' : '0',
				}}
				sx={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
				id="locale-dropdown"
			>
				{locales
					.filter((locale) => locale.id !== currentLocale.id)
					.map((locale) => (
						<LocaleLink key={locale.id} locale={locale} currentPath={asPath} />
					))}
			</motion.div>
		</Flex>
	);
};
