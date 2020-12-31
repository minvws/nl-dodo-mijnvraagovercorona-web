/** @jsx jsx */
import { jsx, Container, Link } from 'theme-ui';
import SimpleContent from '../../components/content/SimpleContent';

const Privacy = () => {
    return (
        <SimpleContent>
            <Container>
                <h2>Privacy</h2>
                <p>
                    Wilt u meer informatie over het privacybeleid van de Rijksoverheid, kijk dan op
                    <Link href="https://www.rijksoverheid.nl/privacy"><a>www.rijksoverheid.nl/privacy</a></Link>.
                </p>
                <p>
                    Reizentijdenscorona.nl gebruikt cookies voor webstatistieken om te begrijpen hoe bezoekers de website gebruiken.
                    Lees <Link href="/cookies">hier</Link> meer
                </p>
            </Container>
        </SimpleContent>
    );
}

export default Privacy;
