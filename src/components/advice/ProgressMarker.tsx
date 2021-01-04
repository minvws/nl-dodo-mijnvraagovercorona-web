/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

type ProgressMarkerProps = {
    stage: number,
    totalStages: number
}

const ProgressMarker = (props: ProgressMarkerProps) => {
    const rangeArr = [...Array(props.totalStages).keys()];
    return (
        <ul sx={{
            position: 'absolute',
            top: ['25px', '150px'],
            paddingTop: 0,
            marginTop: 0,
            paddingLeft: 0,
            fontSize: '16px',
            fontWeight: 'bold'
        }}>

            {rangeArr.map(index => {
                const stageNumber = index + 1;
                const isCurrentStage = stageNumber === props.stage;
                const isPastStage = stageNumber < props.stage;
                let background =  'white';

                if (isCurrentStage) {
                    background = 'button';
                }
                if (isPastStage) {
                    background = '#AEC1D1';
                }

                return (
                    <li sx={{
                        display: 'inline-block',
                        backgroundColor: background,
                        color: isCurrentStage ? 'white' : 'header',
                        borderRadius: '50%',
                        width: '35px',
                        height: '34px',
                        padding: '8px',
                        textAlign: 'center',
                        marginRight: '25px'
                    }}
                        key={stageNumber}>{stageNumber}</li>
                )
            })}
        </ul>
    )
};

export default ProgressMarker;
