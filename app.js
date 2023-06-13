const kebab = document.querySelector('[data-toggle="ChatBodyKebab"]')
const kebabNode = document.querySelector('.chatKebab')

const searchButton = document.querySelector('[data-toggle="ChatBodySearch"]')
const searchNode = document.querySelector('.searchBar')

const searchClose = document.querySelector('[data-toggle="searchBarClose"]')

document.addEventListener('click', (e) => {
        if (!kebab.contains(e.target)) {
            kebabNode.classList.remove('shown');
        }
    });



kebab.addEventListener('click', event => {
  kebabNode.classList.toggle('shown');
})

searchButton.addEventListener('click', event => {
  searchNode.classList.toggle('shown')
})

searchClose.addEventListener('click', () => {
  searchNode.classList.remove('shown')
})