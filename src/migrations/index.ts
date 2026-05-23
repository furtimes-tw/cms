import * as migration_20260523_180151 from './20260523_180151';

export const migrations = [
  {
    up: migration_20260523_180151.up,
    down: migration_20260523_180151.down,
    name: '20260523_180151'
  },
];
