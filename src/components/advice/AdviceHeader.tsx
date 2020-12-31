/** @jsx jsx */
import React from 'react';
import { Container, jsx } from 'theme-ui';
import RoHeaderLogo from '../RoHeaderLogo';
import ProgressMarker from './ProgressMarker';
import { useDesktopQuery } from 'hooks/useDesktopQuery';

type HeaderProps = {
    header: string,
    questionStage: number,
    totalStages: number,
    children?: React.ReactNode
};

const AdviceHeader = (props: HeaderProps) => {
    const isDesktop = useDesktopQuery();

    return (
        <header
            sx={{
                backgroundColor: 'headerBackground',
                fontFamily: 'heading',
                color: 'header',
                padding: '1em',
                paddingBottom: '2em'
            }}>
            <RoHeaderLogo align={isDesktop ? 'center' :'right'}/>
            <Container sx={{
                width: ['100%', '1040px']
            }}>

                <ProgressMarker stage={props.questionStage} totalStages={props.totalStages} />
                <h2 sx={{
                    width: '65%',
                    fontSize: '20pt'
                }}>
                    {props.header}</h2>
                    { props.children }
            </Container>
        </header>
    );
};

export default AdviceHeader;
