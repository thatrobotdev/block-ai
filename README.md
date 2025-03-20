# Block AI

A browser extension that blocks AI features on websites.

[Homepage](https://www.jameskerrane.com/block-ai)

## Supported websites

- <https://google.com> and [all Google search domains](https://www.google.com/supported_domains).
- <https://duckduckgo.com>

## Build instructions

### Building the extension

Tested with node v22.12.0

1. Install all of the dependencies in the project.

    ```sh
    npm install
    ```

2. Build the extension to the `build/chrome` and `build/firefox` directories

    ```sh
    npm run build
    ```

### Testing the extension

#### Linting

##### Firefox

```sh
npm run lint:firefox
```

##### Chrome
Not yet supported.

#### Running

##### Chrome

```sh
npm run start:chrome
```

##### Firefox

```sh
npm run start:firefox
```

## License

This extension is licensed under the MIT License, [which you can read here](LICENSE).

The logo, located in the following directories:

- [`chrome/icons`](chrome/icons)
- [`firefox/icons`](firefox/icons)

is the "Search Off" icon from Material Symbols by Google, which are licensed under the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.html). The license is distributed alongside the icons in their respective folders and on extension build.
