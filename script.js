// เมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', function() {
    loadSurahs();
    setupSearch();
    setupAnimations();
});

// ฟังก์ชันโหลดซูเราะห์ทั้งหมด
function loadSurahs() {
    const surahList = document.getElementById('surahList');
    
    surahsData.forEach(surah => {
        const surahElement = createSurahElement(surah);
        surahList.appendChild(surahElement);
    });
}

// ฟังก์ชันสร้างองค์ประกอบซูเราะห์
function createSurahElement(surah) {
    const surahDiv = document.createElement('div');
    surahDiv.className = 'surah-item';
    surahDiv.setAttribute('data-surah-number', surah.number);
    
    surahDiv.innerHTML = `
        <div class="surah-number">${surah.number}</div>
        <div class="surah-info">
            <div class="surah-name">${surah.nameThai} (${surah.nameArabic})</div>
            <div class="surah-details">${surah.meaning} • ${surah.place} • ${surah.verses} อายะห์</div>
        </div>
    `;
    
    // เพิ่ม event listener สำหรับการคลิก
    surahDiv.addEventListener('click', function() {
        showSurahDetails(surah);
    });
    
    return surahDiv;
}

// ฟังก์ชันแสดงรายละเอียดซูเราะห์
function showSurahDetails(surah) {
    const details = `
        ซูเราะห์ที่ ${surah.number}: ${surah.nameThai} (${surah.nameArabic})
        ความหมาย: ${surah.meaning}
        สถานที่ประทาน: ${surah.place}
        จำนวนอายะห์: ${surah.verses}
    `;
    
    alert(details);
}

// ฟังก์ชันตั้งค่าการค้นหา
function setupSearch() {
    const searchBox = document.getElementById('searchBox');
    
    searchBox.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        filterSurahs(searchTerm);
    });
    
    // เคลียร์การค้นหาเมื่อกด Escape
    searchBox.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            filterSurahs('');
        }
    });
}

// ฟังก์ชันกรองซูเราะห์ตามคำค้น
function filterSurahs(searchTerm) {
    const surahItems = document.querySelectorAll('.surah-item');
    let visibleCount = 0;
    
    surahItems.forEach(item => {
        const surahName = item.querySelector('.surah-name').textContent.toLowerCase();
        const surahDetails = item.querySelector('.surah-details').textContent.toLowerCase();
        const surahNumber = item.getAttribute('data-surah-number');
        
        const isVisible = searchTerm === '' || 
                         surahName.includes(searchTerm) || 
                         surahDetails.includes(searchTerm) ||
                         surahNumber === searchTerm;
        
        if (isVisible) {
            item.style.display = 'flex';
            item.style.animation = `fadeIn 0.3s ease-in-out ${visibleCount * 0.05}s both`;
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    // แสดงข้อความเมื่อไม่พบผลลัพธ์
    showSearchResults(visibleCount, searchTerm);
}

// ฟังก์ชันแสดงผลลัพธ์การค้นหา
function showSearchResults(count, searchTerm) {
    let existingMessage = document.getElementById('search-message');
    
    if (existingMessage) {
        existingMessage.remove();
    }
    
    if (searchTerm && count === 0) {
        const message = document.createElement('div');
        message.id = 'search-message';
        message.className = 'search-message';
        message.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <h3>ไม่พบซูเราะห์ที่ค้นหา</h3>
                <p>ลองค้นหาด้วยคำอื่น เช่น ชื่อซูเราะห์, ความหมาย, หรือหมายเลข</p>
            </div>
        `;
        
        const surahList = document.getElementById('surahList');
        surahList.appendChild(message);
    } else if (searchTerm && count > 0) {
        const message = document.createElement('div');
        message.id = 'search-message';
        message.className = 'search-message';
        message.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #667eea; font-weight: bold;">
                พบ ${count} ซูเราะห์ที่ตรงกับการค้นหา "${searchTerm}"
            </div>
        `;
        
        const surahList = document.getElementById('surahList');
        surahList.insertBefore(message, surahList.firstChild);
    }
}

// ฟังก์ชันตั้งค่า animations
function setupAnimations() {
    // Intersection Observer สำหรับ animation เมื่อ scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // สังเกตการณ์ทุก surah items
    const surahItems = document.querySelectorAll('.surah-item');
    surahItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;
        observer.observe(item);
    });
}

// ฟังก์ชันสำหรับการนำทางด่วน
function quickNavigation() {
    const quickNav = document.createElement('div');
    quickNav.className = 'quick-nav';
    quickNav.innerHTML = `
        <div style="position: fixed; top: 50%; right: 20px; transform: translateY(-50%); z-index: 1000;">
            <div style="background: rgba(255,255,255,0.9); padding: 15px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                <h4 style="margin-bottom: 10px; color: #333;">นำทางด่วน</h4>
                <button onclick="scrollToSection('header')" style="display: block; margin: 5px 0; padding: 8px 12px; border: none; background: #667eea; color: white; border-radius: 5px; cursor: pointer;">หน้าแรก</button>
                <button onclick="scrollToSection('content-section')" style="display: block; margin: 5px 0; padding: 8px 12px; border: none; background: #667eea; color: white; border-radius: 5px; cursor: pointer;">ข้อมูล</button>
                <button onclick="scrollToSurah(1)" style="display: block; margin: 5px 0; padding: 8px 12px; border: none; background: #667eea; color: white; border-radius: 5px; cursor: pointer;">ซูเราะห์แรก</button>
                <button onclick="scrollToSurah(114)" style="display: block; margin: 5px 0; padding: 8px 12px; border: none; background: #667eea; color: white; border-radius: 5px; cursor: pointer;">ซูเราะห์สุดท้าย</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(quickNav);
}

// ฟังก์ชันเลื่อนไปยังส่วน
function scrollToSection(className) {
    const element = document.querySelector('.' + className);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ฟังก์ชันเลื่อนไปยังซูเราะห์
function scrollToSurah(number) {
    const element = document.querySelector(`[data-surah-number="${number}"]`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        element.style.backgroundColor = '#e3f2fd';
        setTimeout(() => {
            element.style.backgroundColor = '';
        }, 2000);
    }
}

// ฟังก์ชันสำหรับสถิติ
function updateStats() {
    const makkahCount = surahsData.filter(s => s.place === 'มักกะห์').length;
    const madinahCount = surahsData.filter(s => s.place === 'มะดีนะห์').length;
    const totalVerses = surahsData.reduce((sum, s) => sum + s.verses, 0);
    
    console.log(`สถิติอัลกุรอ่าน:
    - ซูเราะห์มักกะห์: ${makkahCount}
    - ซูเราะห์มะดีนะห์: ${madinahCount}
    - อายะห์รวม: ${totalVerses}`);
}

// เรียกใช้ฟังก์ชันสถิติ
updateStats();

// เพิ่มการนำทางด่วนหลังจากโหลดหน้าเว็บ 3 วินาที
setTimeout(quickNavigation, 3000);
