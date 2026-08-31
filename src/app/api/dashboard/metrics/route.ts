import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Article } from "@/lib/models/Article";
import { Service } from "@/lib/models/Service";

export async function GET() {
  await connectDB();
  const [
    totalPosts,
    publishedPosts,
    draftPosts,
    totalViewsAgg,
    totalServices,
    publishedServices,
    draftServices,
  ] = await Promise.all([
    Article.countDocuments(),
    Article.countDocuments({ status: "published" }),
    Article.countDocuments({ status: "draft" }),
    Article.aggregate([{ $group: { _id: null, total: { $sum: { $ifNull: ["$views", 0] } } } }]),
    Service.countDocuments(),
    Service.countDocuments({ status: "published" }),
    Service.countDocuments({ status: "draft" }),
  ]);

  const totalViews = totalViewsAgg[0]?.total ?? 0;

  const [recentPosts, recentServices] = await Promise.all([
    Article.find()
      .sort({ date: -1 })
      .limit(10)
      .select("title slug status views date")
      .lean(),
    Service.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select("slug title status showInMenu faqs createdAt")
      .lean(),
  ]);

  const recentServicesMapped = recentServices.map((s) => ({
    _id: String(s._id),
    title: s.title,
    slug: s.slug,
    status: s.status,
    showInMenu: s.showInMenu,
    faqCount: Array.isArray(s.faqs) ? s.faqs.length : 0,
    createdAt: s.createdAt,
  }));

  return NextResponse.json({
    overview: {
      totalPosts,
      publishedPosts,
      draftPosts,
      totalViews,
      totalCategories: 0,
      totalServices,
      publishedServices,
      draftServices,
    },
    recentPosts,
    recentServices: recentServicesMapped,
  });
}
