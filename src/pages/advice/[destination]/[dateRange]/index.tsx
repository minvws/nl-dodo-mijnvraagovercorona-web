/** @jsx jsx */
import { GetServerSideProps } from 'next';
import { jsx, Container, Button, Link, Image, Divider } from 'theme-ui';
import ContentPageHeader from 'components/ContentPageHeader';
import BodyContainer from 'components/BodyContainer';
import TravelPlan from 'components/TravelPlan/TravelPlan';
import FAQTop5 from 'components/faq/Top5';
import Panel from 'components/content/Panel';
import { SafetyInfoItem, InternalLinkItem } from 'components/content/ListItems';
import HandleDataWidget from 'components/content/HandleDataWidget';
import Footer from 'components/content/Footer';
import { parseDestination, parsePeriod } from 'utilities/pathUtils';
import { getAdvice } from 'services/AdviceService';

type AdviceProps = {
    destination: string,
    dateRange: string
}

const AdviceResult = ({ destination, dateRange }: AdviceProps) => {
    const [fromDate, toDate] = parsePeriod(dateRange as string);
    const [country, city] = parseDestination(destination as string);
    const advice = getAdvice(country, fromDate, toDate, city);

    return (
        <>
            <ContentPageHeader
                message={advice.headerWarning}>
                <Link href="/advice" sx={{
                    position: 'absolute',
                    top: '20px',
                    textDecoration: 'none',
                    fontFamily: 'body',
                    verticalAlign: 'top',
                    '::before': {
                        display: 'block',
                        content: '""',
                        backgroundImage: `url("/icons/Refresh.svg")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                        float: 'left',
                        height: '1.5em',
                        width: '1.5em',
                        paddingRight: '0.5em'
                    }
                }}>
                    opnieuw
                </Link>
                <ul sx={{
                    fontFamily: 'body',
                    listStyleImage: 'url("/icons/Polygon 6.svg")',
                    marginLeft: '-1em',
                    lineSpacing: '2em',
                    fontSize: '14pt',
                    li: {
                        paddingTop: '1em'
                    }
                }}>
                    {
                        advice.adviceMessages.map((message, i) => {
                            return (
                                <li key={i}>{message}</li>
                            );
                        })
                    }
                </ul>
            </ContentPageHeader>

            <BodyContainer
                sx={{
                    padding: '1em',
                    marginTop: '1em',
                    color: 'header'
                }}>
                <h2>Jouw reisschema</h2>
                <TravelPlan advice={advice}
                            fromDate={fromDate} />

                <h2>Veelgestelde vragen</h2>
                <FAQTop5 />
                <hr/>
                <Link href="/faq">Bekijk alle 10 veelgestelde vragen</Link>

                <h2>Zo kom je de thuisquarantaine goed door</h2>
                <Panel>
                    <Image src="/images/Banner_we_helpen_jeRetina.svg" />
                    <h3 sx={{ color: 'secondaryHeader' }}>
                        Wat moet ik regelen voor mijn thuisquarantaine?
                    </h3>
                    <Container sx={{
                        paddingLeft: '3em',
                        paddingBottom: '0.5em'
                    }}>
                        <InternalLinkItem href="/preparations">Meer uitleg</InternalLinkItem>
                    </Container>
                </Panel>
                <HandleDataWidget />
            </BodyContainer>

            <Footer />
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            destination: context?.params?.destination as string,
            dateRange: context?.params?.dateRange as string
        }
    };
};

export default AdviceResult;
