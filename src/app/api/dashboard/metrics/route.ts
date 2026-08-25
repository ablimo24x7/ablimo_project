import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Article } from "@/lib/models/Article";

export async function GET() {
  await connectDB();
  const [totalPosts, publishedPosts, draftPosts, totalViewsAgg] = await Promise.all([
    Article.countDocuments(),
    Article.countDocuments({ status: "published" }),
    Article.countDocuments({ status: "draft" }),
    Article.aggregate([{ $group: { _id: null, total: { $sum: { $ifNull: ["$views", 0] } } } }]),
  ]);

  const totalViews = totalViewsAgg[0]?.total ?? 0;

  const recentPosts = await Article.find()
    .sort({ date: -1 })
    .limit(10)
    .select("title slug status views date")
    .lean();

  return NextResponse.json({
    overview: { totalPosts, publishedPosts, draftPosts, totalViews, totalCategories: 0 },
    recentPosts,
  });
}
