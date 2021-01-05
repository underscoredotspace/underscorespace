module.exports = {
    darkMode: "media",
    purge: ["./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        "code::before": { content: "" },
                        "code::after": { content: "" },
                        "pre code::after": { content: "none" },
                        pre: {
                            "max-width": "100%",
                        },
                    },
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
}
