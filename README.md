# Downbeat Academy

This is the monorepo for all Downbeat Academy projects, managed with Yarn workspaces.

## Contents

-   Apps
    -   `www`: Main Downbeat Academy website
    -   `sanity-cms`: Instance of the Sanity Studio for managing content on `www`
    -   `cadence-docs`: Documentation for the Cadence Design System
-   Packages
    -   `cadence-core`: Primary library for Cadence components and assets
    -   `cadence-icons`: (Coming soon) Icon library for the Cadence Design System
    -   `cadence-tokens`: Core tokens managed and built with `style-dictionary`
    -   `cadence-utils`: (Coming soon) Utility library for the Cadence Design system
    -   `typeface-favorit`: Package for sharing the ABC Favorit typeface
    -   `typeface-tiempos-text`: Package for sharing the Tiempos Text typeface

## Other notes

-   Versioning manged with changesets
-   _Most_ apps and packages (if applicable) deploy to Vercel
