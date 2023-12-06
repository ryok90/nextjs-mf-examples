# Next.js - Module Federation - Plugin Version Matching

This repository contains several small samples on different matching versions of `Next.js` framework and `@module-federation/nextjs-mf` plugin.

The samples prefixed with "shared-deps" has examples on dependency sharing and the interation between host and remote, always trying to maintain the host's version over the remote.

![npm](https://img.shields.io/npm/dw/@module-federation/nextjs-mf)

## Sample Structure

```
- template
  ├ host            (A nextjs@13+ host app)
  ├ remote          (A nextjs@13+ remote app)
  ├ package.json    (Package file with scripts to run all apps at once)
  └ README.md       (This readme file to explain how to run the sample)
```

## Sample Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## How to run the sample

To run the samples in development mode, run the following command:

```bash
npm run dev
```

To run the samples in production mode, first build the samples using the following command:

```bash
npm run build
```

Then, run the following command to serve the samples:

```bash
npm run start
```
