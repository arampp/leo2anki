/**
 * This bookmarklet makes it possible to transfer words from Leo Trainer to Anki.
 * It is configured for fr-de (French to German) translations, but can easily be
 * adapted to other languages.
 *
 * Prerequisites:
 * - a Leo account (http://www.leo.org/) with a few words saved in the trainer
 * - an Anki account (https://ankiweb.net/account/register)
 *
 * 1. Crunch the following code and add it to your bookmarks
 *    (see http://ted.mielczarek.org/code/mozilla/bookmarklet.html)
 * 2. Run the bookmarklet
 *    (you might have to run it twice, as the first run will lead you to the correct Leo page)
 * 3. Import the downloaded file in Anki using \t as field separator and allowing HTML in fields
 **/

// This is where you can adapt the script for other languages.
// `fromLang` is the language you know already, whereas `toLang` is the language you're learning.
const fromLang = 'en';
const toLang = 'de';

function extractVocabulary(): string[][]  {
  const output = [];
  const matches = document.body.querySelectorAll('.tb-bg-alt-lightgray > tbody > tr');

  for (let index = 0; index < matches.length; index++) {
    const item = matches[index];
    output.push([
      item.querySelector(`td[lang=${fromLang}]`)?.innerHTML ?? '',
      item.querySelector(`td[lang=${toLang}]`)?.innerHTML ?? '',
    ]);
  }

  return output;
}

function downloadTsvFile(filename: string, content: string[][]) {
  const tsv = content.reduce((acc: string, cur: string[]) => acc + cur.join('\t') + '\n', '');

  const a = document.createElement('a');
  a.setAttribute('href', 'data:text/tab-separated-values;charset=utf-8,' + encodeURIComponent(tsv));
  a.setAttribute('download', filename);
  document.body.appendChild(a);
  a.click();
}


const manageFolderUrl = 'https://dict.leo.org/trainer/manageFolder.php' +
    `?lp=${fromLang}${toLang}&lang=${toLang}`;
if (location.href != manageFolderUrl) {
  location.href = manageFolderUrl;
} else {
  downloadTsvFile('vokabeln.csv', extractVocabulary());
}
