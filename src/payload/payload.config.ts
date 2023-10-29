import path from "path";
import { buildConfig } from "payload/config";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { ValidateOptions, RichTextField } from "payload/dist/exports/types";
import Users from "./collections/Users";
import Sites from "./collections/Sites";

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
