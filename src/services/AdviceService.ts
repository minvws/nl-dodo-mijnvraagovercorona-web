import { rules, Rule, RuleNote } from 'utilities/businessRules';
import { addDays, formatShortDate } from 'utilities/dateUtils';
import { coronaMelderCountries } from 'utilities/locationData';

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
};

type ConditionParams = {
    countryName: string
}

const conditionsPass = (note: RuleNote, params: ConditionParams) => {
    if (!note.conditions) {
        return true;
    }

    const conditionFunctions = new Map([
        ['coronaMelderCountry', (params: ConditionParams) => coronaMelderCountries.includes(params.countryName)]
    ]);

    for (let condition of note.conditions) {
        if (conditionFunctions.has(condition)) {
            if (!conditionFunctions.get(condition)?.apply(this, [params])) {
                return false;
            }
        }
    }

    return true;
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

    const interpolated = injectDynamicValues(firstMatch, countryName, dateFrom, dateTo, destination);

    // filter out notes not matching all conditions
    interpolated.travelScheme.forEach(travelStage => {
        if (travelStage.notes) {
            const filteredNotes = travelStage.notes.filter(note => {
                return conditionsPass(note, { countryName: countryName});
            });
            travelStage.notes = filteredNotes;
        }
    });

    return interpolated;
};
