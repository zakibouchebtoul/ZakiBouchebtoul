

gsap.registerPlugin(ScrollTrigger);


const inputs = document.querySelectorAll('input');

// Attach event listeners for focus and blur to each input
inputs.forEach((input) => {
// Find the corresponding line element (assumed to be within the same container)
const line = input.parentElement.querySelector('.lineform');

input.addEventListener('focus', () => {
  gsap.to(line, {
    duration: 0.5,
    width: '100%',
    ease: "power2.out"
  });
});

input.addEventListener('blur', () => {
  gsap.to(line, {
    duration: 0.5,
    width: '0%',
    ease: "power2.in"
  });
});
});







// Select all elements with class "ml9"
   document.querySelectorAll('.ml9').forEach((element) => {
    // Wrap each letter in a span
    let textWrapper = element.querySelector('.letters1');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    gsap.set(element, { opacity: 1 }); // Make text visible before animation starts

    // Animate letters when entering the section
    gsap.fromTo(
        textWrapper.querySelectorAll('.letter'),
        { scale: 0, opacity: 0 },
        {
            scale: 1,
            opacity: 1,
            duration: 1.3,
            delay: 0.5,
            stagger: 0.05, // Delay between letters
            ease: "elastic.out(1, 0.6)",
            scrollTrigger: {
                trigger: element.parentElement,
                start: "top 100%", 
                toggleActions: "play none none reverse"
            }
        }
    );

    
});

