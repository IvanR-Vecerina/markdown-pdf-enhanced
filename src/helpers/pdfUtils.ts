import { getConfig } from "./extensionUtils";

/**
 * Applies macros to the provided HTML string, used for generating PDF headers and footers.
 * @param html The HTML string to apply macros to.
 * @param name The name of the file, used for the filename macro.
 * @returns The HTML string with macros replaced.
 * @todo Add suppot for author macro and others
 */
export function applyMacros(html: string, name: string): string {
  const logoPath: string | undefined = getConfig("pdfOptions.logoPath");
  const logoHtmlPath = logoPath ? logoPath.replace(/\\/g, "/") : "";
  const dateString = new Date().toLocaleDateString().slice(0, 10);

  return html
    .replace(/\{Logo\}/g, `<img class='logo' src='${logoHtmlPath}' alt='logo'/>`)
    .replace(/\{FileName\}/g, `<span class='fileName'>${name}</span>`)
    .replace(/\{Date\}/g, `<span class='date'>${dateString}</span>`)
    .replace(/\{PageNumber\}/g, '<span class="pageNumber"></span>')
    .replace(/\{TotalPages\}/g, '<span class="totalPages"></span>');
}

/**
 * Generates the HTML for the PDF header.
 * @returns The HTML string for the header.
 */
export function getHeader(): string {
  const headerLeft: string | undefined = getConfig("pdfOptions.header.left");
  const headerCenter: string | undefined = getConfig(
    "pdfOptions.header.center"
  );
  const headerRight: string | undefined = getConfig("pdfOptions.header.right");

  return `
<div class="header" style="width:100%; font-size:12px; font-family:Segoe UI, Helvetica, Arial, sans-serif; padding:4px 20px; box-sizing:border-box; display:table;">
  <div class="header-left" style="display:table-cell; text-align:left; width:33%; vertical-align:middle;">
    ${headerLeft ?? ""}
  </div>
  <div class="header-center" style="display:table-cell; text-align:center; width:34%; vertical-align:middle;">
    ${headerCenter ?? ""}
  </div>
  <div class="header-right" style="display:table-cell; text-align:right; width:33%; vertical-align:middle;">
    ${headerRight ?? ""}
  </div>
</div>
`;
}

/**
 * Generates the HTML for the PDF footer.
 * @returns The HTML string for the footer.
 */
export function getFooter(): string {
  const footerLeft: string | undefined = getConfig("pdfOptions.footer.left");
  const footerCenter: string | undefined = getConfig(
    "pdfOptions.footer.center"
  );
  const footerRight: string | undefined = getConfig("pdfOptions.footer.right");

  return `
<div class="footer" style="width:100%; font-size:12px; font-family:Segoe UI, Helvetica, Arial, sans-serif; padding:4px 20px; box-sizing:border-box; display:table;">
  <div class="footer-left" style="display:table-cell; text-align:left; width:33%; vertical-align:middle;">
    ${footerLeft ?? ""}
  </div>
  <div class="footer-center" style="display:table-cell; text-align:center; width:34%; vertical-align:middle;">
    ${footerCenter ?? ""}
  </div>
  <div class="footer-right" style="display:table-cell; text-align:right; width:33%; vertical-align:middle;">
    ${footerRight ?? ""}
  </div>
</div>
`;
}

/**
 * Retrieves the margins for the PDF from the configuration.
 * @returns An object containing the top, bottom, left, and right margins.
 */
export function getMargins(): {
  top: string;
  bottom: string;
  left: string;
  right: string;
} {
  const marginTop: string | undefined = getConfig("pdfOptions.margin.top");
  const marginBottom: string | undefined = getConfig("pdfOptions.margin.bottom");
  const marginLeft: string | undefined = getConfig("pdfOptions.margin.left");
  const marginRight: string | undefined = getConfig("pdfOptions.margin.right");

  return {
    top: marginTop ?? "1.5cm",
    bottom: marginBottom ?? "1.5cm",
    left: marginLeft ?? "1cm",
    right: marginRight ?? "1cm",
  };
}
