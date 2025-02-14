# EARLY DRAFT -- SUBJECT TO CHANGE

# Elevate - HubSpot Default CMS Theme

Elevate is HubSpot's default CMS theme, designed to provide a modern, flexible, and customizable foundation for building beautiful websites on the HubSpot CMS platform.

Because this theme is built using HubSpot's project based theme framework, it does not appear inside of the design manager. This repository is designed to give developers access to the source code so that they can easily customize the theme to suit their needs, use it to create a child theme of Elevate, or just use it as a reference for building custom themes.

## Overview

Elevate is built with modern development practices in mind, utilizing:
- Vite for fast and efficient builds
- PostCSS for modern CSS processing
- HubL templating for dynamic content
- TypeScript support
- Built-in testing with Vitest

## Prerequisites

- [Node.js](https://nodejs.org) (version specified in `.node-version`)
- [HubSpot CLI](https://developers.hubspot.com/docs/cms/developer-reference/local-development-cli)

## Getting Started

1. Clone this repository:
   ```bash
   git clone [repository-url]
   cd cms-elevate-theme-public
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure your HubSpot CLI:
   ```bash
   hs init
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Available Scripts

- `npm start` - Starts the local development server
- `npm run build` - Builds the theme for production
- `npm run upload` - Uploads the theme to HubSpot
- `npm run build-upload` - Builds and uploads the theme in one command
- `npm test` - Runs the test suite

## Project Structure

```
├── src/
│   └── unified-theme/     # Main theme directory
│       ├── fields.json    # Theme field definitions
│       ├── theme.json     # Theme configuration
│       ├── templates/     # HubL templates
│       ├── sections/      # Theme sections
│       └── helpers/       # Helper functions and variables
├── build/                 # Build configuration
├── lang/                  # Language files
└── vite.config.ts        # Vite configuration
```

## Development

The theme uses HubSpot's local development server for real-time preview of your changes. When you run `npm start`, you can view your changes at the local development URL provided by the CLI.


## Contributing

Note that this theme is maintained by HubSpot. It is configured to sync with an internal repository and was built so that developers can have access to the source code as the theme itself is not available in the design manager.

No PR's will be accepted / considered / or reviewed.

Feel free to open issues if you notice any bugs or have feature requests (unofficially supported) -- however if you notice bugs the recommended way to get them fixed is to open a ticket with HubSpot's support team (officially supported).

## License

This project is licensed under the Apache-2.0 License - see the LICENSE file for details.

## Support

Learn more about HubSpot CMS:
- [Building with React on Hubspot](https://github.hubspot.com/cms-react/)
- Check the [HubSpot Developer Documentation](https://developers.hubspot.com/)
- Visit the [HubSpot Community](https://community.hubspot.com/)
