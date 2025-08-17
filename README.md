# React Component Development Assignment

This repository contains **InputField** and **DataTable** React components built with **React + TypeScript + TailwindCSS** and documented in **Storybook**.

## Quickstart

```bash
# 1) Install deps
npm i

# 2) Run the app
npm run dev

# 3) Run Storybook
npm run storybook
```

## Scripts

- `npm run dev` – Vite dev server
- `npm run build` – Build app
- `npm run preview` – Preview prod build
- `npm run storybook` – Storybook dev server
- `npm run build-storybook` – Build static Storybook
- `npm run chromatic` – Publish Storybook to Chromatic (add your project token)

## Folder Structure

```
src/
  components/
    input-field/
      InputField.tsx
      InputField.stories.tsx
    data-table/
      DataTable.tsx
      DataTable.stories.tsx
  lib/
    cn.ts
  App.tsx
  index.css
  main.tsx
.storybook/
  main.ts
  preview.ts
```

## Theming & Accessibility

- Light/Dark theming via a global **theme toolbar** in Storybook (adds `dark` class).
- Focus rings are consistent with the `.focus-ring` utility.
- Inputs are properly labelled (`label` + `htmlFor`), error state uses `aria-invalid` and `aria-describedby`.
- Table headers are `role="columnheader"`; rows `role="row"`; cells `role="cell"`.

## Deploying your Storybook

### Chromatic (recommended)
1. Create a project at https://www.chromatic.com/ and copy **project token**.
2. Put it in `package.json` `chromatic` script.
3. Run: `npm run build-storybook && npm run chromatic`.

### Vercel
1. Run `npm run build-storybook` (outputs `storybook-static`).
2. Deploy that folder on Vercel as a static site.
