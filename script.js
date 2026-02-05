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