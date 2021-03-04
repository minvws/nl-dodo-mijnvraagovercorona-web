export default {
  title: "Voorbereiding Documenten",
  name: "voorbereiding-document",
  type: "document",
  fields: [
    {
      title: "Titel",
      name: "title",
      type: "localeString",
    },
    {
      title: "Omschrijving",
      name: "description",
      type: "localeString",
    },
    {
      title: "Onderdelen",
      name: "items",
      type: "array",
      of: [
        {
          title: "Onderdeel",
          name: "item",
          type: "object",
          preview: {
            select: {
              title: "title.nl",
              subtitle: "description.nl",
            },
          },
          fields: [
            {
              title: "Titel",
              name: "title",
              type: "localeString",
            },
            {
              title: "Omschrijving",
              name: "description",
              type: "localeText",
            },
          ],
        },
      ],
    },
    {
      title: "Afbeelding",
      name: "image",
      type: "image",
    },
    {
      name: "order",
      title: "Volgorde",
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
      title: "title.nl",
      media: "image",
    },
  },
};
