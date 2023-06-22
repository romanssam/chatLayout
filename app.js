const addClass = (element, className) => {
  element.classList.add(className);
};

const removeClass = (element, className) => {
  element.classList.remove(className);
};

const toggleClass = (element, className) => {
  element.classList.toggle(className);
};

const handleClickOutside = (element, event) => {
  if (!element.contains(event.target)) {
    removeClass(element, 'shown');
  }
};

const chatGroups = Array.from(document.querySelectorAll('.chatGroup'));
const preview = document.querySelector('.preview');
const chatBody = document.querySelector('.chatBody');
let lastClickedGroup = null;

const handleGroupClick = (group) => {
  if (lastClickedGroup) {
    removeClass(lastClickedGroup, 'current');
  }

  addClass(group, 'current');
  preview?.remove();
  chatBody.style.display = 'flex';
  lastClickedGroup = group;
};

chatGroups.forEach(group => {
  group.addEventListener('click', () => {
    handleGroupClick(group);
  });
});

const emojis = [
  '😀', '😃', '😄', '😊', '😎', '😍', '😘', '😆',
  '😉', '😋', '😜', '😝', '😏', '😒', '😌', '😔',
  '😞', '😣', '😢', '😭', '😂', '😲', '😠', '😡',
  '😳', '😱', '😴', '😈', '👿', '💀', '👻', '👽',
  '👾', '💩', '🙈', '🙉', '🙊', '👦', '👧', '👨',
  '👩', '👴', '👵', '👶', '👱', '👮', '👲', '👳',
  '👷', '👸', '💂', '🎅', '👰', '🤵', '👼', '🎃'
];

const emojiContainer = document.querySelector('.emojiContainer');
const messageInput = document.querySelector('.chatBody__messageInput');
const sendMessageButton = document.querySelector('.chatBody__sendMessage')

messageInput.addEventListener('input', (event) => {
  const value = event.target.value;

  if(value.length >= 1) {
    sendMessageButton.classList.add('shown')
  } else {
    sendMessageButton.classList.remove('shown')
  }
})

const handleEmojiClick = (emoji) => {
  messageInput.value += emoji;
};

emojis.forEach((emoji) => {
  const emojiElement = document.createElement('span');
  emojiElement.textContent = emoji;
  emojiElement.classList.add('emoji');
  emojiElement.addEventListener('click', () => handleEmojiClick(emoji));
  emojiContainer.appendChild(emojiElement);
});

const checkbox = document.getElementById('checkbox-ios');

checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    console.log('checked');
  } else {
    console.log('not checked');
  }
});

const initTabs = (containerSelector, tabSelector, tabAreaSelector, currentTabClass) => {
  const container = document.querySelector(containerSelector);
  const tabs = Array.from(container.querySelectorAll(tabSelector));
  const tabAreas = Array.from(container.querySelectorAll(tabAreaSelector));

  const showTab = (tabIndex) => {
    tabs.forEach((tab, index) => {
      toggleClass(tab, currentTabClass, index === tabIndex);
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

const kebab = document.querySelector('[data-toggle="ChatBodyKebab"]');
const kebabNode = document.querySelector('.chatKebab');

const groupSearch = document.querySelector('.groupSearch');

const searchButton = document.querySelector('[data-toggle="ChatBodySearch"]');
const searchNode = document.querySelector('.searchBar');
const searchClose = document.querySelector('[data-toggle="searchBarClose"]');

const profileButton = document.querySelector('[data-toggle="ChatBodyProfile"]');
const profileNode = document.querySelector('.profileBar');
const profileClose = document.querySelector('[data-toggle="profileBarClose"]');

const infoButton = document.querySelector('.chatBody__info');
const infoNode = document.querySelector('.infoBar');
const infoClose = document.querySelector('[data-toggle="infoBarClose"]');

const emojiButton = document.querySelector('.smiles');

const expandGroup = document.querySelector('.expandGroup');
const chatGroup = document.querySelector('.houseChat__groups');

const imageUploadInput = document.getElementById('uploadProfilePhoto');
const imageContainer = document.querySelector('.avatarPlace');

const handleFileUpload = (event) => {
  const file = event.target.files[0];

  if(file && file.type.startsWith('image/')) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const img = document.createElement('img');
      img.src = reader.result;

      localStorage.setItem('avatarUrl', reader.result)

      imageContainer.innerHTML = '';
      imageContainer.appendChild(img);
    })
    reader.readAsDataURL(file);
  } else {
    alert('Недопустимый формат файла, загрузите изображение')
    imageUploadInput.value = ''
  }
}

imageUploadInput.addEventListener('change', handleFileUpload)

expandGroup.addEventListener('click', () => {
  const isCollapsed = chatGroup.classList.contains('collapsed');

  chatGroup.classList.toggle('collapsed');

  if (isCollapsed) {
    localStorage.setItem('asideState', 'active');
  } else {
    localStorage.setItem('asideState', 'hide');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const state = localStorage.getItem('asideState');
  const avatarUrl = localStorage.getItem('avatarUrl');

  if(avatarUrl) {
    const img = document.createElement('img')
    img.src = avatarUrl;

    imageContainer.appendChild(img)
  }

  if (state === 'active') {
    chatGroup.classList.remove('collapsed');
  } else {
    chatGroup.classList.add('collapsed');
  }
});

const groupSearchClickHandler = () => {
  const isCollapsed = chatGroup.classList.contains('collapsed');
  chatGroup.classList.remove(isCollapsed ? 'collapsed' : null)
}

groupSearch.addEventListener('click', groupSearchClickHandler)

kebab.addEventListener('click', () => {
  toggleClass(kebabNode, 'shown');
});

searchButton.addEventListener('click', () => {
  toggleClass(searchNode, 'shown');
});

profileButton.addEventListener('click', () => {
  profileNode.classList.toggle('shown')
});

profileClose.addEventListener('click', () => {
  removeClass(profileNode, 'shown');
});

searchClose.addEventListener('click', () => {
  removeClass(searchNode, 'shown');
});

infoButton.addEventListener('click', () => {
  toggleClass(infoNode, 'shown');
});

emojiButton.addEventListener('click', () => {
  toggleClass(emojiContainer, 'shown');
});

infoClose.addEventListener('click', () => {
  removeClass(infoNode, 'shown');
});

document.addEventListener('click', (event) => {
  handleClickOutside(kebab, event);
});