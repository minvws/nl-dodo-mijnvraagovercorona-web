export default {
  title: "Reisschema Documenten",
  name: "reis-schema-document",
  type: "document",
  fields: [
    {
      title: "Referentie",
      name: "reference",
      type: "string",
    },
    {
      title: "Titel",
      name: "title",
      type: "localeString",
    },
    {
      title: "Sub Title",
      name: "subtitle",
      type: "localeString",
    },
    {
      title: "Body",
      name: "body",
      type: "localeString",
    },
    {
      title: "Link",
      name: "link",
      type: "object",
      fields: [
        { title: "Text", name: "text", type: "localeString" },
        { title: "URL", name: "url", type: "localeURL" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title.nl",
      subtitle: "body.nl",
    },
  },
};
