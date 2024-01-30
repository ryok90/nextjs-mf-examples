# Next.js <> Module Federation Plugin - Version Matching
![npm](https://img.shields.io/npm/dw/@module-federation/nextjs-mf)

This repository contains several small samples on different matching versions of `Next.js` framework and `@module-federation/nextjs-mf` plugin.

The samples prefixed with "shared-deps" have dependency sharing and the interaction between host and remote always trying to maintain the host's version over the remote.

## Basic Compatibility Table (WIP)

| Next.js / MF Plugin |        6.4.0       |        6.7.1       |      8.1.7     |
| :-----------------: | :----------------: | :----------------: | :---------------------: |
|      **13.3.1**     | :white_check_mark: | :white_check_mark: | :white_check_mark:      |
|      **13.3.4**     | :white_check_mark: | :white_check_mark: | :white_check_mark:      |
|      **13.4.7**     | :white_check_mark: | :white_check_mark: | :white_check_mark:      |
|     **~13.4.8**     | :x:                | :x:                | :white_check_mark:      |
|      **13.5.6**     | :x:                | :x:                | :white_check_mark:      |
|      **14.0.4**     | :x:                | :x:                | :white_check_mark:      |

## Sample Structure

```
- template
  ├ host            (A Next.js host app)
  ├ remote          (A Next.js remote app)
  ├ package.json    (Package file with scripts to run all apps at once)
  └ README.md       (This readme file to explain how to run the sample)
```

## Sample Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## How to run the sample

Install the dependencies using `npm`:

```bash
npm i
```

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
