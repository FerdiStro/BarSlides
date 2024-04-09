function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'F11') {
        toggleFullScreen();
    }
});

document.addEventListener('click', function() {
    toggleFullScreen();
});

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const happyHours = [
        { startHour: 0 },
        { startHour: 4 },
    ];

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 5000);

    function updateCountdown() {
        const now = new Date();
        const hour = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        let remainingSeconds;

        let nextStartHourIndex = 0;
        while (nextStartHourIndex < happyHours.length && happyHours[nextStartHourIndex].startHour <= hour) {
            nextStartHourIndex++;
        }
        if (nextStartHourIndex < happyHours.length) {
            console.log(nextStartHourIndex < happyHours.length)
            const nextStartHour = happyHours[nextStartHourIndex].startHour;
            remainingSeconds = (nextStartHour - hour - 1) * 3600 + (59 - minutes) * 60 + (59 - seconds);
            if (hour >= happyHours[nextStartHourIndex - 1].startHour && hour < nextStartHour) {
                document.querySelectorAll('.price').forEach(priceElement => {
                    const originalPrice = parseFloat(priceElement.getAttribute('data-original-price'));
                    const discountedPrice = originalPrice / 2;
                    const formattedOriginalPrice = originalPrice.toFixed(2);
                    const formattedDiscountedPrice = discountedPrice.toFixed(2);
                    document.getElementById('countdown').innerText =  `Happy Hour ends in: ${Math.floor((remainingSeconds % 3600) / 60)}m ${remainingSeconds % 60}s`;
                    priceElement.innerHTML = `<del>${formattedOriginalPrice}€</del> ${formattedDiscountedPrice}€`;
                });
            } else {
                document.querySelectorAll('.price').forEach(priceElement => {
                    const originalPrice = parseFloat(priceElement.getAttribute('data-original-price'));
                    const formattedOriginalPrice = originalPrice.toFixed(2);
                    console.log("test")
                    document.getElementById('countdown').innerText =  `Happy Hour ends in: ${Math.floor((remainingSeconds % 3600) / 60)}m ${remainingSeconds % 60}s`;
                    priceElement.textContent = `${formattedOriginalPrice}€`;
                });
            }
        } else {
            remainingSeconds = (24 - hour + happyHours[0].startHour - 1) * 3600 + (59 - minutes) * 60 + (59 - seconds);
            document.getElementById('countdown').innerText =  `Next Happy Hour starts in: ${Math.floor(remainingSeconds / 3600)}h ${Math.floor((remainingSeconds % 3600) / 60)}m ${remainingSeconds % 60}s`;
        }
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
});