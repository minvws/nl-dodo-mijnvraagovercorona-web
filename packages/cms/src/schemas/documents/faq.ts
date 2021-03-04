export default {
  title: "FAQ Documenten",
  name: "faq-document",
  type: "document",
  fields: [
    {
      title: "Referentie",
      name: "reference",
      type: "string",
    },
    {
      title: "Reisfase",
      name: "reisfase",
      type: "string",
      options: {
        list: [
          {
            title: "Voorbereiding",
            value: "voorbereiding",
          },
          {
            title: "Tijdens de reis",
            value: "tijdensDeReis",
          },
          {
            title: "Thuiskomst",
            value: "thuiskomst",
          },
        ],
      },
    },
    {
      title: "Vraag",
      name: "vraag",
      type: "localeString",
    },
    {
      title: "Antwoord",
      name: "antwoord",
      type: "localeBlock",
    },
    {
      title: "Volgorde",
      name: "order",
      type: "number",
      hidden: true,
    },
  ],
  orderings: [
    {
      title: "Volgorde",
      name: "order",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "vraag.nl",
      subtitle: "antwoord.nl",
    },
  },
};
