import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";

interface Props {
  children?: JSX.Element;
  location: { href: string };
  description?: string;
  title: string;
  image?: string;
}

interface SiteQuery {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      twitter: string;
    };
  };
}

export default function SEO({
  children,
  location,
  description,
  title,
  image,
}: Props): JSX.Element {
  const { site }: SiteQuery = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          twitter
        }
      }
    }
  `);
  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      <html lang="en" />
      <title>{title}</title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta name="description" content={site.siteMetadata.description} />
      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:image" content={image || "/logo.svg"} />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta
        property="og:site_name"
        content={site.siteMetadata.title}
        key="ogsitename"
      />
      {description && (
        <meta property="og:description" content={description} key="ogdesc" />
      )}
      {children}
    </Helmet>
  );
}
