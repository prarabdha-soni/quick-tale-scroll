import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Source Serif 4"', "Georgia", "Cambria", "Times New Roman", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        book: {
          page: "hsl(var(--book-page))",
          edge: "hsl(var(--book-page-edge))",
          ink: "hsl(var(--book-ink))",
          red: "hsl(var(--book-red))",
          teal: "hsl(var(--book-teal))",
          gold: "hsl(var(--book-gold))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "page-settle": {
          "0%": { transform: "rotateY(-7deg) translateX(10px)", opacity: "0.86" },
          "100%": { transform: "rotateY(0deg) translateX(0)", opacity: "1" },
        },
        "story-rise": {
          "0%": { transform: "translateY(22px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "book-out-next": {
          "0%": { transform: "perspective(1400px) rotateY(0deg)", filter: "brightness(1)" },
          "100%": { transform: "perspective(1400px) rotateY(-78deg) translateX(-2%)", filter: "brightness(0.88)" },
        },
        "book-in-next": {
          "0%": { transform: "perspective(1400px) rotateY(72deg) translateX(2%)", opacity: "0.55", filter: "brightness(0.9)" },
          "100%": { transform: "perspective(1400px) rotateY(0deg) translateX(0)", opacity: "1", filter: "brightness(1)" },
        },
        "book-out-prev": {
          "0%": { transform: "perspective(1400px) rotateY(0deg)", filter: "brightness(1)" },
          "100%": { transform: "perspective(1400px) rotateY(78deg) translateX(2%)", filter: "brightness(0.88)" },
        },
        "book-in-prev": {
          "0%": { transform: "perspective(1400px) rotateY(-72deg) translateX(-2%)", opacity: "0.55", filter: "brightness(0.9)" },
          "100%": { transform: "perspective(1400px) rotateY(0deg) translateX(0)", opacity: "1", filter: "brightness(1)" },
        },
        "book-out-story-next": {
          "0%": { transform: "perspective(1100px) rotateX(0deg)", filter: "brightness(1)" },
          "100%": { transform: "perspective(1100px) rotateX(44deg)", filter: "brightness(0.9)" },
        },
        "book-in-story-next": {
          "0%": { transform: "perspective(1100px) rotateX(-40deg)", opacity: "0.6", filter: "brightness(0.92)" },
          "100%": { transform: "perspective(1100px) rotateX(0deg)", opacity: "1", filter: "brightness(1)" },
        },
        "book-out-story-prev": {
          "0%": { transform: "perspective(1100px) rotateX(0deg)", filter: "brightness(1)" },
          "100%": { transform: "perspective(1100px) rotateX(-44deg)", filter: "brightness(0.9)" },
        },
        "book-in-story-prev": {
          "0%": { transform: "perspective(1100px) rotateX(40deg)", opacity: "0.6", filter: "brightness(0.92)" },
          "100%": { transform: "perspective(1100px) rotateX(0deg)", opacity: "1", filter: "brightness(1)" },
        },
      },
      animation: {
        "page-settle": "page-settle 420ms cubic-bezier(0.2, 0.9, 0.2, 1)",
        "story-rise": "story-rise 520ms ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "book-out-next": "book-out-next 1.35s cubic-bezier(0.33, 0.02, 0.25, 1) forwards",
        "book-in-next": "book-in-next 1.45s cubic-bezier(0.2, 0.82, 0.22, 1) forwards",
        "book-out-prev": "book-out-prev 1.35s cubic-bezier(0.33, 0.02, 0.25, 1) forwards",
        "book-in-prev": "book-in-prev 1.45s cubic-bezier(0.2, 0.82, 0.22, 1) forwards",
        "book-out-story-next": "book-out-story-next 1.05s cubic-bezier(0.33, 0.02, 0.25, 1) forwards",
        "book-in-story-next": "book-in-story-next 1.15s cubic-bezier(0.2, 0.82, 0.22, 1) forwards",
        "book-out-story-prev": "book-out-story-prev 1.05s cubic-bezier(0.33, 0.02, 0.25, 1) forwards",
        "book-in-story-prev": "book-in-story-prev 1.15s cubic-bezier(0.2, 0.82, 0.22, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
