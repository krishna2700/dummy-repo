// hello.js — A styled welcome script

const RESET  = '\x1b[0m';
const BOLD   = '\x1b[1m';
const CYAN   = '\x1b[36m';
const GREEN  = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE   = '\x1b[34m';
const DIM    = '\x1b[2m';

const width = 50;
const line  = '─'.repeat(width);

function banner(text) {
  const pad = Math.floor((width - text.length) / 2);
  return ' '.repeat(pad) + text;
}

console.log('');
console.log(CYAN + BOLD + '┌' + line + '┐' + RESET);
console.log(CYAN + BOLD + '│' + banner('Welcome to the Project') + ' '.repeat(width - Math.floor((width - 'Welcome to the Project'.length) / 2) - 'Welcome to the Project'.length) + '│' + RESET);
console.log(CYAN + BOLD + '└' + line + '┘' + RESET);
console.log('');

console.log(GREEN  + BOLD + '  Hello, World!' + RESET);
console.log(YELLOW + '  This project includes:' + RESET);
console.log(BLUE   + '    • README.md      ' + DIM + '— React introduction (French)' + RESET);
console.log(BLUE   + '    • README.es.md   ' + DIM + '— React introduction (Spanish)' + RESET);
console.log(BLUE   + '    • hello.js       ' + DIM + '— This welcome script' + RESET);
console.log('');
console.log(DIM    + '  Node version : ' + process.version + RESET);
console.log(DIM    + '  Platform     : ' + process.platform + RESET);
console.log('');
