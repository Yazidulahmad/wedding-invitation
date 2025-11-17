// Gallery Data dengan kategori
const galleryImages = [
    {
        src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "romantic"
    },
    {
        src: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "outdoor"
    },
    {
        src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "casual"
    },
    {
        src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "romantic"
    },
    {
        src: "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "outdoor"
    },
    {
        src: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "casual"
    },
    {
        src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "romantic"
    },
    {
        src: "https://images.unsplash.com/photo-1520637836861-8bfd2c226f39?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "outdoor"
    },
    {
        src: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        category: "casual"
    }
];

// Navigation Configuration
const navigationConfig = [
    { id: 'cover', icon: 'home', label: 'Cover' },
    { id: 'opening', icon: 'book-open', label: 'Pembuka' },
    { id: 'invitation', icon: 'calendar', label: 'Acara' },
    { id: 'gallery', icon: 'image', label: 'Galeri' },
    { id: 'address', icon: 'map-pin', label: 'Lokasi' },
    { id: 'envelope', icon: 'gift', label: 'Amplop' },
    { id: 'closing', icon: 'heart', label: 'Penutup' },
    { id: 'countdown', icon: 'clock', label: 'Countdown' },
    { id: 'wishes', icon: 'message-circle', label: 'Ucapan' }
];

// Initialize Feather Icons
function initializeFeatherIcons() {
    feather.replace();
}

// Collage Gallery Functionality
let currentCategory = 'all';

function initializeCollageGallery() {
    const collageGrid = document.getElementById('collageGrid');
    const collageNav = document.getElementById('collageNav');
    
    // Clear existing content
    collageGrid.innerHTML = '';
    collageNav.innerHTML = '';
    
    // Create category buttons
    const categories = ['all', 'romantic', 'outdoor', 'casual'];
    const categoryNames = {
        'all': 'Semua',
        'romantic': 'Romantis',
        'outdoor': 'Outdoor',
        'casual': 'Kasual'
    };
    
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = `collage-btn ${category === 'all' ? 'active' : ''}`;
        button.textContent = categoryNames[category];
        button.setAttribute('data-category', category);
        
        button.addEventListener('click', () => {
            filterGallery(category);
            
            // Update active button
            document.querySelectorAll('.collage-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        });
        
        collageNav.appendChild(button);
    });
    
    // Load initial images
    filterGallery('all');
}

function filterGallery(category) {
    const collageGrid = document.getElementById('collageGrid');
    collageGrid.innerHTML = '';
    
    currentCategory = category;
    
    const filteredImages = category === 'all' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === category);
    
    // Create collage items
    filteredImages.forEach((image, index) => {
        const collageItem = document.createElement('div');
        collageItem.className = 'collage-item';
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = "Foto Prewedding";
        img.loading = "lazy";
        
        collageItem.appendChild(img);
        collageGrid.appendChild(collageItem);
    });
}

// Cover Front Functionality
function openInvitation() {
    const coverFront = document.getElementById('coverFront');
    const mainContent = document.getElementById('mainContent');
    
    // Add hidden class to cover with transition
    coverFront.classList.add('hidden');
    
    // Show main content after a delay
    setTimeout(() => {
        mainContent.classList.add('visible');
        // Scroll to top of main content
        window.scrollTo(0, 0);
        
        // Auto-play music when opening invitation
        const music = document.getElementById('weddingMusic');
        const player = document.getElementById('musicPlayer');
        
        // Set volume
        music.volume = 0.5;
        
        // Play music
        music.play().then(() => {
            player.classList.add('playing');
        }).catch(e => {
            console.log("Autoplay prevented:", e);
            // If autoplay is blocked, show play button
            player.style.display = 'flex';
        });
        
    }, 800);
    
    // Initialize main content functionality
    initializeMainContent();
}

// Initialize main content functionality
function initializeMainContent() {
    // Initialize Feather Icons
    initializeFeatherIcons();
    
    // Initialize collage gallery
    initializeCollageGallery();
    
    // Countdown timer
    function updateCountdown() {
        const weddingDate = new Date('December 21, 2025 08:00:00').getTime();
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    // Scroll to section
    function scrollToSection(sectionId) {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    }

    // Create navigation with icons
    function createNavigation() {
        const navContainer = document.getElementById('navigation');
        navContainer.innerHTML = '';

        navigationConfig.forEach((item) => {
            const navItem = document.createElement('div');
            navItem.className = 'nav-item';
            navItem.setAttribute('data-section', item.id);
            
            navItem.innerHTML = `
                <i data-feather="${item.icon}" class="nav-icon"></i>
                <span class="nav-label">${item.label}</span>
            `;
            
            navItem.onclick = () => scrollToSection(item.id);
            navContainer.appendChild(navItem);
        });

        // Replace icons
        feather.replace();
        
        // Set first item as active
        navContainer.children[0].classList.add('active');
    }

    // Handle scroll to update active navigation item
    function handleScroll() {
        const sections = document.querySelectorAll('.wedding-section');
        const navItems = document.querySelectorAll('.nav-item');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.id;
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === currentSection) {
                item.classList.add('active');
            }
        });
    }

    // Fungsi untuk mendapatkan nama dari URL
    function getGuestNameFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return decodeURIComponent(urlParams.get('nama') || 'Tamu Undangan');
    }

    // Fungsi untuk mempersonalisasi undangan
    function personalizeInvitation() {
        const guestName = getGuestNameFromURL();
        
        // Personalisasi semua bagian yang diperlukan
        document.getElementById('personalGreeting').textContent = 
            `Kepada Yth. ${guestName}, kami mengundang Anda untuk hadir dalam acara pernikahan kami`;
        
        document.getElementById('openingGreeting').textContent = 
            `Kepada Yth. ${guestName}, dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami bermaksud menyelenggarakan pernikahan putra-putri kami:`;
        
        document.getElementById('invitationGreeting').textContent = 
            `Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir untuk memberikan doa restu.`;
        
        document.getElementById('closingGreeting').textContent = 
            `Atas kehadiran dan doa restu Anda, kami mengucapkan terima kasih yang sebesar-besarnya.`;
    }

    // Fungsi untuk mengirim ucapan
    function sendWishes() {
        const name = document.getElementById('name').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (name && message) {
            // Simpan ke localStorage untuk demo
            const wishes = JSON.parse(localStorage.getItem('wishes')) || [];
            wishes.push({
                name: name,
                message: message,
                timestamp: new Date().toLocaleString('id-ID')
            });
            localStorage.setItem('wishes', JSON.stringify(wishes));
            
            document.getElementById('name').value = '';
            document.getElementById('message').value = '';
            alert('Ucapan Anda telah terkirim! Terima kasih.');
            displayWishes();
        } else {
            alert('Silakan isi nama dan ucapan Anda');
        }
    }

    // Fungsi untuk menampilkan ucapan
    function displayWishes() {
        const messagesContainer = document.getElementById('messages-container');
        const wishes = JSON.parse(localStorage.getItem('wishes')) || [];
        
        messagesContainer.innerHTML = '';
        
        wishes.forEach(wish => {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message';
            
            messageDiv.innerHTML = `
                <div class="message-name">
                    <i data-feather="user" class="text-icon"></i>
                    ${wish.name || 'Tamu'}
                </div>
                <div class="message-text">${wish.message}</div>
                <div class="message-time">
                    <i data-feather="clock" class="text-icon"></i>
                    ${wish.timestamp}
                </div>
            `;
            
            messagesContainer.appendChild(messageDiv);
        });
        
        // Scroll ke bawah
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Replace icons in new messages
        feather.replace();
    }

    // Music Player Control
    function setupMusicPlayer() {
        const music = document.getElementById('weddingMusic');
        const player = document.getElementById('musicPlayer');
        
        // Toggle play/pause on click
        player.addEventListener('click', () => {
            if (music.paused) {
                music.play();
                player.classList.add('playing');
            } else {
                music.pause();
                player.classList.remove('playing');
            }
        });
        
        // Visual feedback when music is playing
        music.addEventListener('play', () => {
            player.classList.add('playing');
        });
        
        music.addEventListener('pause', () => {
            player.classList.remove('playing');
        });
        
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                music.pause();
                player.classList.remove('playing');
            }
        });
    }

    // Initialize main content
    createNavigation();
    displayWishes();
    setupMusicPlayer();
    
    // Personalisasi undangan saat pertama kali dimuat
    personalizeInvitation();
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Handle scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Event listener untuk form ucapan
    document.getElementById('sendWishesBtn').addEventListener('click', sendWishes);
}

// Initialize cover front
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather Icons for cover
    initializeFeatherIcons();
    
    // Button click event
    document.getElementById('openInvitationBtn').addEventListener('click', openInvitation);
    
    // Keyboard event for accessibility
    document.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            openInvitation();
        }
    });
});
