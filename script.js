const menuItems = document.querySelectorAll('.menu-item');
const sections = document.querySelectorAll('.content-section');
let currentIndex = 0;

function updateMenu(index) {
    menuItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
            item.querySelector('span:first-child').textContent = 
                '► ' + item.querySelector('span:first-child').textContent.replace('► ', '').trim();
        } else {
            item.classList.remove('active');
            item.querySelector('span:first-child').textContent = 
                '  ' + item.querySelector('span:first-child').textContent.replace('► ', '').trim();
        }
    });
}

function showSection(sectionId) {
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

function navigateUp() {
    currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
    updateMenu(currentIndex);
}

function navigateDown() {
    currentIndex = (currentIndex + 1) % menuItems.length;
    updateMenu(currentIndex);
}

function selectCurrent() {
    const sectionId = menuItems[currentIndex].getAttribute('data-section');
    showSection(sectionId);
}

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            e.preventDefault();
            navigateUp();
            break;
        case 'ArrowDown':
            e.preventDefault();
            navigateDown();
            break;
        case 'Enter':
            e.preventDefault();
            selectCurrent();
            break;
        case 'F1':
            e.preventDefault();
            currentIndex = 0;
            updateMenu(currentIndex);
            selectCurrent();
            break;
        case 'F2':
            e.preventDefault();
            currentIndex = 1;
            updateMenu(currentIndex);
            selectCurrent();
            break;
        case 'F3':
            e.preventDefault();
            currentIndex = 2;
            updateMenu(currentIndex);
            selectCurrent();
            break;
        case 'F4':
            e.preventDefault();
            currentIndex = 3;
            updateMenu(currentIndex);
            selectCurrent();
            break;
        case 'Escape':
            e.preventDefault();
            currentIndex = 0;
            updateMenu(currentIndex);
            showSection('about');
            break;
    }
});

menuItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentIndex = index;
        updateMenu(currentIndex);
        selectCurrent();
    });
});

updateMenu(0);
showSection('about');

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

const SECRET_HASHES = {
    "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824": "content1",
    "b245072158a81fba8388143c6e6bb4074019ae04b987230c779b3b497b50726c": "content2"
};

async function checkSecretWord() {
    const input = document.getElementById('secretInput');
    const message = document.getElementById('secretMessage');
    const secretContent = document.getElementById('secretContent');
    const userInput = input.value.trim();
    
    if (userInput === '') {
        message.textContent = '⚠ ERROR: Input field is empty';
        message.className = 'secret-message error';
        return;
    }
    
    const inputHash = await sha256(userInput);
    
    if (SECRET_HASHES[inputHash]) {
        const contentId = SECRET_HASHES[inputHash];
        
        message.textContent = '✓ ACCESS GRANTED: Secret unlocked!';
        message.className = 'secret-message success';
        
        document.querySelectorAll('[id^="secretContent"]').forEach(el => {
            el.style.display = 'none';
        });
        
        const targetContent = document.getElementById(contentId);
        if (targetContent) {
            targetContent.style.display = 'block';
        }
        
        input.disabled = true;
        
    } else {
        message.textContent = '✗ ACCESS DENIED: Incorrect code';
        message.className = 'secret-message error';
        
        document.querySelectorAll('[id^="secretContent"]').forEach(el => {
            el.style.display = 'none';
        });
        
        input.value = '';
        input.focus();
    }
}

document.getElementById('checkSecret')?.addEventListener('click', checkSecretWord);

document.getElementById('secretInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkSecretWord();
    }
});