const kebab = document.querySelector('[data-toggle="ChatBodyKebab"]')
const kebabNode = document.querySelector('.chatKebab')

const searchButton = document.querySelector('[data-toggle="ChatBodySearch"]')
const searchNode = document.querySelector('.searchBar')

const searchClose = document.querySelector('[data-toggle="searchBarClose"]')

const checkbox = document.getElementById('checkbox-ios')

const infoButton = document.querySelector('.chatBody__info')
const infoNode = document.querySelector('.infoBar')

const infoClose = document.querySelector('[data-toggle="infoBarClose"]')

checkbox.addEventListener('change', () => {
if(checkbox.checked) {
  console.log('checked')
} else {
  console.log('not checked')
}
})

function toggleClass(element, className) {
  element.classList.toggle(className);
}

function removeClass(element, className) {
  element.classList.remove(className);
}

function handleClickOutside(element, event) {
  if (!element.contains(event.target)) {
    removeClass(element, 'shown');
  }
}

kebab.addEventListener('click', (event) => {
  toggleClass(kebabNode, 'shown');
});

searchButton.addEventListener('click', (event) => {
  toggleClass(searchNode, 'shown');
});

searchClose.addEventListener('click', () => {
  removeClass(searchNode, 'shown');
});

infoButton.addEventListener('click', (event) => {
  toggleClass(infoNode, 'shown');
});

infoClose.addEventListener('click', () => {
  removeClass(infoNode, 'shown');
});

document.addEventListener('click', (event) => {
  handleClickOutside(kebab, event);
});


const initTabs = (containerSelector, tabSelector, tabAreaSelector, currentTabClass) => {
  const container = document.querySelector(containerSelector);
  const tabs = Array.from(container.querySelectorAll(tabSelector));
  const tabAreas = Array.from(container.querySelectorAll(tabAreaSelector));

  const showTab = (tabIndex) => {
    tabs.forEach((tab, index) => {
      tab.classList.toggle(currentTabClass, index === tabIndex);
    });

    tabAreas.forEach((tabArea, index) => {
      tabArea.style.display = index === tabIndex ? 'block' : 'none';
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      showTab(index);
    });
  });

  showTab(0);
};

initTabs('.infoBarGroup__tabs', '.infoBarGroup__tab', '.infoBarGroup__tabArea', 'current');
