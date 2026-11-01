import dotenv from "dotenv";
import path from "path";

// Load .env.local first (overrides .env)
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { connectDB } from "../src/lib/db";
import { User } from "../src/lib/models/User";
import { SimpleCategory } from "../src/lib/models/SimpleCategory";
import { Article } from "../src/lib/models/Article";
import { Setting } from "../src/lib/models/Setting";
import { hashPassword } from "../src/lib/auth/password";

async function seed() {
  await connectDB();
  console.log("Connected to DB. Seeding...");

  // Create admin user if none exists
  const existingAdmin = await User.findOne({ email: "admin@ablimo.com" });
  if (!existingAdmin) {
    const passwordHash = await hashPassword("admin123");
    await User.create({
      name: "Admin",
      email: "admin@ablimo.com",
      passwordHash,
      roles: ["admin"],
      isActive: true,
    });
    console.log("Created admin user: admin@ablimo.com / admin123");
  } else {
    console.log("Admin user already exists");
  }

  // Create default categories
  const defaultCategories = ["Airport Transfers", "City Guides", "Travel Tips", "Chauffeur Services", "Luxury Travel"];
  for (const label of defaultCategories) {
    const slug = label.toLowerCase().replace(/\s+/g, "-");
    const exists = await SimpleCategory.findOne({ slug });
    if (!exists) {
      await SimpleCategory.create({ slug, label });
      console.log(`Created category: ${label}`);
    }
  }

  // Create default settings
  const defaultSettings = [
    { key: "siteTitle", value: "AB.Limo" },
    { key: "defaultSeo", value: { metaTitle: "AB.Limo - Premium Chauffeur Services", metaDescription: "Book luxury chauffeur services worldwide." } },
  ];
  for (const s of defaultSettings) {
    const exists = await Setting.findOne({ key: s.key });
    if (!exists) {
      await Setting.create({ key: s.key, value: s.value });
      console.log(`Created setting: ${s.key}`);
    }
  }

  // Create a sample article
  const articleExists = await Article.findOne({ slug: "sample-airport-transfer-guide" });
  if (!articleExists) {
    await Article.create({
      title: "Sample Airport Transfer Guide",
      slug: "sample-airport-transfer-guide",
      excerpt: "Everything you need to know about airport transfers.",
      category: "Airport Transfers",
      categoryLabel: "Airport Transfers",
      author: "admin",
      authorName: "Admin",
      status: "published",
      templateType: "airport",
      airportName: "Dubai International Airport",
      country: "UAE",
      bodyContent: "<p>This is a sample blog post about airport transfers.</p>",
      featured: true,
      date: new Date().toISOString(),
    });
    console.log("Created sample article");
  }

  console.log("Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
