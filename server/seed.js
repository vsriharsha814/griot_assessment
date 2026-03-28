const bcrypt = require("bcrypt");
const connectDB = require("./config/db");
const User = require("./models/User");
const Product = require("./models/Product");

const seedUsers = async () => {
  const saltRounds = 10;

  const users = [
    {
      username: "Seller One",
      email: process.env.SEED_SELLER_EMAIL || "seller@example.com",
      password: process.env.SEED_SELLER_PASSWORD || "password123",
      role: "seller",
    },
    {
      username: "Buyer One",
      email: process.env.SEED_BUYER_EMAIL || "buyer@example.com",
      password: process.env.SEED_BUYER_PASSWORD || "password123",
      role: "buyer",
    },
  ];

  for (const u of users) {
    const existing = await User.findOne({ email: u.email });
    if (existing) continue;

    const hashedPassword = await bcrypt.hash(u.password, saltRounds);
    await User.create({
      username: u.username,
      email: u.email,
      password: hashedPassword,
      role: u.role,
    });
  }
};

const seedProducts = async () => {
  const seller = await User.findOne({ role: "seller" });
  if (!seller) return;

  const reset = process.argv.includes("--reset");
  if (reset) {
    await Product.deleteMany({ userId: seller._id });
  }

  const existingCount = await Product.countDocuments({ userId: seller._id });
  if (existingCount > 0 && !reset) return;

  const products = [
    {
      name: "Villa Sunset USD",
      description: "A comfortable villa for relaxing nights.",
      startingBid: 1450,
      minBidAmount: 150,
      region: "coastline",
    },
    {
      name: "Villa Luna USD",
      description: "Cozy stay with modern amenities.",
      startingBid: 850,
      minBidAmount: 100,
      region: "mountains",
    },
    {
      name: "Aphrodite USD",
      description: "Seaside vibes and spacious rooms.",
      startingBid: 980,
      minBidAmount: 90,
      region: "coastline",
    },
  ];

  for (const p of products) {
    await Product.create({
      ...p,
      imageUrl: "",
      userId: seller._id,
    });
  }
};

const main = async () => {
  const reset = process.argv.includes("--reset");
  console.log(reset ? "Seeding with --reset" : "Seeding (idempotent)");

  await connectDB();
  await seedUsers();
  await seedProducts();

  console.log("Seed complete");
  process.exit(0);
};

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

