// seed.js

const { buildConfig } = require("payload/config");

const payload = buildConfig({
  // your payload config
});

async function seed() {
  // Seed a user
  const user = await payload.create({
    collection: "users",
    data: {
      email: "admin@example.com",
      password: "password123",
      roles: ["admin"],
      // ... other user fields
    },
  });

  // Seed a site for index
  const site = await payload.create({
    collection: "sites",
    data: {
      name: "Index Site",
      slug: "index",
      // ... other site fields
    },
  });

  console.log("Seeding completed:", { user, site });
}

seed();
