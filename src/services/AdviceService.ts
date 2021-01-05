import { Country } from 'config/countries';
import { rules, Rule, RuleNote, TravelSchemeEntry } from 'utilities/businessRules';
import { addDays, formatShortDate } from 'utilities/dateUtils';

export type Advice = {
    countryName: string,
    destination?: string,
    colorCode: string,
    fromDate: Date,
    toDate: Date,
    headerWarning: string,
    adviceMessages: string[],
    travelScheme: TravelSchemeEntry[],
    checkReminderInvite?: Date,
    quarantineInvite?: Date
};

const injectDynamicValues = (advice: Advice): Advice => {
    let serialized = JSON.stringify(advice);

    const replacements = new Map([
        [/\$\$today/g, formatShortDate(new Date())],
        [/\$\$fromDate/g, formatShortDate(advice.fromDate)],
        [/\$\$toDate/g, formatShortDate(advice.toDate)],
        [/\$\$country/g, advice.countryName],
        [/\$\$destination/g, advice.destination || ''],
        [/\$\$quarantineEndDate/g, formatShortDate(addDays(advice.toDate, 10))],
        [/\$\$colorCode/g, advice.colorCode]
    ]);

    for (let [pattern, replacement] of replacements.entries()) {
        serialized = serialized.replace(pattern, replacement);
    }

    return JSON.parse(serialized);
};

type ConditionParams = {
    country: Country,
    toDate: Date,
}

const conditionsPass = (note: RuleNote, params: ConditionParams) => {
    if (!note.conditions) {
        return true;
    }

    const conditionFunctions = new Map([
        ['coronaMelderCountry', (params: ConditionParams) => params.country.coronaMelderCountry],
        ['arrivalInFuture', (params: ConditionParams) => Date.now() < params.toDate.getTime()]
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

export const getRule = (country: Country,dateFrom: Date): Rule => {
    const ruleSection = Date.now() < dateFrom.getTime() ?
        rules.beforeTravel : rules.afterTravel

    const firstMatch = Object.values(ruleSection)
        .find(ruleConfig => {
            return ruleConfig.countries
                && ruleConfig.countries.includes(country.fullName)
        });
    if (!firstMatch) {
        throw new Error("No matching rule config found for " + country.fullName);
    }

    return firstMatch;
};

export const getAdvice = (country: Country,
                          dateFrom: Date, dateTo: Date,
                          destination?: string): Advice => {
    const rule = getRule(country, dateFrom);

    // filter out notes not matching all conditions
    rule.travelScheme.forEach(travelStage => {
        if (travelStage.notes) {
            const filteredNotes = travelStage.notes.filter(note => {
                return conditionsPass(note, {
                    country, toDate: dateTo});
            });
            travelStage.notes = filteredNotes;
        }
    });

    const oneWeekBeforeDeparture = addDays(dateFrom, -7);

    const checkReminderInvite = oneWeekBeforeDeparture.getTime() > Date.now() ?
        oneWeekBeforeDeparture : undefined;

    const quarantineEnd = addDays(dateTo, 10);
    const quarantineInvite = (rule.quarantineRequired && Date.now() < quarantineEnd.getTime())
        ? quarantineEnd : undefined;


    const advice = {
        countryName: country.fullName,
        destination: destination,
        colorCode: 'Oranje',
        fromDate: dateFrom,
        toDate: dateTo,
        headerWarning: rule.headerWarning,
        adviceMessages: rule.adviceMessages,
        travelScheme: rule.travelScheme,
        checkReminderInvite: checkReminderInvite,
        quarantineInvite: quarantineInvite
    };
    return injectDynamicValues(advice);
}
