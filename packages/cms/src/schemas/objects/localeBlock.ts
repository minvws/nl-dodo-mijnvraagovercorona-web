import { supportedLocales, Locale } from "../../utilities/locales";

import { FiLink } from "react-icons/fi";

export default {
  title: "Content met vertalingen",
  name: "localeBlock",
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
    type: "array",
    validation: (Rule: { required: () => void }) => Rule.required(),
    of: [
      {
        type: "block",
        marks: {
          annotations: [
            {
              name: "link",
              type: "object",
              title: "Link",
              blockEditor: {
                icon: FiLink,
              },
              fields: [
                { name: "href", type: "string" },
                { name: "internal", type: "boolean" },
              ],
            },
          ],
        },
      },
    ],
    fieldset: locale.isDefault ? null : "translations",
  })),
};
