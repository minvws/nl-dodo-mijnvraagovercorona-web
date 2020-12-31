import { rules, Rule } from 'utilities/businessRules';
import { addDays, formatShortDate } from 'utilities/dateUtils';

const injectDynamicValues = (rule: Rule,
                             countryName: string,
                             fromDate: Date, toDate: Date,
                             destination?: string,): Rule => {
    let serialized = JSON.stringify(rule);

    const replacements = new Map([
        [/\$\$today/g, formatShortDate(new Date())],
        [/\$\$fromDate/g, formatShortDate(fromDate)],
        [/\$\$toDate/g, formatShortDate(toDate)],
        [/\$\$country/g, countryName],
        [/\$\$destination/g, destination || ''],
        [/\$\$quarantineEndDate/g, formatShortDate(addDays(toDate, 10))]
    ]);

    for (let [pattern, replacement] of replacements.entries()) {
        serialized = serialized.replace(pattern, replacement);
    }

    return JSON.parse(serialized);
}

export const getAdvice = (countryName: string,
                          dateFrom: Date, dateTo: Date,
                          destination?: string,): Rule => {

    const ruleSection = Date.now() < dateFrom.getTime() ?
        rules.beforeTravel : rules.afterTravel

    const firstMatch = Object.values(ruleSection)
        .find(ruleConfig => {
            return ruleConfig.countries
                && ruleConfig.countries.includes(countryName)
        });
    if (!firstMatch) {
        throw new Error("No matching rule config found for " + countryName);
    }

    return injectDynamicValues(firstMatch, countryName, dateFrom, dateTo, destination);
};
