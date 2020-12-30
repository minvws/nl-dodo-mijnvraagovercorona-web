import { euCountries, ColorCode } from '../utilities/locationData';


class Country {
    name: string;
    colorCode: ColorCode;
    isEuropeanUnion: boolean;
    isSchengen: boolean;
};

type DateRange = {
    from: Date,
    to: Date
};

class Advice {
    destination: Country;
    dateRange: DateRange;

    constructor(countryName: string, dateFrom: Date, dateTo: Date) {

    }

};
