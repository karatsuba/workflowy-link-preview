console.log('HELLO', window);


window.fetch('https://github.com/karatsuba')
    .then(r => r.text())
    .then((html) => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");
        console.dir(doc);
    });

