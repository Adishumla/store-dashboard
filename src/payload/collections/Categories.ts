import { CollectionConfig } from "payload/types";
import { isAdmin, isAdminFieldAccess } from "../access/isAdmin";
import {
  isAdminOrSelf,
  isAdminOrSelfFieldAccess,
} from "../access/isAdminOrSelf";

const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "title",
  },
  labels: {
    singular: "Category",
    plural: "Categories",
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
  ],
};

export default Categories;
