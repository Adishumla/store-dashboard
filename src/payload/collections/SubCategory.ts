import { CollectionConfig } from "payload/types";
import { isAdmin, isAdminFieldAccess } from "../access/isAdmin";
import {
  isAdminOrSelf,
  isAdminOrSelfFieldAccess,
} from "../access/isAdminOrSelf";

const SubCategories: CollectionConfig = {
  slug: "subCategories",
  admin: {
    useAsTitle: "title",
  },
  labels: {
    singular: "SubCategory",
    plural: "SubCategories",
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

export default SubCategories;
