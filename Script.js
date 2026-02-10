// --- 第一站：金相框的交互逻辑 ---
document.addEventListener('DOMContentLoaded', function () {
    const station1Container = document.getElementById('station1');
    if (!station1Container) return;

    const frameTitle = document.getElementById('frame-title');
    const imageContainer = document.getElementById('image-container');
    const scenePast = document.getElementById('scene-past');
    const sceneFuture = document.getElementById('scene-future');
    const speechBubble = document.getElementById('speech-bubble');
    const bubbleText = document.getElementById('bubble-text');
    const arrowLeft = document.getElementById('arrow-left');
    const arrowRight = document.getElementById('arrow-right');

    const tidbits = {
        past: "这是迪拜的昨天“德拉”，1966年之前，这里的人们靠着潜水采珠为生，生活清贫。",
        future: "这是迪拜的明天“扎耶德大道”，1966年发现石油后，迪拜迅速地崛起。"
    };

    let currentState = 'past';

    function updateView() {
        speechBubble.classList.remove('visible');
        if (currentState === 'past') {
            frameTitle.textContent = '迪拜的过去';
            scenePast.style.opacity = '1';
            sceneFuture.style.opacity = '0';
        } else {
            frameTitle.textContent = '迪拜的未来';
            scenePast.style.opacity = '0';
            sceneFuture.style.opacity = '1';
        }
    }

    arrowRight.addEventListener('click', function (e) {
        e.stopPropagation();
        currentState = 'future';
        updateView();
    });

    arrowLeft.addEventListener('click', function (e) {
        e.stopPropagation();
        currentState = 'past';
        updateView();
    });

    imageContainer.addEventListener('click', function () {
        bubbleText.textContent = tidbits[currentState];
        speechBubble.classList.toggle('visible');
    });

    updateView();
});

// --- 第二站：伊朗小镇的交互逻辑 ---
document.addEventListener('DOMContentLoaded', function () {
    const station2Container = document.getElementById('station2');
    if (!station2Container) return;

    const station2Slider = document.getElementById('station2-slider');
    const s2ArrowLeft = document.getElementById('s2-arrow-left');
    const s2ArrowRight = document.getElementById('s2-arrow-right');
    const s2SceneDoor = document.getElementById('s2-scene-door');

    s2ArrowRight.addEventListener('click', function () {
        station2Slider.style.transform = 'translateX(-50%)';
        s2ArrowRight.style.display = 'none';
        s2ArrowLeft.style.display = 'flex';
    });

    s2ArrowLeft.addEventListener('click', function () {
        station2Slider.style.transform = 'translateX(0%)';
        s2ArrowLeft.style.display = 'none';
        s2ArrowRight.style.display = 'flex';
    });

    const s2Hotspots = document.querySelectorAll('#s2-scene-building .hotspot');
    const s2DialogueBox = document.querySelector('.dialogue-box-s2');
    const s2DialogueText = document.getElementById('dialogue-text-s2');
    const s2SceneBuilding = document.getElementById('s2-scene-building');

    const station2Tidbits = {
        's2-hotspot-tower': '<strong>Barajeel (风塔):</strong> 这是早期阿拉伯地区的“天然空调”。风塔通过捕捉高空风力，将凉风引入室内，同时排出热空气，体现了古代波斯和阿拉伯建筑智慧的融合。',
        's2-hotspot-window': '<strong>消失的窗户:</strong> 为了遵循伊斯兰建筑的隐私原则，许多窗户开在极高处，但外墙上常留有无功能的假窗格，只为保持立面对称，这是一种罕见的“装饰性欺骗”。',
        's2-hotspot-wall': '<strong>隐藏的加固技术:</strong> 一些老建筑的墙壁中混入了海枣树干纤维和珊瑚石碎块，这种材料不仅轻便，还能抵抗盐蚀。部分墙体内部甚至嵌有鲸鱼肋骨作为支撑。'
    };

    s2Hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', function (event) {
            event.stopPropagation();
            const hotspotId = event.currentTarget.id;
            s2DialogueText.innerHTML = station2Tidbits[hotspotId];

            s2DialogueBox.style.display = 'block';
            const dialogueRect = s2DialogueBox.getBoundingClientRect();
            const targetRect = event.currentTarget.getBoundingClientRect();
            const containerRect = s2SceneBuilding.getBoundingClientRect();

            let top = targetRect.top - containerRect.top + 30;
            let left = targetRect.left - containerRect.left + 30;

            if (left + dialogueRect.width > containerRect.width) {
                left = targetRect.left - containerRect.left - dialogueRect.width - 10;
            }
            if (top + dialogueRect.height > containerRect.height) {
                top = targetRect.top - containerRect.top - dialogueRect.height - 10;
            }
            if (left < 0) { left = 10; }
            if (top < 0) { top = 10; }

            s2DialogueBox.style.top = top + 'px';
            s2DialogueBox.style.left = left + 'px';
        });
    });

    s2SceneBuilding.addEventListener('click', function () {
        s2DialogueBox.style.display = 'none';
    });

    s2SceneDoor.addEventListener('click', function () {
        window.location.hash = '#station3';
    });
});

// --- 第三站：Al Khayma 餐桌的交互逻辑 ---
document.addEventListener('DOMContentLoaded', function () {
    const station3Container = document.getElementById('station3');
    if (!station3Container) return;

    const dialogueText = document.getElementById('s3-dialogue-text');
    const coffeeCups = document.querySelectorAll('.coffee-cup-wrapper');
    const finalChoice = document.getElementById('s3-final-choice');
    const finalButton = document.getElementById('s3-final-button');

    const cupDialogues = {
        '1': 'هذه كرم<br><span class="pronunciation">(Hatha Karam)</span>',
        '2': 'هذه صحة<br><span class="pronunciation">(Hatha Sihha)</span>',
        '3': 'هذه مية<br><span class="pronunciation">(Hatha Mayyah)</span>'
    };

    let clickedCupsCount = 0;

    coffeeCups.forEach(cup => {
        cup.addEventListener('click', function () {
            if (cup.classList.contains('clicked')) return;
            cup.classList.add('clicked');
            const steam = cup.querySelector('.steam-container');
            if (steam) steam.classList.add('fade-out');
            const cupId = cup.dataset.cupId;
            dialogueText.innerHTML = cupDialogues[cupId];
            clickedCupsCount++;
            if (clickedCupsCount === 3) {
                setTimeout(function () {
                    dialogueText.innerHTML = 'على العين والراس<br><span class="pronunciation">(Ala Al-Ain o Al-Ras - 乐意至极)</span>';
                    finalChoice.classList.remove('hidden');
                }, 1500);
            }
        });
    });

    finalButton.addEventListener('click', function () {
        document.getElementById('s3-phase-coffee').classList.add('hidden');
        document.getElementById('s3-phase-feast').classList.remove('hidden');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                clickedCupsCount = 0;
                dialogueText.innerHTML = '请享用你的咖啡';
                finalChoice.classList.add('hidden');
                coffeeCups.forEach(cup => {
                    cup.classList.remove('clicked');
                    const steam = cup.querySelector('.steam-container');
                    if (steam) steam.classList.remove('fade-out');
                });
                document.getElementById('s3-phase-coffee').classList.remove('hidden');
                document.getElementById('s3-phase-feast').classList.add('hidden');
            }
        });
    }, { threshold: 0.5 });
    observer.observe(station3Container);

    const feastContainer = document.getElementById('s3-feast-container');
    const feastHotspots = feastContainer.querySelectorAll('.hotspot');
    const feastDialogueBox = feastContainer.querySelector('.dialogue-box-s3-feast');
    const feastDialogueText = document.getElementById('dialogue-text-s3-feast');

    const feastTidbits = {
        'hotspot-lamb': '<strong>羊腿饭 (Lamb Machboos):</strong> 阿联酋的国菜之一，用香料慢炖的羊肉鲜嫩多汁，搭配浸满肉汁的米饭，是节庆和待客的硬菜。',
        'hotspot-seafood': '<strong>海鲜拼盘:</strong> 凭借临海优势，新鲜的虾和青口是餐桌上的常客。简单的烹饪最大程度保留了大海的味道。',
        'hotspot-stew': '<strong>炖菜 (Salona):</strong> 一种家庭式的蔬菜炖肉，通常用鸡肉或羊肉，加入西葫芦、土豆、胡萝卜等，营养丰富，非常下饭。',
        'hotspot-dates': '<strong>椰枣 (Dates):</strong> 沙漠中的“生命之果”，富含糖分和营养。用它来开启或结束一餐，是阿拉伯世界的传统。',
        'hotspot-tea': '<strong>阿拉伯茶:</strong> 通常是加了薄荷的红茶，口感清爽，可以很好地化解肉食的油腻感，是餐后的必备饮品。',
        'hotspot-dessert': '<strong>甜品 (Luqaimat):</strong> 一种金黄色的油炸面团，外脆里嫩，通常会淋上椰枣糖浆或蜂蜜，是斋月期间的流行小吃。',
        'hotspot-bread': '<strong>大饼 (Khubz):</strong> 类似皮塔饼的阿拉伯主食面包，可以撕开包裹肉类、蘸酱，或直接食用。'
    };

    feastHotspots.forEach(hotspot => {
        hotspot.addEventListener('click', function (event) {
            event.stopPropagation();
            const hotspotId = event.currentTarget.id;
            feastDialogueText.innerHTML = feastTidbits[hotspotId];
            feastDialogueBox.style.display = 'block';
            const dialogueRect = feastDialogueBox.getBoundingClientRect();
            const targetRect = event.currentTarget.getBoundingClientRect();
            const containerRect = feastContainer.getBoundingClientRect();
            let top = targetRect.top - containerRect.top + 30;
            let left = targetRect.left - containerRect.left + 30;
            if (left + dialogueRect.width > containerRect.width) {
                left = targetRect.left - containerRect.left - dialogueRect.width - 10;
            }
            if (top + dialogueRect.height > containerRect.height) {
                top = targetRect.top - containerRect.top - dialogueRect.height - 10;
            }
            if (left < 0) left = 10;
            if (top < 0) top = 10;
            feastDialogueBox.style.top = top + 'px';
            feastDialogueBox.style.left = left + 'px';
        });
    });

    feastContainer.addEventListener('click', function () {
        feastDialogueBox.style.display = 'none';
    });
});
// --- 第四站：朱美拉清真寺的交互逻辑 ---

document.addEventListener('DOMContentLoaded', function () {
    const station4Container = document.getElementById('station4');
    if (!station4Container) return;

    // 获取元素
    const imageSlider = document.getElementById('s4-image-slider');
    const textSlider = document.getElementById('s4-text-slider');
    const arrowLeft = document.getElementById('s4-arrow-left');
    const arrowRight = document.getElementById('s4-arrow-right');
    const totalSlides = 5; // 总共有5个滑块

    let currentSlideIndex = 0; // 当前滑块的索引 (从0开始)

    // 更新视图的函数
    function updateSliders() {
        // 计算需要移动的百分比
        const offset = -currentSlideIndex * 20; // 每个滑块占20%，所以移动20%的倍数

        // 同时移动图片和文字滑块
        imageSlider.style.transform = `translateX(${offset}%)`;
        textSlider.style.transform = `translateX(${offset}%)`;

        // 更新箭头的显示状态
        // 如果是第一个，隐藏左箭头
        arrowLeft.style.display = currentSlideIndex === 0 ? 'none' : 'flex';
        // 如果是最后一个，隐藏右箭头
        arrowRight.style.display = currentSlideIndex === totalSlides - 1 ? 'none' : 'flex';
    }

    // 绑定点击事件
    arrowRight.addEventListener('click', function () {
        if (currentSlideIndex < totalSlides - 1) {
            currentSlideIndex++;
            updateSliders();
        }
    });

    arrowLeft.addEventListener('click', function () {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            updateSliders();
        }
    });

    // 初始加载时，先更新一次视图
    updateSliders();
});
