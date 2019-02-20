import {Parser} from './services/Parser';

Parser.create().parseURL('https://github.com/karatsuba').then(console.dir);
