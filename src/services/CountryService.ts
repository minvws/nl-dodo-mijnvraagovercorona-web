import { cities, euCountries, schengenCountries } from '../utilities/locationData';

const MAX_SEARCH_RESULTS = 10;

export enum ColorCode {
    Green,
    Yellow,
    Orange,
    Red,
}

export interface Country {
    name: string,
    isEuropeanUnion: boolean,
    isSchengen: boolean,
    colorCode: ColorCode,
}

export interface Destination {
    city: string,
    country: Country,
}

const isEuCountry = (countryName: string) =>  euCountries.includes(countryName);

const isSchengenCountry = (countryName: string) => schengenCountries.includes(countryName);

export const searchCities = (query: String): Destination[] => {
    const startMatching = Object.keys(cities)
        .filter(city => city.toLowerCase().startsWith(query.toLowerCase()))
        .slice(0, MAX_SEARCH_RESULTS + 1);

    return startMatching
        .map(key => {
            const cityName = cities[key].length > 0 ? key : "";
            const countryName = cities[key].length > 0 ? cities[key] : key;
            return {
                city: cityName,
                country: {
                    name: countryName,
                    isEuropeanUnion: isEuCountry(countryName),
                    isSchengen: isSchengenCountry(countryName),
                    colorCode: ColorCode.Orange
               }
           };
        });
}
