/** @jsx jsx */
import React, { useState } from 'react';
import { jsx, Container } from 'theme-ui';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

type PeriodSelectProps = {
    city: string,
    country: string
}

type PeriodSelectState = {
    from: any,
    to: any
}

class PeriodSelect extends React.Component<PeriodSelectProps, PeriodSelectState> {

    constructor(props: PeriodSelectProps) {
        super(props);
        this.state = {
             from: undefined,
             to: undefined,
         }

        this.handleDayClick = this.handleDayClick.bind(this);
    }

    handleDayClick(day: any) {

        if (this.state.to)  {
            const range = DateUtils.addDayToRange(day, {...this.state});
            this.setState(range);
        }
    }

    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };
        const rangeMessage = !from ? "Kies een datum"
            : !to ? from.toLocaleDateString() + " tot ..."
            : from.toLocaleDateString() + " tot " + to.toLocaleDateString()
        return (
            <>
                <Container
                    sx={{
                        backgroundColor: 'roHighlight',
                        textAlign: 'center',
                        color: 'white'
                    }}
                >
                    <h4><em>{this.props.city}</em>, {this.props.country}</h4>
                    <h5>{rangeMessage}</h5>
                </Container>
                <Container>
                    <DayPicker
                        className="Selectable"
                        fixedWeeks={true}
                        showOutsideDays={true}
                        numberOfMonths={1}
                        selectedDays={[from, { from, to }]}
                        modifiers={modifiers}
                        onDayClick={this.handleDayClick}
                    />
                </Container>
            </>
        );
    }
};

export default PeriodSelect;
