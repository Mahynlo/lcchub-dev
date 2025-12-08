import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogById } from "@/lib/api/blog";
import { BlogDetailClient } from "@/components/ui/home/blog/blog-detail-client";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlogById(params.id);
  
  if (!blog) {
    return {
      title: "Anuncios y noticias no encontrado",
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const blog = await getBlogById(params.id);

  if (!blog) {
    notFound();
  }

  return <BlogDetailClient blog={blog} />;
}
