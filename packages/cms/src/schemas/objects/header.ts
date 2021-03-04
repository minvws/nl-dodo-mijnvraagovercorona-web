export default {
  title: "Header",
  name: "header",
  type: "object",
  fields: [
    {
      title: "Titel",
      name: "title",
      type: "localeString",
    },
    {
      title: "Modal",
      name: "modal",
      type: "object",
      fields: [
        {
          title: "Link",
          name: "link",
          type: "localeString",
        },
        {
          title: "Titel",
          name: "title",
          type: "localeString",
        },
        {
          title: "Tekst",
          name: "text",
          type: "localeText",
        },
      ],
    },
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
};
