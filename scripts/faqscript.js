  gsap.fromTo("rect",     {
    opacity: 0,
    stroke: "black",
  
}, {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 2,
        stroke: "#FCFCFC",
        ease: "power2.inOut"
    });

    // Manual Text Splitting
    const textElement = document.getElementById("text");
    const textContent = textElement.innerText;
    textElement.innerHTML = ""; // Clear original text

    // Wrap each letter in a span
    textContent.split("").forEach(letter => {
        let span = document.createElement("span");
        span.textContent = letter;
        textElement.appendChild(span);
    });

    // Animate each letter separately in a wave motion
    gsap.fromTo(textElement.children, 
        {
            opacity: 0,
            y: 10,
            delay:0.5,
            rotation: -10
        }, 
        {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 2,
            stagger: 0.05,
            delay:0.5,
            ease: "elastic.out(1, 0.3)",
          
        }
    );

    gsap.fromTo(".subtitle", 
        { opacity: 0 },  // Start completely invisible
        { 
            opacity: 1,    // Fade to fully visible
            duration: 2,   // Animation duration (2 seconds)
            delay:0.5,
          // Fade in and out
            ease: "power4.inOut"  // Smooth easing effect
        }
    );
    gsap.fromTo(".subsubtitle", 
        { opacity: 0 },  // Start completely invisible
        { 
            opacity: 1,    // Fade to fully visible
            duration: 2,   // Animation duration (2 seconds)
            delay:0.5,
          // Fade in and out
            ease: "power4.inOut"  // Smooth easing effect
        }
    );
    gsap.fromTo(".faq-question", 
        { opacity: 0 },  // Start completely invisible
        { 
            opacity: 1,    // Fade to fully visible
            duration: 2,   // Animation duration (2 seconds)
            delay:0.5,
          // Fade in and out
            ease: "power4.inOut"  // Smooth easing effect
        }
    );
    document.querySelectorAll(".faq-question").forEach((question) => {
        let answer = question.nextElementSibling;
        let icon = question.querySelector(".icon");

        question.addEventListener("click", function () {
            let isOpen = answer.style.height && answer.style.height !== "0px";

            if (isOpen) {
                gsap.to(answer, { height: 0, opacity: 1, duration: 0.3, ease: "power1.inOut" });
                gsap.to(icon, { rotate: 0, scale: 1, color: "#FCFCFC", duration: 0.3 });
                icon.innerHTML = "*";
            } else {
                let fullHeight = answer.scrollHeight;
                gsap.fromTo(answer, { height: 0, opacity: 1 }, { height: fullHeight, opacity: 1, duration: 0.4, ease: "power1.out" });
                gsap.to(icon, { rotate: 180, scale: 1.2, color: "#FCFCFC", duration: 0.3 });
                icon.innerHTML = "*";
            }
        });
    });


    document.querySelectorAll(".faq-question").forEach((question) => {
        let parent = question.closest(".faq-item");
    
        let tl = gsap.timeline({ paused: true });
    
        tl.fromTo(parent, 
            { borderImage: "linear-gradient(to right, transparent, transparent, transparent) 1" }, 
            { borderImage: "linear-gradient(to right, transparent, #FCFCFC, transparent) 1", duration: 6,delay:1, ease: "power2.out" }
        );
        tl.play();

       
    });

    gsap.to(".line", {
        width: "100%", // Expands from center to edges
        duration: 1.5,
        delay:0.5,
        ease: "power3.out"
    });

    gsap.to(".line", {
        height: 1,
        duration: 1,
        delay:0.5,

        ease: "power4.inOut",
     
    });
    gsap.to(".line1", {
        width: "100%", // Expands from center to edges
        duration: 1.5,
        delay:0.7,
        ease: "power3.out"
    });

    gsap.to(".line1", {
        height: 1,
        duration: 1,
        delay:0.7,

        ease: "power4.inOut",
     
    });
    gsap.to(".line2", {
        width: "100%", // Expands from center to edges
        duration: 1.5,
        delay:0.9,
        ease: "power3.out"
    });

    gsap.to(".line2", {
        height: 1,
        duration: 1,
        delay:0.9,

        ease: "power4.inOut",
     
    });

    gsap.to(".line3", {
        width: "100%", // Expands from center to edges
        duration: 1.5,
        delay:0.9,
        ease: "power3.out"
    });

    gsap.to(".line3", {
        height: 1,
        duration: 1,
        delay:0.9,

        ease: "power4.inOut",
     
    });
    