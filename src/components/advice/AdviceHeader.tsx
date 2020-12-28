/** @jsx jsx */
import React from 'react';
import { Heading, Container, Image, jsx } from 'theme-ui';
import RoHeaderLogo from '../RoHeaderLogo';
import ProgressMarker from './ProgressMarker';

type HeaderProps = {
    header: string,
    questionStage: number,
    totalStages: number,
    children?: React.ReactNode
};

const AdviceHeader = (props: HeaderProps) => {
    return (
        <header
            sx={{
                backgroundColor: 'headerBackground',
                fontFamily: 'heading',
                color: 'header',
                padding: '1em',
                paddingBottom: '2em'
            }}>
            <RoHeaderLogo align='right'/>
            <ProgressMarker stage={props.questionStage} totalStages={props.totalStages} />
            <Heading
                as='h2'
                sx={{
                    width: '65%',
                    fontSize: '20pt'
                }}>
            {props.header}</Heading>
            { props.children }
        </header>
    );
};

export default AdviceHeader;
