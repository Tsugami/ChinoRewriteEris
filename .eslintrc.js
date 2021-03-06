module.exports = {
    env: {
        commonjs: true,
        es2020: true,
        node: true
    },
    extends: [
        "standard"
    ],
    parserOptions: {
        ecmaVersion: 11
    },
    rules: {
        indent: ["error", 4],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "space-before-function-paren": ["error", "never"]
    }
};
