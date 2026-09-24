# Aurora Theme Studio

The design system now supports a palette-based theme architecture.

## Create a new visual version

1. Open **Customize theme** from the palette button in the top bar.
2. Choose one of the built-in presets: Aurora, Ocean, Emerald, Plum, or Sunset.
3. Switch between Light, Dark, and System.
4. Change any semantic color. The active preset becomes **Custom** automatically.
5. Colors are persisted in LocalStorage under `aurora-theme-*` keys.

## Add another preset in code

Edit `contexts/ThemeContext.tsx` and add an object to `THEME_PRESETS` with the same semantic token names for `light` and `dark`.

The important tokens are:

- `primary`, `primaryStrong`, `primaryInk`
- `secondary`, `accent`
- `bg`, `surface`, `surface2`, `surface3`
- `border`, `borderStrong`
- `text`, `textSoft`, `textFaint`
- `success`, `warning`, `danger`, `info`
- `successBg`, `warningBg`, `dangerBg`, `infoBg`

Components should continue using semantic CSS variables such as `var(--primary)` instead of hard-coded colors. Derived brand/status backgrounds are calculated automatically from the active palette.
