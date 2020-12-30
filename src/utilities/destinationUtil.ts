import staticDestinations from './destinations';

export type destination = {
    city: string,
    country: string
};

const searchDestination = function(query: string): destination[] {
    const unique = [...new Set(staticDestinations.values)]; // [ 'A', 'B']
    console.log(unique);
    return staticDestinations.filter(dest => {
        return dest.country.toLowerCase().indexOf(query.toLowerCase()) >= 0
            || dest.city.toLowerCase().indexOf(query.toLowerCase()) >= 0
    });
};

export default searchDestination;
