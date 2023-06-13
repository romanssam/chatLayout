const kebab = document.querySelector('[data-toggle="ChatBodyKebab"]')
const kebabNode = document.querySelector('.chatKebab')

document.addEventListener('click', (e) => {
        if (!kebab.contains(e.target)) {
            kebabNode.classList.remove('shown');
        }
    });


kebab.addEventListener('click', event => {
  kebabNode.classList.toggle('shown');
})