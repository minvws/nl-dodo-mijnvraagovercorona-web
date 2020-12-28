/** @jsx jsx */
import React, { useState } from 'react';
import { jsx, Link, Image, Container } from 'theme-ui';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

type PeriodSelectProps = {
    city?: string,
    country: string,
    onUpdate: (from: Date, to: Date) => void
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
        if (!this.state.from) {
            this.setState( { from: day } );
        } else {
            this.setState( { to: day } );
            this.props.onUpdate(this.state.from, day);
        }
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
                        color: 'white',
                        paddingTop: '0.1em'
                    }}>
                    <Link href="/advice" sx={{
                        position: 'absolute',
                        left: '1em',
                        marginTop: '1em',
                        color: 'white'
                    }}>
                        <Image src="/icons/Back Arrow Big.svg" />
                    </Link>
                    <h3 sx={{
                        fontSize: '15pt',
                        paddingTop: 0,
                        marginTop: '0.5em',
                        marginBottom: '0.4em'
                    }}>
                        { this.props.city &&
                          <span>{this.props.city}, </span>}
                        <span sx={{fontWeight: 'normal'}}>{this.props.country}</span>
                    </h3>
                    <h5 sx={{
                        fontSize: '14pt',
                        fontWeight: 'normal',
                        marginTop: '0.1em',
                        paddingTop: 0,
                        paddingBottom: '0.9em'
                    }}>{rangeMessage}</h5>
                </Container>
                <Container>
                    <DayPicker
                        sx={{
                            width: '100%',
                            padding: '1em',
                            '.DayPicker-Month': {
                                width: '100%'
                            }
                        }}
                        locale="nl"
                        firstDayOfWeek={1}
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
