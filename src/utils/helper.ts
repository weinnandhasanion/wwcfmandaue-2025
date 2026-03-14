import crypto from "crypto";

export const getContentVersion = (previewMode: boolean) => {
  return previewMode ? "draft" : "published";
};

export const hasImage = (image: any) => {
  if (!image) return false;

  return !!(image.id && image.filename);
};

export const hasLink = (link: any) => {
  if (!link) return false;

  return link.linktype === "story"
    ? !!(link.cached_url || link.url)
    : !!link.url;
};

export const getLinkAttributes = (link: any) => {
  if (!link) return {};

  let href = link.linktype === "story" ? `/${link.cached_url}` : link.url;
  if (!!link.anchor) href += `#${link.anchor}`;

  return {
    href,
    title: link.title,
    rel: link.rel,
    target: link.target || "_self",
  };
};

// Ensure whoever is using Storyblok preview has the right to.
export function isAllowedToPreview(request: Request) {
  // localhost check/override
  if (["localhost"].some((domain) => request.url.includes(domain))) {
    return true;
  }

  const url = new URL(request.url);
  const STORYBLOK_ACCESS_TOKEN = import.meta.env.STORYBLOK_PREVIEW_ACCESS_TOKEN;

  if (
    url.searchParams.has("_storyblok") &&
    url.searchParams.has("_storyblok_tk[token]")
  ) {
    // check for storyblok params
    const space_id = url.searchParams.get("_storyblok_tk[space_id]");
    const timestamp = url.searchParams.get("_storyblok_tk[timestamp]");
    const token = url.searchParams.get("_storyblok_tk[token]");

    // Create a token for comparison, this should be the same as the one
    // created in the Storyblok editor. "space_id:preview_token:timestamp"
    const controlToken = crypto
      .createHash("sha1")
      .update(`${space_id}:${STORYBLOK_ACCESS_TOKEN}:${timestamp}`, "binary")
      .digest("hex");

    return token == controlToken;
  }

  return false;
}
