// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Build and Scale your DAO',
  tagline: 'Start your organization on Optimism',
  url: 'https://github.com/0xHabitat/docs',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: '0xHabitat', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  /**@dev SEARCHBAR DEPRECATED */
  // plugins: [
  //   [
  //     require.resolve("@cmfcmf/docusaurus-search-local"),
  //     {
  //       indexDocs: true,
  //       indexBlog: false,
  //       indexPages: false,
  //       language: "en",
  //       style: undefined,
  //     },
  //   ],
  // ],

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // /docs landingpage controller
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/0xHabitat/docs',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
        switchConfig: {
          darkIcon: ' ',
          darkIconStyle: {
            marginLeft: '2px',
          },
          lightIcon: ' ',
          lightIconStyle: {
            marginLeft: '1px',
          },
        },
      },
      navbar: {
        logo: {
          alt: '🌱 Habitat',
          src: 'img/v2-logo-full.svg',
          srcDark: 'img/v2-logo-full_dark.svg',
          href: '/',
          target: '_self',
          width: 200,
          height: 32,
        },
        items: [
          {
            type: 'search',
            position: 'right',
          },
          {
            href: 'https://github.com/0xHabitat',
            // label: 'GitHub',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
            position: 'right'
          },
          {
            href: 'https://twitter.com/0xhabitat',
            // label: 'Twitter',
            className: 'header-twitter-link',
            'aria-label': 'Twitter posts',
            position: 'right'
          },
          {
            href: 'https://discord.com/invite/Pqdj73UTt6',
            // label: 'Discord',
            className: 'header-discord-link',
            'aria-label': 'Discord community',
            position: 'right'
          },

        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Documentation',
                to: '/', //docs landingpage controller
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/0xhabitat',
              },
              {
                label: 'Discord',
                href: 'https://discord.com/invite/Pqdj73UTt6',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/habitat_official',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/0xHabitat/habitat',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Habitat`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      image: 'https://0xhabitat.org/lib/assets/preview-v2.jpg',
    }),
};

module.exports = config;
