export default {
  title: "GGD Contact Documenten",
  name: "ggd-contact-document",
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
      type: "string",
    },
    {
      title: "Button",
      name: "button",
      type: "object",
      fields: [
        {
          title: "Button tekst",
          name: "buttonText",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          title: "Overlay tekst",
          name: "overlayText",
          type: "array",
          of: [{ type: "block" }],
        },
        { title: "Button link", name: "buttonLink", type: "url" },
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      title: "Agenda uitnodiging",
      name: "calendarInvite",
      type: "object",
      fields: [
        { title: "Agenda sectie titel", name: "calendarTitle", type: "string" },
        {
          title: "Agenda modal titel",
          name: "calendarModalTitle",
          type: "string",
        },
        {
          title: "Agenda modal content",
          name: "calendarModalContent",
          type: "string",
        },
        {
          title: "Agenda uitnodiging titel",
          name: "calendarInviteTitle",
          type: "string",
        },
        {
          title: "Agenda uitnodiging tekst",
          name: "calendarInviteText",
          type: "string",
        },
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      title: "Telefoon tekst",
      name: "phoneText",
      type: "array",
      of: [{ type: "block" }],
    },

    {
      title: "Privacy statement",
      name: "privacyStatement",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "reference",
      subtitle: "title",
    },
  },
};
