/** @jsx jsx */
import React, { useState } from 'react';
import { jsx, Link, Image, Container } from 'theme-ui';
import DayPicker, { DateUtils } from 'react-day-picker';
import { useDesktopQuery } from 'hooks/useDesktopQuery';
import { formatShortDate } from 'utilities/dateUtils';
import BodyContainer from 'components/BodyContainer';
import 'react-day-picker/lib/style.css';

type PeriodSelectProps = {
    city?: string,
    country: string,
    onUpdate: (from: Date, to?: Date) => void
}

type Range = {
    from?: Date,
    to?: Date
}

const PeriodSelect = (props: PeriodSelectProps) => {
    const isDesktop = useDesktopQuery();

    const [range, setRange] = useState<Range>({});

    const handleDayClick = (day: any) => {
        if (!range.from) {
            setRange({from: day})
        } else {
            if (day.toLocaleDateString() === range.from.toLocaleDateString()) {
                // unset the range
                setRange({});
            } else if (day.getTime() > range.from.getTime()) {
                setRange({from: range.from, to: day});

                props.onUpdate(range.from, day);
            } else {
                setRange({from: day, to: range.from});
                props.onUpdate(day, range.from);
            }
        }

    };

    const modifiers = (range.from && range.to) ? { start: range.from, end: range.to } : {start: range.from, end: range.from};

    const rangeMessage =  !range.from ? "Kies een datum"
             : !range.to ? formatShortDate(range.from) + " tot ..."
             : formatShortDate(range.from) + " tot " + formatShortDate(range.to);

    return (
        <>
            <Container
                sx={{
                    backgroundColor: 'roHighlight',
                    textAlign: 'center',
                    color: 'white',
                    paddingTop: '0.1em',
                    paddingRight: [0, '300px', '400px']
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
                    { props.city &&
                      <span>{props.city}, </span>}
                    <span sx={{fontWeight: 'normal'}}>{props.country}</span>
                </h3>
                <h5 sx={{
                    fontSize: '14pt',
                    fontWeight: 'normal',
                    marginTop: '0.1em',
                    paddingTop: 0,
                    paddingBottom: '0.9em'
                }}>{rangeMessage}</h5>
            </Container>
            <BodyContainer>
                <DayPicker
                    sx={{
                        width: '100%',
                        '.DayPicker-Month': {
                            width: isDesktop ? '45%' : '100%'
                        }
                    }}
                    locale="nl"
                    firstDayOfWeek={1}
                    className="Selectable"
                    fixedWeeks={true}
                    showOutsideDays={true}
                    numberOfMonths={isDesktop ? 2 : 1}
                    selectedDays={[range.from, range.to]}
                    modifiers={modifiers}
                    onDayClick={handleDayClick}
                />
            </BodyContainer>
        </>
    )
}

export default PeriodSelect;
