# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Liyue UI is a React 18 component library built with TypeScript and Vite. It provides ~27 customizable UI components with i18n support (zh-CN and en-US).

## Common Commands

```bash
npm run dev         # Start development server
npm run build       # Build library (outputs to dist/)
npm run build:lib   # Alias for build
npm run preview     # Preview production build
npm run typecheck   # TypeScript type checking
npm run test:env    # Verify Node.js environment configuration
```

## Architecture

### Entry Point
- `src/index.ts` - Main export file for the library

### Component Structure
Each component lives in its own folder under `src/components/` with pattern:
- `index.ts` - Re-export
- `ComponentName.tsx` - Main component
- `ComponentName.css` - Styles

### i18n System
- `src/i18n/index.tsx` - I18nProvider and useI18n hook
- Wrap app with `<I18nProvider locale="zh-CN">` to enable i18n
- use `useI18n()` hook to access `locale`, `setLocale`, and `t` translation function

### Styles
- `src/styles/variables.css` - CSS custom properties
- `src/styles/base.css` - Base styles
- `src/styles/theme.css` - Theme configuration

### Path Aliases
- `@` maps to `src/` (configured in vite.config.ts and tsconfig.json)

## Build Configuration

The library builds to multiple formats:
- `dist/liyue-ui.esm.js` - ES module
- `dist/liyue-ui.umd.js` - UMD
- `dist/index.d.ts` - TypeScript declarations

Build configuration (vite.config.ts) excludes `.stories.tsx`, `.demo.tsx`, and `App.tsx` from type generation.

## Component Categories

- **Form**: Button, Input, Checkbox, Radio, Switch, Slider, Select
- **Layout**: Container, Grid, GridItem, Flex, Stack, Divider
- **Data Display**: Table, Card, Avatar, Badge, Tag, Progress, Skeleton, Steps
- **Navigation**: Menu, Tabs, Breadcrumb, Pagination
- **Feedback**: Modal, Drawer, Toast, Alert, Tooltip
