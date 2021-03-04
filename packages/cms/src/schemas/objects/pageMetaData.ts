export default {
  title: "Page meta data",
  name: "pageMetaData",
  type: "object",
  fields: [
    { title: "Titel", name: "title", type: "localeString" },
    { title: "Omschrijving", name: "description", type: "localeString" },
    {
      title: "Geen geldig zoekresultaat",
      name: "noIndex",
      type: "boolean",
      description:
        "Als deze toggle aan staat zal de pagina niet geindexeerd worden door Google.",
    },
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
};
