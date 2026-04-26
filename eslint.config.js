import stylistic from "@stylistic/eslint-plugin";

export default [
  {
    files: ["js/**/*.js"],
    plugins: {
      "@stylistic": stylistic
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly",
        sessionStorage: "readonly",
        console: "readonly",
        Math: "readonly",
        JSON: "readonly",
        Set: "readonly",
        Array: "readonly",
        String: "readonly",
        QUESTIONS: "readonly",
        TrainerStore: "readonly",
        VowelHighlighter: "readonly"
      }
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "error",
      "no-var": "error",
      "prefer-const": "error",
      "eqeqeq": ["error", "always"],
      "camelcase": ["error", { properties: "never" }],
      "new-cap": ["error", { newIsCap: true, capIsNew: false }],

      "@stylistic/indent": ["error", 2, { SwitchCase: 1 }],
      "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/comma-dangle": ["error", "never"],
      "@stylistic/eol-last": ["error", "always"],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/space-before-function-paren": ["error", {
        anonymous: "always",
        named: "never",
        asyncArrow: "always"
      }],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/array-bracket-spacing": ["error", "never"],
      "@stylistic/keyword-spacing": "error",
      "@stylistic/space-infix-ops": "error",
      "@stylistic/arrow-spacing": "error"
    }
  }
];
