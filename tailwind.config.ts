import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        "surface-soft": "var(--surface-soft)",
        "surface-card": "var(--surface-card)",
        "surface-elevated": "var(--surface-elevated)",
        hairline: "var(--hairline)",
        "hairline-strong": "var(--hairline-strong)",
        ink: "var(--ink)",
        body: "var(--body)",
        "body-strong": "var(--body-strong)",
        muted: "var(--muted)",
        "muted-soft": "var(--muted-soft)",
        link: "var(--link)",
        warning: "var(--warning)",
        success: "var(--success)",
      },
      borderRadius: {
        pill: "9999px",
      },
      spacing: {
        "spacing-xxs": "var(--spacing-xxs)",
        "spacing-xs": "var(--spacing-xs)",
        "spacing-sm": "var(--spacing-sm)",
        "spacing-md": "var(--spacing-md)",
        "spacing-lg": "var(--spacing-lg)",
        "spacing-xl": "var(--spacing-xl)",
        "spacing-xxl": "var(--spacing-xxl)",
        "spacing-section": "var(--spacing-section)",
      },
    },
  },
  plugins: [],
};

export default config;
