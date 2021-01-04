/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import ExpansionPanel from 'components/structure/ExpansionPanel';

type FaqItemProps = {
    title: string,
    children: React.ReactNode
}

const FaqItem = ({ title, children }: FaqItemProps) => {
    return (
        <ExpansionPanel text={title}>
            { children }
        </ExpansionPanel>
    );
};

export default FaqItem;
