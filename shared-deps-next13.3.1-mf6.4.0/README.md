# Next.js + MF Example

This is an example for the use of the Next.js framework using the Module Federation webpack plugin.

## Sample Structure

```
- template
  ├ host            (A nextjs@13+ host app)
  ├ remote          (A nextjs@13+ remote app)
  ├ package.json    (Package file with scripts to run all apps at once)
  └ README.md       (This readme file to explain how to run the sample and deploy it using Zephyr)
```

## Sample Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## How to run the sample

Install the dependencies using `npm`:

```bash
npm i
```

To run the sample in development mode, run the following command:

```bash
npm run dev
```

To run the sample in production mode, first build the sample using the following command:

```bash
npm run build
```

Then, run the following command to serve the sample:

```bash
npm run start
```
