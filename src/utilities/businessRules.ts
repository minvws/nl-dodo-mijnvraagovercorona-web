import { countries } from './locationData';

let allCountries = [...countries];

const orangeCountries = {
    a: [
        "Andorra",
        "Belgie",
        "Bulgarije",
        "Cyprus",
        "Denemarken",
        "Duitsland",
        "Estland",
        "Finland",
        "Frankrijk",
        "Griekenland",
        "Hongarije",
        "Italie",
        "Ierland",
        "Kroatie",
        "Letland",
        "Liechtenstein",
        "Litouwen",
        "Luxemburg",
        "Malta",
        "Monaco",
        "Noorwegen",
        "Oostenrijk",
        "Polen",
        "Portugal",
        "Roemenie",
        "San Marino",
        "Slovenie",
        "Slowakije",
        "Spanje",
        "Tsjechie",
        "Verenigd Koninkrijk",
        "Zweden",
        "Zwitserland",
        "Curacao"
    ],
    b: [
        "Finland",
        "IJsland",
        "Noorwegen",
        "Aruba",
        "Bonaire",
        "Saba",
        "St Eustacius",
        "St Maarten"
    ],
    c: [
        "Australië",
        "China",
        "Japan",
        "Nieuw-Zeeland",
        "Rwanda",
        "Singapore",
        "Zuid-Korea",
        "Thailand",
    ]
}

export interface RuleNote {
    conditions?: string[],
    title: string,
    time?: string,
    subTitle?: string,
    link?: string,
    linkType?: 'external' | 'faq' | undefined,
    linkHref?: string
};

export interface TravelSchemeEntry {
    title: string,
    date?: string,
    subTitle?: string,
    notes?: RuleNote[]
};

export interface Rule {
    countries: string[],
    quarantineRequired?: boolean,
    headerWarning: string,
    adviceMessages: string[],
    travelScheme: TravelSchemeEntry[]
};

export interface RuleBook {
    beforeTravel: Rule[],
    afterTravel: Rule[]
};

export const rules: RuleBook = {
    beforeTravel: [
        {
            countries: orangeCountries.a,
            headerWarning: "Je gaat naar een hoog risicogebied",
            adviceMessages: [
                "Tot 15 maart niet reizen. Maak alleen echt noodzakelijke reizen. Daar vallen vakanties bijvoorbeeld niet onder.",
                "Voor je terugreis naar Nederland heb je een negatieve testuitslag nodig.",
                "Bereid je goed voor om 10 dagen in thuisquarantaine te gaan na je reis. De situatie kan tijdens je reis veranderen."
            ],
            travelScheme: [
                {
                    title: "Voorbereiding",
                    date: "$$today",
                    subTitle: "Laat je niet verrassen",
                    notes: [
                        {
                            title: "Blijf op de hoogte van de laatste ontwikkelingen op je bestemming",
                            link: "Download de reisapp",
                            linkType: "external",
                            linkHref: ""
                        },
                        {
                            conditions: ["coronaMelderCountry"],
                            title: "Wist je dat de CoronaMelder ook werkt in $$country",
                            link: "Meer informatie",
                            linkType: "external",
                            linkHref: ""
                        }
                    ]
                },
                {
                    title: "Vertrek",
                    date: "$$fromDate",
                    subTitle: "$$destination",
                    notes: [
                        {
                            title: "Code $$colorCode",
                            time: "nu",
                            link: "Uitgebreid reisadvies",
                            linkType: "external",
                            linkHref: ""
                        },
                        {
                            title: "Laat je testen",
                            time: "max 72u voor vertrek",
                            subTitle: "Je mag alleen terugreizen met een negatieve testuitslag",
                            link: "Meer informatie",
                            linkType: "external",
                            linkHref: ""
                        }
                    ]
                },
                {
                    title: "Thuiskomst",
                    date: "$$toDate"
                }
            ]
        },
        {
            countries: orangeCountries.b,
            headerWarning: "Je gaat naar een risicogebied",
            adviceMessages: [
                "Tot 15 maart niet reizen. Maak alleen echt noodzakelijke reizen. Daar vallen vakanties bijvoorbeeld niet onder.",
                "Voor je terugreis naar Nederland heb je een negatieve testuitslag nodig.",
                "Je hoeft niet 10 dagen in thuisquarantaine na je reis. Deze situatie kan tijdens je reis veranderen"
            ],
            travelScheme: [
                {
                    title: "Voorbereiding",
                    date: "$$today",
                    subTitle: "Laat je niet verrassen",
                    notes: [
                        {
                            title: "Blijf op de hoogte van de laatste ontwikkelingen op je bestemming",
                            link: "Download de reisapp",
                            linkType: "external",
                            linkHref: ""
                        },
                        {
                            conditions: ["coronaMelderCountry"],
                            title: "Wist je dat de CoronaMelder ook werkt in $$country",
                            link: "Meer informatie",
                            linkType: "external",
                            linkHref: ""
                        }
                    ]
                },
                {
                    title: "Vertrek",
                    date: "$$fromDate",
                    subTitle: "$$destination",
                    notes: [
                        {
                            title: "Code $$colorCode",
                            time: "nu",
                            link: "Uitgebreid reisadvies",
                            linkType: "external",
                            linkHref: ""
                        },
                        {
                            title: "Laat je testen",
                            time: "max 72u voor vertrek",
                            subTitle: "Je mag alleen terugreizen met een negatieve uitslag",
                            link: "Meer informatie",
                            linkType: "external",
                            linkHref: ""
                        }
                    ]
                },
                {
                    title: "Thuiskomst",
                    date: "$$toDate"
                }
            ]
        },
        {
            countries: orangeCountries.c,
            headerWarning: "Je gaat naar een laagrisicogebied",
            adviceMessages: [
                "Tot 15 maart niet reizen. Maak alleen echt noodzakelijke reizen. Daar vallen vakanties bijvoorbeeld niet onder."
            ],
            travelScheme: [
                {
                    title: "Voorbereiding",
                    date: "$$today",
                    subTitle: "Laat je niet verrassen",
                    notes: [
                        {
                            title: "Blijf op de hoogte van de laatste ontwikkelingen op je bestemming",
                            link: "Download de reisapp",
                            linkType: "external",
                            linkHref: ""
                        },
                        {
                            conditions: ["coronaMelderCountry"],
                            title: "Wist je dat de CoronaMelder ook werkt in $$country",
                            link: "Meer informatie",
                            linkType: "external",
                            linkHref: ""
                        }
                    ]
                },
                {
                    title: "Vertrek",
                    date: "$$fromDate",
                    subTitle: "$$destination",
                    notes: [
                        {
                            title: "Code $$colorCode",
                            time: "nu",
                            link: "Uitgebreid reisadvies",
                            linkType: "external",
                            linkHref: ""
                        }
                    ]
                },
                {
                    title: "Thuiskomst",
                    date: "$$toDate"
                }
            ]
        },
        {
            countries: allCountries,
            quarantineRequired: true,
            headerWarning: "Je gaat naar een hoogrisicogebied",
            adviceMessages: [
                "Tot 15 maart niet reizen. Maak alleen echt noodzakelijke reizen. Daar vallen vakanties bijvoorbeeld niet onder.",
                "Voor je terugreis naar Nederland heb je een negatieve testuitslag en verklaring nodig.",
                "Bereid je goed voor om 10 dagen in thuisquarantaine te gaan na je reis. De situatie kan tijdens je reis veranderen."
            ],
            travelScheme: [
                {
                    title: "Voorbereiding",
                    date: "$$today",
                    subTitle: "Laat je niet verrassen",
                    notes: [
                        {
                            title: "Blijf op de hoogte van de laatste ontwikkelingen op je bestemming",
                            link: "Download de reisapp",
                            linkType: "external",
                            linkHref: ""
                        },
                        {
                            conditions: ["coronaMelderCountry"],
                            title: "Wist je dat de CoronaMelder ook werkt in $$country",
                            link: "Meer informatie",
                            linkType: "external",
                            linkHref: ""
                        }
                    ]
                },
                {
                    title: "Vertrek",
                    date: "$$fromDate",
                    subTitle: "$$destination",
                    notes: [
                        {
                            title: "Code $$colorCode",
                            time: "nu",
                            link: "Uitgebreid reisadvies",
                            linkType: "external",
                            linkHref: ""
                        },
                        {
                            title: "Laat je testen",
                            time: "max 72u voor vertrek",
                            subTitle: "Je mag alleen terugreizen met een negatieve uitslag",
                            link: "Meer informatie",
                            linkType: "external",
                            linkHref: ""
                        }
                    ]
                },
                {
                    title: "Thuiskomst",
                    date: "$$toDate",
                    subTitle: "Start 10 dagen thuisquarantaine",
                    notes: [
                         {
                            title: "Tot en met dag 6",
                            link: "Incubatietijd virus",
                            linkType: "faq",
                            linkHref: ""
                         },
                        {
                            title: "Tot en met dag 10",
                            link: "Mogelijk klachten",
                            linkType: "faq",
                            linkHref: ""
                         }
                    ]
                },
                {
                    title: "Einde thuisquarantaine",
                    date: "$$quarantineEndDate", // todo - make this more flexible
                }
            ]
        }
    ],
    afterTravel: [
        {
            countries: orangeCountries.a,
            quarantineRequired: true,
            headerWarning: "Je was in een hoogrisicogebied",
            adviceMessages: [
                "Er is een verhoogd risico dat je besmet bent geraakt.",
                "Voor je terugreis naar Nederland heb je een negatieve testuitslag nodig",
                "Het dringend advies is om 10 dagen in thuisquarantaine te gaan"
            ],
            travelScheme: [
                {
                    title: "Vertrek",
                    date: "$$fromDate",
                    subTitle: "$$destination",
                    notes: [
                        {
                            title: "$$colorCode reisadvies",
                            time: "Totale reisduur",
                            link: "Meer informatie",
                            linkType: "external",
                            linkHref: ""
                        },
                        {
                            conditions: ["arrivalInFuture"],
                            title: "Laat je testen",
                            time: "max 72u voor vertrek",
                            subTitle: "Je mag alleen terugreizen met een negatieve testuitslag",
                            link: "Meer informatie",
                            linkType: "external",
                            linkHref: ""
                        }
                    ]
                },
                {
                    title: "Thuiskomst",
                    date: "$$toDate",
                    subTitle: "Start 10 dagen thuisquarantaine",
                    notes: [
                        {
                            title: "Tot en met dag 6",
                            link: "Incubatietijd virus",
                            linkType: "faq",
                            linkHref: ""
                        },
                        {
                            title: "Tot en met dag 10",
                            link: "Mogelijk klachten",
                            linkType: "faq",
                            linkHref: ""
                         }
                    ]
                },
                {
                    title: "Einde thuisquarantaine",
                    date: "$$quarantineEndDate"
                }
            ]
        },
        {
            countries: orangeCountries.b,
            headerWarning: "Je was in een risicogebied",
            adviceMessages: [

                "Er is een verhoogd risico dat je besmet bent geraakt.",
                "Voor je terugreis naar Nederland heb je een negatieve testuitslag nodig",
                "Het dringend advies is om 10 dagen in thuisquarantaine te gaan"
            ],
            travelScheme: [
                {
                    title: "Vertrek",
                    date: "$$fromDate",
                    subTitle: "$$destination",
                    notes: [
                        {
                            title: "$$colorCode reisadvies",
                            time: "Totale reisduur",
                            link: "Meer informatie",
                            linkType: "external",
                            linkHref: ""
                        },
                        {
                            conditions: ["arrivalInFuture"],
                            title: "Laat je testen",
                            time: "max 72u voor vertrek",
                            subTitle: "Je mag alleen terugreizen met een negatieve testuitslag",
                            link: "Meer informatie",
                            linkType: "external",
                            linkHref: ""
                        }
                    ]
                },
                {
                    title: "Thuiskomst",
                    date: "$$toDate"
                }
            ]
        },
        {
            countries: orangeCountries.c,
            headerWarning: "Je was in een laagrisicogebied",
            adviceMessages: [
                "Er is een laag risico dat je besmet bent geraakt."
            ],
            travelScheme: [
                {
                    title: "Vertrek",
                    date: "$$fromDate",
                    subTitle: "$$destination",
                    notes: [
                        {
                            title: "$$colorCode reisadvies",
                            time: "Totale reisduur",
                            link: "Meer informatie",
                            linkType: "external",
                            linkHref: ""
                        }
                    ]
                },
                {
                    title: "Thuiskomst",
                    date: "$$toDate"
                }
            ]
        },
        {
            countries: allCountries,
            quarantineRequired: true,
            headerWarning: "Je was in een hoogrisicogebied",
            adviceMessages: [
                "Er is een verhoogd risico dat je besmet bent geraakt.",
                "Voor je terugreis naar Nederland heb je een negatieve testuitslag en verklaring nodig",
                "Het dringend advies is om 10 dagen in thuisquarantaine te gaan"
            ],
            travelScheme: [
                {
                    title: "Vertrek",
                    date: "$$fromDate",
                    subTitle: "$$destination",
                    notes: [
                        {
                            title: "$$colorCode reisadvies",
                            time: "Totale reisduur",
                            link: "Meer informatie",
                            linkType: "external",
                            linkHref: ""
                        },
                        {
                            conditions: ["arrivalInFuture"],
                            title: "Laat je testen",
                            time: "max 72u voor vertrek",
                            subTitle: "Je mag alleen terugreizen met een negatieve testuitslag",
                            link: "Meer informatie",
                            linkType: "external",
                            linkHref: ""
                        }
                    ]
                },
                {
                    title: "Thuiskomst",
                    date: "$$toDate",
                    subTitle: "Start 10 dagen thuisquarantaine",
                    notes: [
                        {
                            title: "Tot en met dag 6",
                            link: "Incubatietijd virus",
                            linkType: "faq",
                            linkHref: ""
                        },
                        {
                            title: "Tot en met dag 10",
                            link: "Mogelijk klachten",
                            linkType: "faq",
                            linkHref: ""
                         }
                    ]
                },
                {
                    title: "Einde thuisquarantaine",
                    date: "$$quarantineEndDate"
                }
            ]
        }
    ]
}
