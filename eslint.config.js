import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "coverage/**"
    ]
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts"],

    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: false
      }
    },

    rules: {
      "no-console": "off",

      "no-unused-vars": "off",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],

      "@typescript-eslint/no-explicit-any": "warn",

      "@typescript-eslint/consistent-type-imports": "error"
    }
  }
];