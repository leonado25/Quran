// เมื่อหน้าเว็บโหลดเสร็จ - เวอร์ชันง่าย
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 เริ่มโหลดหน้าเว็บ...');
    console.log('🔥 ตรวจสอบข้อมูล surahsData:', typeof surahsData);
    
    // รอให้ข้อมูลโหลด
    setTimeout(function() {
        console.log('🔥 เรียกฟังก์ชัน loadSurahs...');
        loadSurahs();
    }, 100);
});

// ฟังก์ชันโหลดซูเราะห์ทั้งหมด - เวอร์ชันง่าย
function loadSurahs() {
    console.log('เริ่มโหลดซูเราะห์...');
    
    const surahList = document.getElementById('surahList');
    
    if (!surahList) {
        console.error('ไม่พบ element surahList');
        return;
    }
    
    if (typeof surahsData === 'undefined') {
        console.error('ไม่พบข้อมูล surahsData');
        surahList.innerHTML = '<div style="padding: 20px; text-align: center; color: red; grid-column: 1/-1;">❌ ไม่พบข้อมูลซูเราะห์ ตรวจสอบไฟล์ data.js</div>';
        return;
    }
    
    console.log('พบข้อมูลซูเราะห์:', surahsData.length, 'ซูเราะห์');
    
    // ลบข้อความ loading และซูเราะห์ตัวอย่าง
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
        loadingMessage.remove();
    }
    
    // ลบซูเราะห์ตัวอย่างที่มีอยู่
    const existingSurahs = surahList.querySelectorAll('.surah-item');
    existingSurahs.forEach(item => item.remove());
    
    // สร้างซูเราะห์ทีละอัน
    for (let i = 0; i < surahsData.length; i++) {
        const surah = surahsData[i];
        const surahElement = createSurahElement(surah);
        surahList.appendChild(surahElement);
    }
    
    console.log('โหลดซูเราะห์เสร็จแล้ว จำนวน:', surahList.querySelectorAll('.surah-item').length);
    
    // เพิ่มข้อความแสดงสถานะ
    const statusDiv = document.createElement('div');
    statusDiv.style.gridColumn = '1/-1';
    statusDiv.style.textAlign = 'center';
    statusDiv.style.padding = '20px';
    statusDiv.style.color = '#27ae60';
    statusDiv.style.fontWeight = 'bold';
    statusDiv.innerHTML = '✅ โหลดซูเราะห์ทั้งหมด 114 ซูเราะห์เรียบร้อยแล้ว';
    surahList.appendChild(statusDiv);
    
    // ลบข้อความสถานะหลัง 3 วินาที
    setTimeout(() => {
        statusDiv.remove();
    }, 3000);
}

// ฟังก์ชันสร้างองค์ประกอบซูเราะห์
function createSurahElement(surah) {
    const surahLink = document.createElement('a');
    surahLink.href = `surah.html?id=${surah.number}`;
    surahLink.className = 'surah-item';
    surahLink.setAttribute('data-surah-number', surah.number);
    surahLink.style.textDecoration = 'none';
    surahLink.style.color = 'inherit';
    surahLink.style.opacity = '0';
    surahLink.style.transform = 'translateY(20px)';
    surahLink.style.transition = 'all 0.3s ease, opacity 0.6s ease, transform 0.6s ease';
    
    surahLink.innerHTML = `
        <div class="surah-number">${surah.number}</div>
        <div class="surah-info">
            <div class="surah-name">${surah.nameThai} (${surah.nameArabic})</div>
            <div class="surah-details">${surah.meaning} • ${surah.place} • ${surah.verses} อายะห์</div>
        </div>
    `;
    
    return surahLink;
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

    // รอสักครู่แล้วจึงเริ่ม observe (เพื่อให้ elements ถูกสร้างก่อน)
    setTimeout(() => {
        const surahItems = document.querySelectorAll('.surah-item');
        surahItems.forEach((item, index) => {
            observer.observe(item);
        });
    }, 100);
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
    if (typeof surahsData === 'undefined') {
        console.log('ข้อมูลซูเราะห์ยังไม่โหลด');
        return;
    }
    
    const makkahCount = surahsData.filter(s => s.place === 'มักกะห์').length;
    const madinahCount = surahsData.filter(s => s.place === 'มะดีนะห์').length;
    const totalVerses = surahsData.reduce((sum, s) => sum + s.verses, 0);
    
    console.log(`สถิติอัลกุรอ่าน:
    - ซูเราะห์มักกะห์: ${makkahCount}
    - ซูเราะห์มะดีนะห์: ${madinahCount}
    - อายะห์รวม: ${totalVerses}`);
}

// เรียกใช้ฟังก์ชันสถิติ
setTimeout(updateStats, 500);

// เพิ่มการนำทางด่วนหลังจากโหลดหน้าเว็บ 3 วินาที
setTimeout(quickNavigation, 3000);

// ฟังก์ชันตรวจสอบว่าข้อมูลโหลดหรือยัง
function checkDataLoaded() {
    if (typeof surahsData === 'undefined') {
        console.error('ข้อมูลซูเราะห์ไม่ได้โหลด - ตรวจสอบไฟล์ data.js');
        document.getElementById('surahList').innerHTML = `
            <div style="text-align: center; padding: 40px; color: #e74c3c; background: #ffeaa7; border-radius: 10px;">
                <h3>⚠️ เกิดข้อผิดพลาด</h3>
                <p>ไม่สามารถโหลดข้อมูลซูเราะห์ได้ กรุณาตรวจสอบไฟล์ data.js</p>
            </div>
        `;
        return false;
    }
    return true;
}

// ตรวจสอบข้อมูลหลังจาก DOM โหลดเสร็จ
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkDataLoaded, 100);
});
