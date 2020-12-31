/** @jsx jsx */
import { jsx, Container, Link } from 'theme-ui';
import RoHeaderLogo from '../../components/RoHeaderLogo';
import Footer from '../../components/content/Footer';

type SimpleContentProps = {
    children: React.ReactNode
};

const SimpleContent = (props: SimpleContentProps) => {
    return (
        <>
        <header sx={{
                backgroundColor: 'headerBackground',
                fontFamily: 'header',
                color: 'header',
                padding: '1em',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right top'
        }}>
            <RoHeaderLogo align='center'/>
        </header>

        {props.children}

        <Footer/>
        </>
    );
}

export default SimpleContent;
