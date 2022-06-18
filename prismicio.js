

import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import * as prismicNext from "@prismicio/next";


import sm from "./sm.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint);

/**
 * The project's Prismic Link Resolver. This function determines the URL for a given Prismic document.
 *
 * @type {prismicH.LinkResolverFunction}
 */
export const linkResolver = (doc) => {
  if (doc.type === "posts") {
    return `posts/${doc.uid}`;
  }

  if (doc.type === "preview") {
    return `preview/${doc.uid}`;
  }


  if (doc.type === "posts") {
    return `/`;
  }

  return "/";
};

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - A configuration object to
 */
export const createClient = (config = {}) => {
  const client = prismic.createClient(sm.apiEndpoint,{accessToken:sm.accessToken});

  // prismicNext.enableAutoPreviews({
  //   client,
  //   previewData: config.previewData,
  //   req: config.req,
  // });

  return client;
};