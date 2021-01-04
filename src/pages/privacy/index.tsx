/** @jsx jsx */
import { jsx, Container, Styled} from 'theme-ui';
import ContentPage from 'components/ContentPage';

const Privacy = () => {
    return (
        <ContentPage title="Privacy">
            <Styled.p sx={{
                marginTop: '63px'
            }}>
                Wilt u meer informatie over het privacybeleid van de Rijksoverheid, kijk dan op <a href="https://www.rijksoverheid.nl/privacy">www.rijksoverheid.nl/privacy</a>.
            </Styled.p>
            <Styled.p sx={{
                marginBottom: '80px'
            }}>
                Reizentijdenscorona.nl gebruikt cookies voor webstatistieken om te begrijpen hoe bezoekers de website gebruiken.
                Lees <a href="/cookies">hier</a> meer
            </Styled.p>
        </ContentPage>
    );
}

export default Privacy;
