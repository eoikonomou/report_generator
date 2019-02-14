const puppeteer = require('puppeteer');
const dateUtils = require('../utils/dateUtils');
const fs = require('fs');

process.on('UnhandledPromiseRejectionWarning', (e) => console.log(e));

async function printPDF(saveFile) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    let path = `./pdfs/report_${dateUtils.getCurrentDate()}.pdf`;
    await page.goto('https://news.ycombinator.com/', { waitUntil: 'networkidle0' });
    await page.pdf({ format: 'A4', path });
    await page.pdf({ format: 'A4' });
    await browser.close();
    return path;
}

async function handleReportGeneration(req, res) {
    let pdfLocation = await printPDF(req.body.saveFile);
    var pdf = fs.createReadStream(pdfLocation);
    var stat = fs.statSync(pdfLocation);
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `${req.body.download ? 'attachment; ' : ''}filename=${pdfLocation.split('/')[2]}`);
    pdf.pipe(res);
}

module.exports = {
    handleReportGeneration
}
