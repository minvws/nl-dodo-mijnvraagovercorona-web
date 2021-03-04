import { supportedLocales, Locale } from "../../utilities/locales";

export default {
  title: "Text met vertalingen",
  name: "localeText",
  type: "object",
  fieldsets: [
    {
      title: "Vertalingen",
      name: "translations",
      options: { collapsible: true },
    },
  ],
  fields: supportedLocales.map((locale: Locale) => ({
    title: locale.title,
    name: locale.id,
    type: "text",
    validation: (Rule: any) =>
      Rule.custom((duration: string, context: { parent: { nl: string } }) => {
        if (!duration && context.parent.nl) {
          return "Engelse vertaling vergeten";
        }

        return true;
      }),
    rows: 5,
    fieldset: locale.isDefault ? null : "translations",
  })),
};
