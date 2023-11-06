import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";

const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Media",
    plural: "Media",
  },
  access: {
    create: isAdmin,
    read: () => true, // public read access
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    {
      name: "imageUrl",
      type: "text",
      label: "Image URL",
      required: true,
    },
    {
      name: "altText",
      type: "text",
      label: "Alt Text",
      admin: {
        position: "sidebar",
      },
    },

    // Additional fields for categorization, tags, etc., can be added here
  ],
  // Additional configuration for file storage, hooks, etc.
};

export default Media;
