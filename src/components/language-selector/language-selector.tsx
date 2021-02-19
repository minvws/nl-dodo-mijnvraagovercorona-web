/** @jsx jsx */
import { Link } from 'components/links';
import { ScreenReaderOnly } from 'components/screen-reader-only';
import { languages, Languages } from 'config/languages';
import { useCurrentLanguage, useTranslation } from 'hooks/translation';
import { useRouter } from 'next/router';
import { Flex, jsx } from 'theme-ui';
import { getCurrentUrlForLanguage } from './utils';

interface LanguageLinkProps {
	id: Languages;
	currentPath: string;
}

const LanguageLink = ({ id, currentPath }: LanguageLinkProps) => {
	const { t } = useTranslation();
	const language = languages.find((lang) => lang.id === id);
	const currentLanguage = useCurrentLanguage();
	const isCurrentLanguage = currentLanguage.id === language?.id;

	if (!language || !currentLanguage) return null;

	return (
		<Link
			className={isCurrentLanguage ? 'active' : undefined}
			href={getCurrentUrlForLanguage(currentPath, language, currentLanguage)}
			lang={currentLanguage.id}
		>
			{language.shortName}{' '}
			{isCurrentLanguage && (
				<ScreenReaderOnly>({t('general__huidige_taal')})</ScreenReaderOnly>
			)}
		</Link>
	);
};

export const LanguageSelector = () => {
	const { asPath } = useRouter();
	const { t } = useTranslation();

	return (
		<Flex
			className="language-selector"
			sx={{
				position: 'absolute',
				top: '2rem',
				right: 'mobilePadding',
				left: 'inherit',
				a: {
					margin: '0 8px',
					fontWeight: 'normal',
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
			<LanguageLink id={Languages.Dutch} currentPath={asPath} />
			<LanguageLink id={Languages.English} currentPath={asPath} />
		</Flex>
	);
};
