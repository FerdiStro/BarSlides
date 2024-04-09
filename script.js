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
        const happyHours = [
            { start: "12:01", end: "12:02", type: "a" },
            { start: "13:01", end: "13:02", type: "a" },
            { start: "23:30", end: "00:00", type: "b" },
            { start: "01:00", end: "02:00", type: "a" },
            {start: "END"}
        ];

        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentSeconds = now.getSeconds();
        const currentTimeInSeconds = currentHour * 3600 + currentMinute * 60 + currentSeconds;

        let nextHappyHour;
        let remainingSecondsNext;
        let remainingSecondsEnds;

        let active;

        let startHourMinute
        let endHourMinute

        let startInSeconds
        let endInSeconds

        let happyHour;



        let nextStartHourIndex = 0;
        let temp = 0 ;
        while (temp < happyHours.length && happyHours[temp].start.split(":")[0] <= currentHour ) {

                happyHour = happyHours[temp]
                startHourMinute = happyHour.start.split(":");
                endHourMinute = happyHour.end.split(":");
                startInSeconds = parseInt(startHourMinute[0]) * 3600 + parseInt(startHourMinute[1]) * 60;
                endInSeconds = parseInt(endHourMinute[0]) * 3600 + parseInt(endHourMinute[1]) * 60;

            if (currentTimeInSeconds >= startInSeconds && currentTimeInSeconds < endInSeconds) {
                active = true;
                nextStartHourIndex = temp
                temp++;
            }else{
                temp++;
            }

        }

        if(nextStartHourIndex === 0){
            active = false;
            console.log(happyHours[temp-1].start.split(":")[0])
            console.log(currentHour)
            console.log(temp)
            if(happyHours[temp-1].start.split(":")[0] == currentHour && happyHours[temp-1].start.split(":")[1] > currentMinute){
                    nextStartHourIndex = temp - 1 ;
            } else{
                nextStartHourIndex = temp
            }
        }

        console.log(nextStartHourIndex)


        happyHour = happyHours[nextStartHourIndex]
        startHourMinute = happyHour.start.split(":");
        endHourMinute = happyHour.end.split(":");
        startInSeconds = parseInt(startHourMinute[0]) * 3600 + parseInt(startHourMinute[1]) * 60;
        endInSeconds = parseInt(endHourMinute[0]) * 3600 + parseInt(endHourMinute[1]) * 60;





            nextHappyHour = happyHour;
            remainingSecondsNext = startInSeconds -  currentTimeInSeconds  ;
            remainingSecondsEnds = endInSeconds - currentTimeInSeconds;

            console.log("Stat: " + startInSeconds)
            console.log("End: " + remainingSecondsEnds)




        if (nextHappyHour) {
            document.getElementById('countdown').innerText = `Next Happy Hour starts in: ${Math.floor(remainingSecondsNext / 3600)}h ${Math.floor((remainingSecondsNext % 3600) / 60)}m ${remainingSecondsNext % 60}s`;
            if(active){
                document.getElementById('countdown').innerText = `Happy Hour ends in: ${Math.floor(remainingSecondsEnds / 3600)}h ${Math.floor((remainingSecondsEnds % 3600) / 60)}m ${remainingSecondsEnds % 60}s`;

                if (nextHappyHour.type === 'a') {
                    const priceElements = document.querySelectorAll('.price-list .price');
                    priceElements.forEach(priceElement => {


                        const originalPrice = parseFloat(priceElement.getAttribute('data-original-price'));
                        const discountedPrice = originalPrice / 2;
                        const formattedOriginalPrice = originalPrice.toFixed(2);
                        const formattedDiscountedPrice = discountedPrice.toFixed(2);
                        priceElement.innerHTML = `<del>${formattedOriginalPrice}€</del> ${formattedDiscountedPrice}€`;
                    });
                } else if (nextHappyHour.type === 'b') {
                    const newContainer = document.createElement('div');
                    newContainer.textContent = 'TEST';
                    document.querySelector('.slide').appendChild(newContainer);
                }
            }
        }
        console.log("---------------------------------------------")
    }






    updateCountdown();
    setInterval(updateCountdown, 1000);
});

