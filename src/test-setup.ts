import 'zone.js';

import * as fs from 'fs';
import * as path from 'path';
import { TestBed } from '@angular/core/testing';
import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import { ɵresolveComponentResources as resolveComponentResources } from '@angular/core';
import { afterEach, beforeAll } from 'vitest';

const findResourcePath = (url: string): string => {
  const basename = path.basename(url.split('?')[0].split('#')[0]);
  const queue = [process.cwd()];

  while (queue.length > 0) {
    const current = queue.shift() as string;
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);

      if (entry.isDirectory()) {
        queue.push(fullPath);
        continue;
      }

      if (entry.isFile() && entry.name === basename) {
        return fullPath;
      }
    }
  }

  throw new Error(`Could not resolve Angular resource: ${url}`);
};

beforeAll(async () => {
  await resolveComponentResources((url) =>
    Promise.resolve(fs.readFileSync(findResourcePath(url), 'utf8')),
  );
  TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
});

afterEach(() => {
  TestBed.resetTestingModule();
});
