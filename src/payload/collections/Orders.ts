// src/collections/Orders.ts
import { CollectionConfig } from "payload/types";
import { isAdmin, isAdminFieldAccess } from "../access/isAdmin";
import {
  isAdminOrSelf,
  isAdminOrSelfFieldAccess,
} from "../access/isAdminOrSelf";

const Orders: CollectionConfig = {
  slug: "orders",
  access: {
    create: ({ req: { user } }) => !!user,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: "user",
      /* becuase users is deleted each startup */
      //type: "relationship",
      //relationTo: "users",
      type: "text",
      required: true,
      access: {
        create: isAdminFieldAccess,
        update: isAdminFieldAccess,
      },
    },
    {
      name: "shippingAddress",
      type: "textarea",
      required: true,
    },
    {
      name: "billingAddress",
      type: "textarea",
      required: true,
    },
    {
      name: "shippingMethod",
      type: "select",
      options: [
        { label: "Standard", value: "standard" },
        { label: "Express", value: "express" },
      ],
      defaultValue: "standard",
      required: true,
    },
    {
      name: "city",
      type: "text",
      required: true,
    },
    {
      name: "orderDate",
      type: "date",
      required: true,
      defaultValue: new Date(),
    },
    {
      name: "items",
      type: "array",

      fields: [
        {
          name: "product",
          type: "relationship",
          relationTo: "products",
          required: true,
        },
        {
          name: "quantity",
          type: "number",
          required: true,
        },
        {
          name: "variationId",
          type: "number",
          required: true,
        },
      ],

      required: true,
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Processed", value: "processed" },
        { label: "Shipped", value: "shipped" },
        { label: "Delivered", value: "delivered" },
        { label: "Cancelled", value: "cancelled" },
      ],
      defaultValue: "pending",
      required: true,
    },
    {
      name: "total",
      type: "number",
      required: true,
      /* admin: {
        readOnly: true,
      }, */
      // This field can be automatically calculated before saving the order based on the item prices and quantities
      /*  hooks: {
        beforeChange: [
          async ({ data, req }) => {
            let total = 0;
            if (data?.items) {
              data.items.forEach((item: any) => {
                total += item.price * item.quantity;
              });
              data.total = total;
            }
            return data;
          },
        ],
      }, */
    },
    // Add any additional fields that may be relevant for an order
  ],
};

export default Orders;
