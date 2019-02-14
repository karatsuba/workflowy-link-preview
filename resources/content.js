const NAME_CONTENT = '.name .content';

const content = () => document.querySelectorAll(NAME_CONTENT);

const parseTarget = (mutation) => {
    console.log(mutation.target, mutation.target.innerText);
}

const init = () => {
    var observer = new MutationObserver((mutations, observer) => {
        // going to send all nodes to react
        mutations.forEach(parseTarget);
    });
    
    observer.observe(document.getElementById('app'), {
        childList: true,
        subtree: true
    });
}

init();