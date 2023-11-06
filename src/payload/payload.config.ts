import path from "path";
import { buildConfig } from "payload/config";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { ValidateOptions, RichTextField } from "payload/dist/exports/types";
import Users from "./collections/Users";
import Sites from "./collections/Sites";
import Orders from "./collections/Orders";
import Products from "./collections/Products";
import Categories from "./collections/Categories";
import Media from "./collections/Media";
import SubCategories from "./collections/SubCategory";

//import { webpackBundler } from "@payloadcms/bundler-webpack"; // bundler-import

export default buildConfig({
  /* admin: {
    bundler: webpackBundler(), // or viteBundler()
  }, */

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  collections: [
    // Your collections here
    Users,
    Sites,
    Orders,
    Products,
    Categories,
    SubCategories,
    Media,
  ],
  globals: [
    // Your globals here
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "../payload-types.ts"),
  },

  editor: {
    CellComponent: undefined as any,
    FieldComponent: undefined as any,
    validate: function (
      value: any,
      options: ValidateOptions<any, unknown, RichTextField<any, any>>
    ): string | true | Promise<string | true> {
      throw new Error("Function not implemented.");
    },
  },
});
