const SEGMENT_SEPARATOR = '~';
const DESTINATION_SEPARATOR = '_';

export function formatDestination(destination: string): string {
    const encodeSegment = (input: string) => encodeURIComponent(input.trim().replace(/\s/g, DESTINATION_SEPARATOR));
    if (destination.indexOf(',') > 0) {
        const [city, country] = destination.split(',');

        return `${encodeSegment(city)}${SEGMENT_SEPARATOR}${encodeSegment(country)}`;
    }
    return encodeSegment(destination);
}

export function parseDestination(pathFormatted: string): [string, string?] {
    if (pathFormatted.length === 0) {
        return ['', undefined];
    }

    if (pathFormatted.indexOf(SEGMENT_SEPARATOR) < 0) {
        return [pathFormatted, undefined];
    }

    const citySegment = pathFormatted.slice(0, pathFormatted.lastIndexOf(SEGMENT_SEPARATOR));
    const countrySegment = pathFormatted.slice(pathFormatted.lastIndexOf(SEGMENT_SEPARATOR) + 1)
        .split(SEGMENT_SEPARATOR).join('');

    //const decodeSegment = (segment: string) => decodeURIComponent(segment)
       //.replace(/[^\p{Letter}\s]/ug, '');
    const decodeSegment = (segment: string) => decodeURIComponent(segment).split(DESTINATION_SEPARATOR).join(' ');


    return [decodeSegment(countrySegment), decodeSegment(citySegment)];
};

export function formatPeriod(fromDate: Date, toDate: Date): string {
    const fromStr = fromDate.toISOString().substr(0, 10);
    const toStr = toDate.toISOString().substr(0, 10);

    return `${fromStr}${SEGMENT_SEPARATOR}${toStr}`;
}

export function parsePeriod(periodStr: string): [Date, Date] {
    if (periodStr.indexOf(SEGMENT_SEPARATOR) < 0 || periodStr.length < 21) {
        throw new Error("Date range is invalid");
    }

    const [fromDateStr, toDateStr] = periodStr.split(SEGMENT_SEPARATOR);
    const dateStrToDate = (input: string) => new Date(Date.parse(input));

    return [dateStrToDate(fromDateStr), dateStrToDate(toDateStr)];
}
