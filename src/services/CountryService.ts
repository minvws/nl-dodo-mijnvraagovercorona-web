import { cities } from '../utilities/locationData';

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
    colorCode: ColorCode,
}

export interface Destination {
    city: string,
    country: Country,
}

export function searchCities(query: String): Destination[] {
    // 1. find matches where city name starts with query
    const startMatching = Object.keys(cities)
        .filter(city => city.toLowerCase().startsWith(query.toLowerCase()))
        .slice(0, MAX_SEARCH_RESULTS + 1);

    // 2. find
    // TODO

    // 3. map to Destination objects

    return startMatching
        .map(key => {
           return {
               city: key,
               country: {
                   name: cities[key],
                   isEuropeanUnion: false,
                   colorCode: ColorCode.Orange
               }
           };
        });
}
