const SEGMENT_SEPARATOR = '~';
const DESTINATION_SEPARATOR = '_';

export function formatDestination(destination: string): string {
    if (destination.indexOf(',') < 0 || destination.length < 3) {
        throw new Error("Destination is incorrectly formatted");
    }

    const [city, country] = destination.split(',');

    const encodeSegment = (input: string) => encodeURIComponent(input.trim().replace(/\s/g, DESTINATION_SEPARATOR));
    //const encodeSegment = (input: string) => encodeURIComponent(input.trim());

    return `${encodeSegment(city)}${SEGMENT_SEPARATOR}${encodeSegment(country)}`;
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
