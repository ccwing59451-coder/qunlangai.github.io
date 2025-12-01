document.addEventListener('DOMContentLoaded', () => {
    // --- 5. 动态展示区 (图片轮播) ---
    const slides = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(index) {
        // 处理索引越界
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // 移除所有图片的 active 类
        slides.forEach(slide => slide.classList.remove('active'));
        
        // 添加 active 类到当前图片
        slides[index].classList.add('active');
        currentSlide = index;
    }

    // 按钮事件监听
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

    // --- 移动端导航栏切换 ---
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinksContainer.classList.toggle('nav-active');
        });
    }

    // 点击链接后自动收起菜单 (移动端体验优化)
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            if(navLinksContainer.classList.contains('nav-active')) {
                navLinksContainer.classList.remove('nav-active');
            }
        });
    });

    // 自动轮播 (每5秒切换)
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // --- 9. 滚动渐入动画 ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 可选：如果只想触发一次，可以取消观察
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // 元素出现 15% 时触发
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 10. 返回顶部按钮 & 导航栏激活 ---
    const backToTopBtn = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        // 控制返回顶部按钮显示
        if (scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }

        // 导航栏滚动监听 (高亮当前部分)
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // 偏移量 (导航栏高度)
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 返回顶部点击事件
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

