import { Locales } from '@quarantaine/common';
import LandingPage, {
	getStaticProps as localizedHomeGetStaticProps,
} from './[locale]/index';

export const getStaticProps = async ({ preview = false }) =>
	localizedHomeGetStaticProps({ params: { locale: Locales.Dutch }, preview });

export default LandingPage;
