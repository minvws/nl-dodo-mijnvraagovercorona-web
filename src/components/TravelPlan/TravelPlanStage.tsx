/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { formatShortDate } from 'utilities/dateUtils';

type TravelPlanStageProps = {
    title: string,
    subHeading?: string,
    date: Date,
    children?: React.ReactNode
};

const TravelPlanStage = (props: TravelPlanStageProps) => {
    return (
        <>
            <h3>{props.title}</h3>
            <h4 sx={{
                paddingTop: '1em',
                float: 'right',
                fontSize: '14pt',
                textAlign: 'right',
                marginRight: '1em',
                marginTop: '-2em'
            }}>{formatShortDate(props.date)}</h4>
            {props.subHeading && <h4 sx={{
                fontWeight: 'normal',
                fontSize: '14pt',
                marginTop: 0
            }}>{props.subHeading}</h4>}
            {props.children}
        </>
    );
};

export default TravelPlanStage;
