import tsParser from "@typescript-eslint/parser";
import globals from "globals";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tseslint from "typescript-eslint";
import eslint from "@eslint/js";
import react from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  // Conf js par défaut
  eslint.configs.recommended,
  // Configuration TS par défaut
  ...tseslint.configs.recommended,
  // Common
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["dist", "node_modules"],
    plugins: {
      tsPlugin,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        myCustomGlobal: "readonly",
      },
      parser: tsParser,
    },
    rules: {
      "tsPlugin/interface-name-prefix": "off",
      "tsPlugin/explicit-function-return-type": "error",
    },
  },
  // Frontend
  {
    files: ["apps/webapp/**/*.{js, jsx, ts, tsx}"],
    plugins: {
      react,
      "react-refresh": reactRefresh,
      reactHooks,
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser,
        myCustomGlobal: "readonly",
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "react-refresh/only-export-components": "warn",
    },
  },
  // Backend
  {
    files: ["apps/api/**/*.{js, jsx, ts, tsx}"],
  },
  // DTOs
  {
    files: ["packages/dtos/**/*.{js, jsx, ts, tsx}"],
  },
];
