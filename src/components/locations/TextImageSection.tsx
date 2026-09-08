"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TextImageSectionType, TextImageElementType } from "@/lib/validations/location";

interface TextImageSectionProps {
  section: TextImageSectionType;
}

export function TextImageSection({ section }: TextImageSectionProps) {
  const isImageLeft = section.direction === "image_left";

  const containerStyle: React.CSSProperties = {};
  if (section.layout.containerWidth) containerStyle.maxWidth = section.layout.containerWidth;
  if (section.spacing.padding) containerStyle.padding = section.spacing.padding;
  if (section.spacing.margin) containerStyle.margin = section.spacing.margin;
  if (section.background.color) containerStyle.backgroundColor = section.background.color;
  if (section.background.gradient) containerStyle.background = section.background.gradient;

  return (
    <section
      className={`py-16 px-8 ${section.visibility.desktop ? "" : "hidden"} ${section.visibility.tablet ? "" : "md:hidden"} ${section.visibility.mobile ? "" : "sm:hidden"}`}
      style={containerStyle}
    >
      <div
        className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isImageLeft ? "" : "direction-rtl"}`}
        style={{ direction: isImageLeft ? "ltr" : "rtl" }}
      >
        {/* Image Side */}
        <div
          className="relative h-[350px] sm:h-[450px] rounded-2xl overflow-hidden"
          style={{ direction: "ltr" }}
        >
          {section.image.link ? (
            <Link href={section.image.link}>
              <Image
                src={section.image.url}
                alt={section.image.alt}
                title={section.image.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`object-${section.image.objectFit || "cover"}`}
                style={{
                  objectPosition: section.image.objectPosition,
                  borderRadius: section.image.borderRadius,
                }}
              />
              {section.image.overlay && (
                <div
                  className="absolute inset-0 bg-black"
                  style={{ opacity: parseFloat(section.image.overlayOpacity) || 0.5 }}
                />
              )}
            </Link>
          ) : (
            <>
              <Image
                src={section.image.url}
                alt={section.image.alt}
                title={section.image.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`object-${section.image.objectFit || "cover"}`}
                style={{
                  objectPosition: section.image.objectPosition,
                  borderRadius: section.image.borderRadius,
                }}
              />
              {section.image.overlay && (
                <div
                  className="absolute inset-0 bg-black"
                  style={{ opacity: parseFloat(section.image.overlayOpacity) || 0.5 }}
                />
              )}
            </>
          )}
          {section.image.caption && (
            <div className="absolute bottom-4 left-4 right-4 text-white text-sm bg-black/50 rounded-lg px-3 py-2">
              {section.image.caption}
            </div>
          )}
        </div>

        {/* Content Side */}
        <div
          className="space-y-6"
          style={{
            direction: "ltr",
            maxWidth: section.layout.contentWidth || "100%",
          }}
        >
          {section.elements
            .filter((el) => el.visible)
            .map((element) => (
              <ElementRenderer key={element.id} element={element} />
            ))}
        </div>
      </div>
    </section>
  );
}

interface ElementRendererProps {
  element: TextImageElementType;
}

function ElementRenderer({ element }: ElementRendererProps) {
  const style: React.CSSProperties = {};

  if (element.style?.typography?.fontFamily) style.fontFamily = element.style.typography.fontFamily;
  if (element.style?.typography?.fontSize) style.fontSize = element.style.typography.fontSize;
  if (element.style?.typography?.fontWeight) style.fontWeight = element.style.typography.fontWeight;
  if (element.style?.typography?.lineHeight) style.lineHeight = element.style.typography.lineHeight;
  if (element.style?.typography?.letterSpacing) style.letterSpacing = element.style.typography.letterSpacing;
  if (element.style?.typography?.textTransform) style.textTransform = element.style.typography.textTransform;
  if (element.style?.colors?.text) style.color = element.style.colors.text;
  if (element.style?.colors?.background) style.backgroundColor = element.style.colors.background;
  if (element.style?.spacing?.marginTop) style.marginTop = element.style.spacing.marginTop;
  if (element.style?.spacing?.marginBottom) style.marginBottom = element.style.spacing.marginBottom;
  if (element.style?.spacing?.marginLeft) style.marginLeft = element.style.spacing.marginLeft;
  if (element.style?.spacing?.marginRight) style.marginRight = element.style.spacing.marginRight;
  if (element.style?.spacing?.paddingTop) style.paddingTop = element.style.spacing.paddingTop;
  if (element.style?.spacing?.paddingBottom) style.paddingBottom = element.style.spacing.paddingBottom;
  if (element.style?.spacing?.paddingLeft) style.paddingLeft = element.style.spacing.paddingLeft;
  if (element.style?.spacing?.paddingRight) style.paddingRight = element.style.spacing.paddingRight;
  if (element.style?.borders?.border) style.border = element.style.borders.border;
  if (element.style?.borders?.borderRadius) style.borderRadius = element.style.borders.borderRadius;

  switch (element.type) {
    case "tag":
      return (
        <span
          className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-abGold/20 text-abGold rounded-full"
          style={style}
        >
          {element.content}
        </span>
      );

    case "label":
      return (
        <span
          className="inline-block text-sm font-medium text-abGold"
          style={style}
        >
          {element.content}
        </span>
      );

    case "heading": {
      const HeadingTag = element.headingLevel || "h2";
      const headingClasses: Record<string, string> = {
        h1: "text-4xl md:text-5xl font-serif font-bold text-white tracking-tight",
        h2: "text-3xl md:text-4xl font-serif font-bold text-white tracking-tight",
        h3: "text-2xl md:text-3xl font-serif font-bold text-white tracking-tight",
        h4: "text-xl md:text-2xl font-serif font-bold text-white tracking-tight",
        h5: "text-lg md:text-xl font-serif font-bold text-white tracking-tight",
        h6: "text-base md:text-lg font-serif font-bold text-white tracking-tight",
      };
      return React.createElement(
        HeadingTag,
        { className: headingClasses[HeadingTag] || headingClasses.h2, style },
        element.content
      );
    }

    case "paragraph":
      return (
        <p
          className="text-gray-300 text-[16px] leading-relaxed"
          style={style}
        >
          {element.content}
        </p>
      );

    case "button":
      return (
        <div className="flex gap-4" style={style}>
          <Link
            href={element.url || "#"}
            target={element.target}
            className="inline-flex items-center gap-2 px-6 py-3 bg-abGold text-white font-semibold rounded-lg hover:bg-abGold/90 transition-colors"
          >
            {element.icon?.position === "left" && element.icon?.name && (
              <span className="w-4 h-4">{/* Icon placeholder */}</span>
            )}
            {element.content}
            {element.icon?.position === "right" && (
              <ArrowRight className="w-4 h-4" />
            )}
          </Link>
        </div>
      );

    default:
      return null;
  }
}
