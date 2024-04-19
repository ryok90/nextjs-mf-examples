import React from 'react';
import dynamic from 'next/dynamic';
import type { TableData } from 'remote/table';
import nextpkg from 'next/package.json';
import mfpkg from '@module-federation/nextjs-mf/package.json';
import muipkg from '@mui/material/package.json';
import Button from '@mui/material/Button';
import { loadRemote } from '@module-federation/runtime';

function DynamicRemoteComponent({
  url,
  props,
}: {
  url: string;
  props?: Record<string, unknown>;
}) {
  // @ts-ignore
  const Comp = dynamic(async () => loadRemote(url), { ssr: false });
  return (
    <React.Suspense fallback="Loading component">
      <Comp {...props} />
    </React.Suspense>
  );
}

const data: TableData[] = [
  {
    name: 'San Francisco',
    age: 66,
    email: 'san.francisco@email.com',
  },
  {
    name: 'Alex Smith',
    age: 42,
    email: 'alex.smith@email.com',
  },
  {
    name: 'Mary Jane',
    age: 77,
    email: 'mary.jane@email.com',
  },
];

export function Index() {
  return (
    <section className="max-w-7xl mx-auto py-6 px-4 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
          This is a <strong>Zephyr Cloud</strong> example.{' '}
          <a
            href="https://github.com/ZephyrCloudIO/zephyr-examples"
            className="font-semibold text-blue-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="absolute inset-0" aria-hidden="true" />
            See more here <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <div className="text-center mt-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Welcome to the
            <br />
            <span className="text-blue-600">Next.js host application</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            This is a template for a host application you can get started by
            editing
            <br />
            <code className="text-sm font-bold text-gray-900">
              pages/index.tsx
            </code>
          </p>
          <div className="mt-4 flex items-center justify-center gap-x-6">
            <a
              href="https://zephyr-cloud.io/"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Try Zephyr Cloud
            </a>
            <a
              href="https://github.com/ZephyrCloudIO/zephyr-examples"
              className="text-sm font-semibold leading-6 text-gray-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      <h3 className="mt-4 font-bold">
        This aplication is running on following versions:
      </h3>
      <ul>
        <li>
          @module-federation/nextjs-mf:{' '}
          <span className="text-blue-600 font-bold">[{mfpkg.version}]</span>
        </li>
        <li>
          next:{' '}
          <span className="text-blue-600 font-bold">[{nextpkg.version}]</span>
        </li>
      </ul>
      <h3 className="mt-4 font-bold">
        This is the <span className="text-yellow-700">@mui/material</span> from
        host: <span className="text-blue-600">[{muipkg.version}]</span>
      </h3>
      <Button variant="outlined" className="mt-3">
        Button from MUI
      </Button>
      <h3 className="mt-2">
        The component below comes from the{' '}
        <span className="text-yellow-600 font-bold">React remote</span> app:
      </h3>
      <div className="mt-4 border-4 border-dashed border-yellow-500 p-8 rounded-lg w-full">
        <DynamicRemoteComponent url="react_remote/table" props={{ data }} />
      </div>
      <h3 className="mt-6">
        The component below comes from the{' '}
        <span className="text-rose-600 font-bold">Next.js remote</span> app:
      </h3>
      <div className="mt-4 border-4 border-dashed border-rose-500 p-8 rounded-lg w-full">
        <DynamicRemoteComponent url="remote/table" props={{ data }} />
      </div>
      <h3 className="mt-4 text-center">
        The component below should be called from
        <br />
        the <span className="text-rose-600 font-bold">Next.js remote</span> app but is expected to fail.
      </h3>
      <div className="mt-4 border-4 border-dashed border-rose-500 p-8 rounded-lg flex justify-center">
        <DynamicRemoteComponent url="remote/error" />
      </div>
    </section>
  );
}

export default Index;
