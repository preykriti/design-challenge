const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
});



const statNumbers = document.querySelectorAll(".stat-number");
let hasAnimated = false;


const observer = new IntersectionObserver((entries, observer) =>{
    console.log("helo");
    entries.forEach((entry)=>{
        if(entry.isIntersecting && !hasAnimated){
            hasAnimated=true;
            statNumbers.forEach(count => {
                const target = Number(count.getAttribute("data-target"));
                const duration = 1000;
                const startTime = performance.now();

                const updateCount = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    count.innerText = Math.floor(progress * target);

                    if (progress < 1){
                        requestAnimationFrame(updateCount);
                    }
                    else{
                        count.innerText = target;
                    }
                };
                requestAnimationFrame(updateCount);
            });
            observer.disconnect();
        }
    });
}, {threshold: 0.5});

const statsSection = document.getElementById("stat-info");
observer.observe(statsSection);



const images = document.querySelectorAll(".scroll-img");
let positions = [];

images.forEach((img, i) => {
    img.style.position = 'absolute';
    positions[i] = i * 380;
    img.style.left = positions[i] + 'px';
});

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            startSliding();
        }
    });
});

imageObserver.observe(document.getElementById("images-container"));

function startSliding() {
    setInterval(() => {
        images.forEach((img, i) => {
            positions[i] -= 1;
 
            if (positions[i] < -400) {
                positions[i] = Math.max(...positions) + 280;
            }
            
            img.style.left = positions[i] + 'px';
        });
    }, 16);
}