module.exports = {
    extends: [
        "eslint:recommended",
        "prettier",
        "prettier/@typescript-eslint",
        "plugin:@typescript-eslint/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:react/recommended",
        "plugin:mdx/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
    },
    plugins: ["@typescript-eslint", "react", "jsx-a11y"],
    env: {
        node: true,
        es6: true,
    },
    rules: {
        "react/prop-types": "off",
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                vars: "all",
                args: "after-used",
                ignoreRestSiblings: true,
                argsIgnorePattern: "^_",
            },
        ],
        "@typescript-eslint/camelcase": "off",
        "react/react-in-jsx-scope": "off",
        "jsx-a11y/anchor-is-valid": "off",
    },
    overrides: [
        {
            files: ["*.mdx", "*.md"],
            parser: "eslint-mdx",
        },
    ],
    settings: {
        react: {
            version: "detect",
        },
    },
}
