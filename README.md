Workflowy link preview

---

DEV INFO:

mutation observer middleware used on content script proxy store

logger, thunk, httpMiddleware used on background script store

---

TODO:

- configure eslint (https://javascriptplayground.com/typescript-eslint/)

- ~~probably mutations is kind of side effects, should handle via redux-thunk~~

- ~~consider creating redux mutation observer middleware package~~

- ~~remove image preview if node was deleted~~

- ~~connect content, background and popup scripts with redux store~~

- add suport for simple image link (check response contentType)

- improve components render performance (don't rerender twice, etc)

- add basic on/off/clear popup actions

- cache requests for the same url

- move Mutation Observer middleware to separate folder

- consider creating Redux Mutation Observer package and load it to npm, use in the app after

- consider using rambda and rewrite some complex logic into functional style (http://randycoulman.com/blog/2016/05/31/thinking-in-ramda-combining-functions/)