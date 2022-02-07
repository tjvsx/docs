import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

import BannerSection from './sections/BannerSection';
import AboutSection from './sections/AboutSection';
import DiamondSection from './sections/DiamondSection';
import TokenSection from './sections/TokenSection';
import RoadmapSection from './sections/RoadmapSection';
import TechSection from './sections/TechSection';
import SocialSection from './sections/SocialSection';
import BackgroundAnimation from './components/Background';

function LandingPage() {
  return (
    <div> 
      <BackgroundAnimation /> 
      <BannerSection />
      <AboutSection />
      <DiamondSection />
      <TokenSection />
      <RoadmapSection />
      <TechSection />
      <SocialSection />
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  let hideSearch = `button[class*="DetachedSearchButton"] { display:none; }`
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <LandingPage />
      <style>
        {hideSearch}
      </style>
    </Layout>
  );
}


