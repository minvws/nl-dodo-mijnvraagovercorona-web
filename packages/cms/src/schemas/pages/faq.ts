export default {
  title: "FAQ Pagina",
  name: "faq-page",
  type: "document",
  fields: [
    {
      title: "Meta data",
      name: "metaData",
      type: "pageMetaData",
    },
    {
      title: "Titel",
      name: "title",
      type: "localeString",
    },
    {
      title: "Fases",
      name: "stages",
      type: "object",
      options: { collapsible: true },
      fields: [
        {
          title: "Voorbereiding",
          name: "voorbereiding",
          type: "localeString",
        },
        {
          title: "Tijdens de reis",
          name: "tijdens",
          type: "localeString",
        },
        {
          title: "Thuiskomst",
          name: "thuiskomst",
          type: "localeString",
        },
      ],
    },
    {
      title: "URL",
      name: "url",
      type: "string",
    },
  ],
};
