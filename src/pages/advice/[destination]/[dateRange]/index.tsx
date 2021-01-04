/** @jsx jsx */
import { GetServerSideProps } from 'next';
import { jsx, Container, Button, Link, Image, Divider, Box } from 'theme-ui';
import ContentPageHeader from 'components/structure/ContentPageHeader';
import BodyContainer from 'components/structure/BodyContainer';
import TravelPlan from 'components/TravelPlan/TravelPlan';
import TestBooking from 'components/results/TestBooking';
import ReminderCalendarInvite from 'components/TravelPlan/ReminderCalendarInvite';
import FaqList from 'components/faq/FaqList';
import Panel from 'components/structure/Panel';
import DataProtectionPanel from 'components/DataProtectionPanel'
import Footer from 'components/structure/Footer';
import { InternalLink } from 'components/Links';
import { parsePeriod } from 'utilities/pathUtils';
import { getAdvice, Advice } from 'services/AdviceService';
import { addDays } from 'utilities/dateUtils';
import { useRouter } from 'next/router';
import { useDestination } from 'hooks/use-destination';

type AdviceProps = {
    destination: string,
    dateRange: string
}

const AdviceResult = ({ destination, dateRange }: AdviceProps) => {
    const [fromDate, toDate] = parsePeriod(dateRange as string);
    const country = useDestination(destination as string);
    // @TODO: Fix empty string.
    const advice: Advice = getAdvice(country?.fullName || '', fromDate, toDate);
    const router = useRouter();

    if (!country) {
      router.push('/advice');
      return null;
    }

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
                    paddingLeft: '17px',
                    marginBottom: 0,
                    fontFamily: 'body',
                    fontSize: ['19px', '20px'],
                    listStyleImage: 'url("/icons/Polygon 6.svg")',
                    'li:not(:last-child)': {
                        marginBottom: '16px'
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

        <BodyContainer>
        <Container sx={{
            paddingLeft: ['mobilePadding', 0],
            paddingRight: ['mobilePadding', 0]
        }}>
        <h2 sx={{
            paddingTop: ['36px', '44px'],
            color: 'header',
            fontSize: ['h2Mobile', 'h2']
        }}>Jouw reisschema</h2>
        <TravelPlan advice={advice} />
        <TestBooking />

        <h2 sx={{
                    paddingTop: ['36px', '44px'],
                    color: 'header',
                    fontSize: ['h2Mobile', 'h2']
                }}>Veelgestelde vragen</h2>
        <FaqList limit={5} />

        <InternalLink href="/faq">
            Bekijk alle 10 veelgestelde vragen</InternalLink>


        { advice.quarantineInvite &&
          <>
              <h2 sx={{
                  paddingTop: ['36px', '44px'],
                  color: 'header',
                  fontSize: ['h2Mobile', 'h2']
              }}>Zo kom je de thuisquarantaine goed door</h2>
              <Box sx={{
                  borderRadius: '11px',
                  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
                  marginBottom: '10px',
                  paddingTop: '11px',
                  paddingBottom: '13px',
                  paddingLeft: '115px',
                  backgroundImage: 'url("/images/Banner_we_helpen_jeRetina.svg")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPositionX: '-10px',
              }}>
                  <h3 sx={{
                      color: 'secondaryHeader',
                      fontSize: ['bodyMobile', 'body'],
                      lineHeight: ['bodyMobile', 'body']
                  }}>
                      Wat moet ik regelen voor mijn thuisquarantaine?
                  </h3>
                  <InternalLink href="/preparations">Meer uitleg</InternalLink>
              </Box>
              <ReminderCalendarInvite message="Zet je thuisquarantaine in je agenda"
                                      fromDate={addDays(advice.quarantineInvite, -10)}
                                      toDate={new Date(advice.quarantineInvite)} />
              <div sx={{ marginBottom: '65px' }} />
          </>
        }
        </Container>
        <DataProtectionPanel />

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
