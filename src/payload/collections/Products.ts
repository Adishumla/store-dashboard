import { CollectionConfig } from "payload/types";
import { isAdminFieldAccess } from "../access/isAdmin";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

const Products: CollectionConfig = {
  slug: "products",
  access: {
    create: isAdminFieldAccess,
    read: () => true,
    update: isAdminFieldAccess,
    delete: isAdminFieldAccess,
  },
  admin: {
    useAsTitle: "title",
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
      required: true,
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
    {
      name: "discountPercentage",
      type: "number",
      label: "Discount Percentage",
      admin: {
        description: "Enter the discount percentage (without the % symbol).",
      },
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Out of Stock", value: "out-of-stock" },
        { label: "Discontinued", value: "discontinued" },
      ],
      defaultValue: "active",
      required: true,
      label: "Product Status",
      admin: {
        description: "Select the current status of the product.",
      },
    },
    {
      name: "variations",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "size",
          type: "relationship",
          relationTo: "size",
          required: true,
        },
        {
          name: "color",
          type: "relationship",
          relationTo: "colors",
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
      type: "relationship",
      relationTo: "fabrics",
      required: false,
    },
    {
      name: "gender",
      type: "select",
      options: [
        { label: "unisex", value: "unisex" },
        { label: "men", value: "men" },
        { label: "women", value: "women" },
      ],
      defaultValue: "unisex",
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
