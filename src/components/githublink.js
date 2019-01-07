import React from "react";
import { StaticQuery,graphql } from 'gatsby'
import * as style from './layout.css';

export default ({ meta }) => {

//Test comment

    if (!meta) {
        return null;
    }
    return <StaticQuery
        query={graphql`
      query SiteTitleQuery2{
        site {
          siteMetadata {
            githubProject
          }
        }
      }
    `}
        render={data => (
        <div className={`edit-github small-container`}>
            <a className={`github-btn`} href={`${data.site.siteMetadata.githubProject}${meta.path}`} target="_blank">
                 <img src='/assets/ic-edit.svg' alt="edit-icon" /><span>edit this page on GitHub</span>
            </a>
        </div>
        )}
    />
};
