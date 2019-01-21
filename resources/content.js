const NAME_CONTENT = '.name .content';

const content = () => document.querySelectorAll(NAME_CONTENT);

const items = content();

console.log(document.querySelectorAll(NAME_CONTENT));

setTimeout(() => {
    console.log(document.querySelectorAll(NAME_CONTENT));
}, 4000);
