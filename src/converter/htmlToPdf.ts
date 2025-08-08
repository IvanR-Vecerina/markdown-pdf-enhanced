import puppeteer from 'puppeteer';
import * as fs from 'fs/promises';
import { log } from '../helpers/loggingUtils';

export async function convertHtmlToPdf(htmlPath: string, pdfPath: string, options?: {
  headerTemplate?: string;
  footerTemplate?: string;
  displayHeaderFooter?: boolean;
  margin?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}) {
    log(`Converting HTML to PDF: ${htmlPath} -> ${pdfPath}`);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

    log('Browser launched successfully');

    log(options ? `Options provided: ${JSON.stringify(options)}` : 'No options provided');

  const page = await browser.newPage();
  const html = await fs.readFile(htmlPath, 'utf-8');

    log('HTML content read successfully');

  await page.setContent(html, { waitUntil: 'networkidle0' });

    log('HTML content set on the page');

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: options?.displayHeaderFooter ?? true,
    headerTemplate: options?.headerTemplate ?? `<span></span>`,
    footerTemplate: options?.footerTemplate ?? `
      <div style="font-size:10px; width:100%; text-align:right; padding-right:1cm; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;">
        Page <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>
    `,
    margin: options?.margin ?? { top: '1.5cm', bottom: '1.5cm', left: '1cm', right: '1cm' },
  });

    log(`PDF generated successfully: ${pdfPath}`);

  await browser.close();

    log('Browser closed successfully');
}
