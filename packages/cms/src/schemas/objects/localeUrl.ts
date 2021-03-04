import { supportedLocales, Locale } from "../../utilities/locales";

export default {
  title: "URL met vertalingen",
  name: "localeURL",
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
    validation: (Rule: any) =>
      Rule.custom((duration: string, context: { parent: { nl: string } }) => {
        if (!duration && context.parent.nl) {
          return "Engelse variant vergeten";
        }

        return true;
      }),
    type: "url",
    fieldset: locale.isDefault ? null : "translations",
  })),
};
