import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

let hideSearch = `button[class*="DetachedSearchButton"] { display:none; }`

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className="hero__tagline">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>
      </div>
    </header>
  );
}

// TODO: code body of homepage
// function HomepageBody() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <div>
//       <div className={styles.buttons}>
//       <Link
//         className="button button--secondary button--lg"
//         to="/docs">
//         VIEW THE DOCS
//       </Link>
//       </div>
//     </div>
//   );
// }

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      {/* <HomepageBody /> */}
      <style>
        {hideSearch}
      </style>
    </Layout>
  );
}


