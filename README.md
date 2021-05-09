<div align="left">
  <img src="https://user-images.githubusercontent.com/43945767/116423362-d0528200-a86a-11eb-80b3-4a419734b076.png" height="auto" width="125px" alt="logo" />
  <h2>miqdad.dev — V1</h2>
</div>

<!-- prettier-ignore-start -->
[![Netlify Status](https://api.netlify.com/api/v1/badges/ce5337d4-e064-45bb-981e-b8266063da40/deploy-status)](https://app.netlify.com/sites/miqdaddev/deploys)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/miqdadfwz/miqdad.dev/graphs/commit-activity)
<!-- prettier-ignore-end -->

> Personal website of Miqdad A. Fawwaz. Thoughts on web platform and software engineering.

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

### Folder Structure
```
.
├── LICENSE
├── README.md
├── commitlint.config.js
├── netlify.toml
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── renovate.json
├── src
│   ├── assets
│   │   ├── scripts
│   │   │   └── index.ts
│   │   └── styles
│   │       └── index.css
│   ├── data
│   │   ├── seo.json
│   │   └── site.js
│   ├── feed.njk
│   ├── includes
│   │   ├── footer.njk
│   │   ├── header.njk
│   │   ├── posts.njk
│   │   └── profile.njk
│   ├── index.njk
│   ├── layouts
│   │   ├── base.njk
│   │   └── post.njk
│   ├── manifest.json
│   ├── offline.njk
│   ├── posts
│   │   └── posts.json
│   ├── static
│   │   ├── disconnected.svg
│   │   ├── favicon
│   │   └── pwa
│   └── sw.ts
├── ssl
│   ├── localhost+2-key.pem
│   └── localhost+2.pem
├── tailwind.config.js
├── tsconfig.json
└── webpack.config.js
```

### Stacks
- [Tailwind](https://tailwindcss.com) — Utility CSS framework.
- [TypeScript](https://www.typescriptlang.org/) — open-source language which builds on JavaScript, one of the world’s most used tools, by adding static type definitions.
- [11ty](https://www.11ty.dev/) — Simple and robust static stite generator.
- [Workbox](https://developers.google.com/web/tools/workbox) — Workbox is a library that bakes in a set of best practices and removes the boilerplate every developer writes when working with service workers.
- [Netlify](https://www.netlify.com/) — CI/CD, deployment and scaled hosting a commodity and helps creating great dynamic user experiences in a Jamstack world.

### Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a
   build.
2. Update the README.md with details of changes to the interface, this includes new environment
   variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this
   Pull Request would represent. The versioning scheme is [SemVer](http://semver.org/).
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you
   do not have permission to do that, you may request the second reviewer to merge it for you.

### Code of Conduct

#### Our Standards

Examples of behavior that contributes to creating a positive environment
include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior by participants include:
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or electronic
  address, without explicit permission
- Other conduct which could reasonably be considered inappropriate in a
  professional setting

#### Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

#### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting me at **miqdad.fawwaz@gmail.com**. All
complaints will be reviewed and investigated and will result in a response that
is deemed necessary and appropriate to the circumstances. The project team is
obligated to maintain confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

#### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4,
available at [http://contributor-covenant.org/version/1/4][version]

[homepage]: http://contributor-covenant.org
[version]: http://contributor-covenant.org/version/1/4/