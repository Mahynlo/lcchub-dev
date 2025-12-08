"use client";

import { memo } from "react";
import { RichTextNode, RichTextChild } from "@/lib/types";
import Image from "next/image";

interface RichTextRendererProps {
  content: RichTextNode[];
}

// Usar variable de entorno para evitar hardcodear URLs
const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

function renderChild(child: RichTextChild, index: number): JSX.Element {
  if (child.type === "text") {
    let className = "";
    if (child.bold) className += " font-bold";
    if (child.italic) className += " italic";
    if (child.underline) className += " underline";
    if (child.strikethrough) className += " line-through";
    if (child.code) className += " bg-gray-100 dark:bg-gray-800 px-1 rounded font-mono text-sm";

    return (
      <span key={index} className={className.trim()}>
        {child.text}
      </span>
    );
  }

  if (child.type === "link") {
    return (
      <a
        key={index}
        href={child.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {child.children?.map((linkChild, idx) => renderChild(linkChild, idx))}
      </a>
    );
  }

  return <span key={index}>{child.text}</span>;
}

function renderNode(node: RichTextNode, index: number): JSX.Element {
  const children = node.children?.map((child, idx) => renderChild(child, idx));

  switch (node.type) {
    case "paragraph":
      return (
        <p key={index} className="mb-4 text-sm md:text-base leading-relaxed">
          {children}
        </p>
      );

    case "heading":
      const HeadingTag = `h${node.level || 3}` as keyof JSX.IntrinsicElements;
      const headingClass = `font-bold mb-3 md:mb-4 ${
        node.level === 1
          ? "text-3xl md:text-4xl lg:text-5xl"
          : node.level === 2
          ? "text-2xl md:text-3xl lg:text-4xl"
          : node.level === 3
          ? "text-xl md:text-2xl lg:text-3xl"
          : node.level === 4
          ? "text-lg md:text-xl lg:text-2xl"
          : "text-base md:text-lg lg:text-xl"
      }`;
      return (
        <HeadingTag key={index} className={headingClass}>
          {children}
        </HeadingTag>
      );

    case "quote":
      return (
        <blockquote
          key={index}
          className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 my-4 italic text-gray-700 dark:text-gray-300"
        >
          {children}
        </blockquote>
      );

    case "code":
      return (
        <pre
          key={index}
          className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4"
        >
          <code className="text-sm font-mono">{children}</code>
        </pre>
      );

    case "image":
      if (!node.image) return <></>;
      
      const imageUrl = node.image.url.startsWith("http")
        ? node.image.url
        : `${baseUrl}${node.image.url}`;

      return (
        <div key={index} className="my-6 md:my-8">
          <div className="relative w-full h-48 md:h-64 lg:h-96 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={node.image.alternativeText || "Imagen del blog"}
              fill
              className="object-cover"
            />
          </div>
          {node.image.caption && (
            <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-2">
              {node.image.caption}
            </p>
          )}
        </div>
      );

    case "list":
      const ListTag = node.format === "ordered" ? "ol" : "ul";
      const listClass = node.format === "ordered" 
        ? "list-decimal list-inside mb-4 space-y-2" 
        : "list-disc list-inside mb-4 space-y-2";
      return (
        <ListTag key={index} className={listClass}>
          {children}
        </ListTag>
      );

    default:
      return <div key={index}>{children}</div>;
  }
}

export const RichTextRenderer = memo(function RichTextRenderer({ content }: RichTextRendererProps) {
  return (
    <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none">
      {content.map((node, index) => renderNode(node, index))}
    </div>
  );
});
