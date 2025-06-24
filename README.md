# markdown-pdf-enhanced README

The markdown-pdf-enhanced extension is designed to enhance the functionality of Markdown files in Visual Studio Code by providing additional features for exporting and formatting Markdown documents. This extension strives to offer a more updated, maintainable and customizable experience compared to the original `markdown-pdf` extension which hasn't been updated in years and I found convoluted.

## Features

### Command Palette

This extension provides the following functionality :

* **Export to PDF**: Convert Markdown files to PDF format with a clean styling and customistation options.
* **Export to HTML**: Convert Markdown files to HTML format with styling options. `WIP`
* **Export to both PDF and HTML**: Allows users to export their Markdown files to both formats simultaneously. `WIP`

### Suppoted Markdown Extended Features

#### **Mermaid Diagrams**

Support for Mermaid diagrams, allowing users to create flowcharts, sequence diagrams, and more directly within their Markdown files.

```markdown
    ```mermaid
    flowchart LR
        Start --> Stop
    ```
```

#### **PlantUML Diagrams** `WIP`

Support for PlantUML diagrams, enabling users to create UML diagrams, class diagrams, and other types of diagrams within their Markdown files.

```markdown
```

#### **Container Blocks**

Support for the following containers with special formatting:

* Spoiler
* Warning
* Info
* Tip `WIP`
* Danger `WIP`

```markdown
::: warning
*here be dragons*
:::

::: spoiler click me
*content*
:::
```

#### Katex Math

Support for katex style mathematical expressions and formulas.

```markdown
$E = mc^2$
```

#### Emojis

Supports emojis.

```markdown
:satellite:
```

#### Subscript

```markdown
H~2~0
```

#### Superscript

```markdown
29^th^
```

#### Footnotes `Being assessed for removal`

```markdown
Here is a footnote reference,[^1] and another.[^longnote]

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.

    Subsequent paragraphs are indented to show that they
belong to the previous footnote.
```

#### Tasklists

```markdown
- [ ] Item1
- [x] Item1
- [ ] Item1
```

#### Custom CSS stylesheets `WIP`

The idea is to allow you to be able to tailor the look and feel of your PDF using a CSS stylesheet example.

#### Custom Headers and Footers `WIP`

Would allow you to set anything you want in them. With some macros available for author, date, ...

#### Offline Usability `WIP`

Would let you use the whole tool with no internet connection.

## Requirements

At the moment, this extension does not have any specific requirements beyond Visual Studio Code and an internet connection for fetching external libraries. `Later on, we will add support for plantuml, local libraries and offline usage.`

## Extension Settings `WIP`

Users can customize the behavior of the extension through the settings in Visual Studio Code. The following options are available:

### `markdownPdfEnhanced.externalModules`

The section allows users to specify path to the external modules that will be used for the conversion process. This is useful for users who want to use offline versions of the libraries or have specific requirements for their Markdown processing.

* `markdownPdfEnhanced.externalModules.mermaidPath`: Custom path to the Mermaid `mermaid.esm.min.mjs` file.
* `markdownPdfEnhanced.externalModules.plantUmlPath`: Custom path to the PlantUML `plantuml` server or local jar file.
* `markdownPdfEnhanced.externalModules.plantUmlPathIsLocal`: Boolean flag to indicate whether the provided `plantUmlPath` is a local jar file or a server URL. If set to `true`, the extension will treat the path as a local file; otherwise, it will treat it as a URL.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Currently pre version 1, basic conversion works, no pretty styles or configuration yet.

### *No Release Yet*

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
