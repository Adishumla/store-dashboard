import { CollectionConfig } from "payload/types";
import { isAdminFieldAccess } from "../access/isAdmin";

const Products: CollectionConfig = {
  slug: "products",
  access: {
    create: isAdminFieldAccess,
    read: () => true,
    update: isAdminFieldAccess,
    delete: isAdminFieldAccess,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
    /* just take total from sizes stock maybe? */
    /* {
      name: "stock",
      type: "number",
      required: true,
    }, */
    /* get from variations */
    /* {
      name: "colors",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "color",
          type: "text",
          required: true,
        },
      ],
    }, */
    {
      name: "variations",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "size",
          type: "text",
          required: true,
        },
        {
          name: "color",
          type: "text",
          required: true,
        },
        {
          name: "stock",
          type: "number",
          required: true,
        },
      ],
    },
    {
      name: "fabric",
      type: "text",
      required: true,
    },

    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
      required: true,
    },
    {
      name: "subCategory",
      type: "relationship",
      relationTo: "subCategories",
      hasMany: false,
    },
    /* {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    }, */
    {
      name: "images",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
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
      ],
    },
  ],
};

export default Products;
