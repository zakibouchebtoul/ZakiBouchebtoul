gsap.fromTo(".js-slider",     {
    opacity: 0,
    y:30,
  
}, {
        opacity: 1,
        y:0,
        duration: 1,
        delay:0.5,
       
        ease: "power2.inOut"
    });
    gsap.fromTo(".js-slider_nav",     {
        opacity: 0,
        y:30,
      
    }, {
            opacity: 1,
            y:0,
            duration: 1,
            delay:0.4,
           
            ease: "power2.inOut"
        });

        gsap.fromTo(".js-slider_indicator   ",     {
            opacity: 0,
            y:30,
          
        }, {
                opacity: 1,
                y:0,
                duration: 1,
                delay:0.3,
               
                ease: "power2.inOut"
            });
    document.querySelectorAll('input[name="slider-control"]').forEach(input => {
        input.addEventListener('change', () => {
            document.querySelectorAll('.js-slider-indi:after').forEach(el => {
                el.style.transform = '';
            });
            const checkedInput = document.querySelector('input[name="slider-control"]:checked');
            if (checkedInput) {
                const index = checkedInput.id.split('-')[1];
                document.querySelector(`.indi-${index}:after`).style.transform = 'translate3d(-50%, -50%, 0) scale(2.5)';
            }
        });
    });
    document.querySelectorAll('.ml9').forEach((element) => {
        // Wrap each letter in a span
        let textWrapper = element.querySelector('.letters2');
        if (textWrapper) {
          textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        }    
        gsap.set(element, { opacity: 1 }); // Make text visible before animation starts
    
        // Animate letters when entering the section
         if (textWrapper) {
          gsap.fromTo(
            textWrapper.querySelectorAll('.letter'),
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                delay:0.5,
                stagger: 0.05, // Delay between letters
                ease: "elastic.out(1, 0.6)",
                scrollTrigger: {
                    trigger: element.parentElement,
                    start: "top 90%", 
                    toggleActions: "play none none reverse"
                }
            }
        );
         }
    
        // Fade out effect when .paddingglobale leaves viewport
        gsap.to(element, {
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element.closest('.paddingglobale'),
                start: "bottom 10%",
                end: "bottom 10%",
                toggleActions: "play none none reverse"
            }
        });
    });