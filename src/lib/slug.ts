import slugify from "slugify";

export function toSlug(input: string) {
  const hasNonAscii = /[^\x00-\x7F]/.test(input);

  if (hasNonAscii) {
    return input
      .toLowerCase()
      .normalize("NFC")
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  return slugify(input, {
    lower: true,
    strict: true,
    trim: true,
  });
}

export async function ensureUniqueSlug(opts: {
  base: string;
  exists: (slug: string) => Promise<boolean>;
}) {
  const baseSlug = toSlug(opts.base);
  if (!(await opts.exists(baseSlug))) return baseSlug;
  for (let n = 2; n < 10_000; n++) {
    const next = `${baseSlug}-${n}`;
    if (!(await opts.exists(next))) return next;
  }
  throw new Error("Unable to generate unique slug");
}

export const generateSlug = toSlug;
