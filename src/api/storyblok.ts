import { useStoryblokApi } from "@storyblok/astro";
import { getContentVersion } from "@/utils/helper";

const storyblokApi = useStoryblokApi();

const getGlobals = async (version: "draft" | "published") => {
  const { data: globals } = await storyblokApi.get("cdn/stories/globals", {
    version,
  });

  return globals;
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
  getGlobals,
  getPage,
};
