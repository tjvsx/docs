import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from '../index.module.css';
import clsx from 'clsx';

function AboutSection() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <div className={styles.section__about}>
      {/* <h1>🎨 A New Design Space for Organisations</h1> */}
    </div>
  );
}

export default AboutSection;
