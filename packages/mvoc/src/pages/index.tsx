import { Locales } from '@quarantaine/common';
import LandingPage, {
	getStaticProps as localizedHomeGetStaticProps,
} from './[locale]/index';

export const getStaticProps = async () =>
	localizedHomeGetStaticProps({ params: { locale: Locales.Dutch } });

export default LandingPage;
