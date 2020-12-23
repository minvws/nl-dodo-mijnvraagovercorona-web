/** @jsx jsx */
import React from 'react';
import { Heading, Container, Image, jsx } from 'theme-ui';
import ExpandingInfoPanel from '../ExpandingInfoPanel';
import RoHeaderLogo from '../RoHeaderLogo';

type HeaderProps = {
    header: string,
    questionStage?: number,
    totalStages?: number,
    children?: React.ReactNode
};

const AdviceHeader = (props: HeaderProps) => {
    return (
        <header
            sx={{
                backgroundColor: 'headerBackground',
                fontFamily: 'heading',
                color: 'header',
                padding: '1em'
            }}>
            <RoHeaderLogo align='right'>
                { props.questionStage &&
                  <p>{props.questionStage}/{props.totalStages}</p>
                }
            </RoHeaderLogo>
            <Heading
                as='h2'
                sx={{
                    width: '60%',
                    fontSize: 29
                }}>
            {props.header}</Heading>
            { props.children }
        </header>
    );
};

export default AdviceHeader;
