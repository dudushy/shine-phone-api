# Graph Report - .  (2026-08-13)

## Corpus Check
- Corpus is ~6,033 words - fits in a single context window. You may not need a graph.

## Summary
- 307 nodes · 465 edges · 17 communities (13 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Page Components
- Angular Build Config
- Growatt API Service
- TypeScript Config
- Angular Dependencies
- Angular CLI Config
- Dev Dependencies
- App Shell Component
- Package Metadata
- Utility Services
- TS Compilation
- Version Sync Script
- Devices Page Logic
- Device Detail Logic
- Plant Detail Logic
- Load Env Script
- Dashboard Logic

## God Nodes (most connected - your core abstractions)
1. `GrowattApiService` - 29 edges
2. `ApiResponse` - 15 edges
3. `compilerOptions` - 15 edges
4. `scripts` - 11 edges
5. `App` - 8 edges
6. `Devices` - 8 edges
7. `GrowattApiError` - 8 edges
8. `shine-phone-api` - 7 edges
9. `StorageService` - 7 edges
10. `options` - 6 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (17 total, 4 thin omitted)

### Community 0 - "Page Components"
Cohesion: 0.10
Nodes (22): Plants, Component, API_ENDPOINTS, API_ERROR_CODES, DEVICE_TYPE_DESCRIPTIONS, DEVICE_TYPE_LABELS, CacheEntry, GrowattApiError (+14 more)

### Community 1 - "Angular Build Config"
Cohesion: 0.06
Nodes (35): build, lint, serve, test, builder, configurations, defaultConfiguration, options (+27 more)

### Community 2 - "Growatt API Service"
Cohesion: 0.19
Nodes (10): GrowattApiService, Injectable, ApiResponse, DeviceEnergyHistoryParams, EnergyHistoryParams, PaginatedData, PaginatedResponse, ReadParameterParams (+2 more)

### Community 3 - "TypeScript Config"
Cohesion: 0.08
Nodes (25): src/lib/index.ts, angularCompilerOptions, enableI18nLegacyMessageIdFormat, strictInjectionParameters, strictInputAccessModifiers, strictTemplates, compileOnSave, compilerOptions (+17 more)

### Community 4 - "Angular Dependencies"
Cohesion: 0.08
Nodes (25): @angular/common, @angular/compiler, @angular/core, @angular/forms, @angular/platform-browser, @angular/router, @ngx-translate/core, @ngx-translate/http-loader (+17 more)

### Community 5 - "Angular CLI Config"
Cohesion: 0.09
Nodes (21): analytics, packageManager, schematicCollections, cli, newProjectRoot, projects, shine-phone-api, $schema (+13 more)

### Community 6 - "Dev Dependencies"
Cohesion: 0.09
Nodes (23): @angular/build, @angular/compiler-cli, angular-eslint, eslint, @eslint/js, jsdom, devDependencies, @angular/build (+15 more)

### Community 7 - "App Shell Component"
Cohesion: 0.13
Nodes (7): App, appConfig, routes, Component, environment, APP_VERSION, authInterceptor()

### Community 8 - "Package Metadata"
Cohesion: 0.11
Nodes (17): engines, node, name, packageManager, private, scripts, build, format (+9 more)

### Community 9 - "Utility Services"
Cohesion: 0.17
Nodes (5): StorageService, Injectable, Theme, ThemeService, Injectable

### Community 10 - "TS Compilation"
Cohesion: 0.20
Nodes (9): src/**/*.spec.ts, ./tsconfig.json, compilerOptions, outDir, types, exclude, extends, include (+1 more)

### Community 11 - "Version Sync Script"
Cohesion: 0.42
Nodes (8): assertVersion(), main(), paths, readJson(), rootDir, syncPackageLockVersion(), syncVersionFiles(), writeJson()

### Community 15 - "Load Env Script"
Cohesion: 0.40
Nodes (3): environmentTsPath, envPath, rootDir

## Knowledge Gaps
- **111 isolated node(s):** `$schema`, `version`, `packageManager`, `analytics`, `newProjectRoot` (+106 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `GrowattApiService` connect `Growatt API Service` to `Page Components`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Angular Dependencies` to `Package Metadata`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev Dependencies` to `Package Metadata`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `$schema`, `version`, `packageManager` to the rest of the system?**
  _111 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Page Components` be split into smaller, more focused modules?**
  _Cohesion score 0.09615384615384616 - nodes in this community are weakly interconnected._
- **Should `Angular Build Config` be split into smaller, more focused modules?**
  _Cohesion score 0.06050420168067227 - nodes in this community are weakly interconnected._
- **Should `TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._