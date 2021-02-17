/** @jsx jsx */
import { Link } from 'components/Links';
import { ScreenreaderOnly } from 'components/ScreenreaderOnly';
import { useTranslation } from 'hooks/use-translation';
import { useRouter } from 'next/router';
import { Flex, jsx } from 'theme-ui';
import { getCurrentUrlForLanguage, useCurrentLangage } from './utils';

export enum Languages {
	Dutch = 'nl',
	English = 'en',
}

export interface Language {
	id: Languages;
	fullName: string;
	shortName: string;
	urlPrefix: string;
}

/**
 * @note The default language (NL), should always be the first
 * in the array since the first language is used as the default if no
 * language can be resolved.
 */
export const languages: Language[] = [
	{
		id: Languages.Dutch,
		fullName: 'Nederlands',
		shortName: 'Nl',
		urlPrefix: '/nl',
	},
	{
		id: Languages.English,
		fullName: 'English',
		shortName: 'En',
		urlPrefix: '/en',
	},
];

interface LanguageLinkProps {
	id: Languages;
	currentPath: string;
}

const LanguageLink = ({ id, currentPath }: LanguageLinkProps) => {
	const { t } = useTranslation();
	const language = languages.find((lang) => lang.id === id);
	const currentLanguage = useCurrentLangage(currentPath, languages);
	const isCurrentLanguage = currentLanguage.id === language?.id;

	if (!language) return null;

	return (
		<Link
			className={isCurrentLanguage ? 'active' : undefined}
			href={getCurrentUrlForLanguage(currentPath, language, currentLanguage)}
			lang={currentLanguage.id}
		>
			{language.shortName}{' '}
			{isCurrentLanguage && (
				<ScreenreaderOnly>({t('general__huidige_taal')})</ScreenreaderOnly>
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
				right: ['inherit', 'mobilePadding'],
				left: ['mobilePadding', 'inherit'],
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
			<ScreenreaderOnly>{t('general__wissel_van_taal')}:</ScreenreaderOnly>
			<LanguageLink id={Languages.Dutch} currentPath={asPath} />
			<LanguageLink id={Languages.English} currentPath={asPath} />
		</Flex>
	);
};
