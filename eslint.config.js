import js from "@eslint/js";
import tseslint from "typescript-eslint";

// `_`-prefixed names are deliberate non-uses: the compile-time exhaustiveness
// assertions in `src/icons.ts` exist to be CHECKED by `tsc`, never referenced.
// Exempting them changes no GATE — `npm run lint` passes no `--max-warnings`,
// so eslint exits 0 either way — it just stops the guard reading as two
// standing complaints, which is the pressure that gets a guard deleted.
//
// The options are repeated rather than shared because the two file sets carry
// DIFFERENT severities and this config deliberately keeps them as they were:
// `.ts` was already overridden to `warn` below, while `.tsx` is linted only by
// `tseslint.configs.recommended`, where the rule is an `error`. Folding them
// into one block would silently demote `react.tsx`.
const unusedVarsOptions = {
  varsIgnorePattern: "^_",
  argsIgnorePattern: "^_",
  caughtErrorsIgnorePattern: "^_",
};

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", unusedVarsOptions],
    },
  },
  {
    files: ["**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", unusedVarsOptions],
    },
  },
  {
    ignores: ["node_modules/**", "dist/**", "*.config.js"],
  },
];
