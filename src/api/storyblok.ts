import { useStoryblokApi } from "@storyblok/astro";
import { getContentVersion } from "@/utils/helper";

const storyblokApi = useStoryblokApi();

const getSettings = async (version: "draft" | "published") => {
  const { data } = await storyblokApi.get("cdn/stories/globals/settings", {
    version,
  });

  return data.story?.content;
};

const getNavigation = async (version: "draft" | "published") => {
  const { data: navigation } = await storyblokApi.get(
    "cdn/stories/globals/navigation",
    {
      version,
    },
  );

  const headerItems = {
    links: navigation.story?.content.header_navigation_items,
    cta: navigation.story?.content.call_to_action,
  };

  const footerItems = {
    columns: navigation.story?.content.footer_columns,
    cta_text: navigation.story?.content.footer_cta_text,
    cta_link: navigation.story?.content.footer_cta_link,
  };

  return {
    headerItems,
    footerItems,
  };
};

const getPage = async (
  slug: string,
  params?: any,
  options?: any,
): Promise<any> => {
  const response = await storyblokApi.get(
    `cdn/stories/${slug}`,
    params,
    options,
  );

  return response.data.story;
};

export const StoryblokApi = {
  getSettings,
  getNavigation,
  getPage,
};
