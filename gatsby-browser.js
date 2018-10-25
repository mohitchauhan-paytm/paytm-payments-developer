/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import wrapWithProvider from "./wrap-with-provider"
export const wrapRootElement = wrapWithProvider


export const onRouteUpdate = () => {
    if (typeof window !== `undefined`) { window.scrollTo(0, 0)}
  }
  
export const shouldUpdateScroll = args => {
     return false;
};