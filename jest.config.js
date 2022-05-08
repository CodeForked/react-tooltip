const esModules = ['uuid'].join('|');

module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ['./src'],

  verbose: true,
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  globals: {
    'ts-jest': {
      diagnostics: {
        //warnOnly: true
      },
      useESM: true
    }
  },

  //required for esm support in ts-ject  https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },

  //custom jest28 resolver to fix issue with uuid
  //avoids the SyntaxError: unexpeceted token 'export' with uuid package.
  resolver: './src/__tests__/jest-resolver.js',

  // Jest transformations -- this adds support for TypeScript using ts-jest
  transform: {
    '^.+\\.(tsx|ts)$': 'ts-jest',
    '^.+\\.scss$': 'jest-scss-transform'
  },

  // https://stackoverflow.com/questions/49263429/jest-gives-an-error-syntaxerror-unexpected-token-export
  // https://github.com/nrwl/nx/issues/812
  // also need allowJs:true in tsconfig
  //transformIgnorePatterns: [`/node_modules/(?!${esModules})`],

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: [
    // '@testing-library/react/cleanup-after-each',
    '@testing-library/jest-dom/extend-expect'
  ],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx|ts)?$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: 'ts-jest/presets/js-with-ts-esm'
  //preset: 'ts-jest/presets/js-with-ts'
  //preset: 'ts-jest/presets/default-esm'
};
