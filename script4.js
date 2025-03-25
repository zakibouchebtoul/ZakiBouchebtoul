
  gsap.to(".home-one-about-green-line1", {
    delay: 3.4, // Delay in seconds (500ms)
    duration: 2.4, // Duration in seconds (1800ms)
    ease: "ease", // Easing function
    width: "300px", // Target width value
    height: "px", // Optional height change; '+=0px' means no change
    onComplete: () => console.log("Animation completed!"), // Callback when the animation finishes
  });
  
  gsap.to(".home-one-about-green-line2", {
    delay: 3.4, // Delay in seconds (500ms)
    duration: 2.4, // Duration in seconds (1800ms)
    ease: "ease", // Easing function
    width: "200px", // Target width value
    height: "px", // Optional height change; '+=0px' means no change
    onComplete: () => console.log("Animation completed!"), // Callback when the animation finishes
  });
  
  gsap.to(".main-wrapper", {
    opacity: 1,
    duration: 0.5, // Animation duration (1 second)
    delay: 3.3, // Delay before animation starts (3.3 seconds)
  });
  gsap.to(".letters", {
    opacity: 1,
    duration: 1.5, // Animation duration (1 second)
    delay: 3.4, // Delay before animation starts (3.3 seconds)
  });
  
  gsap.to(".large-animation-0", {
    opacity: 1,
    duration: 1.5, // Animation duration (1 second)
    delay: 3.4, // Delay before animation starts (3.3 seconds)
    onComplete: () => {},
  });
  
  gsap.to(".letters1", {
    opacity: 1,
    duration: 1.5, // Animation duration (1 second)
    delay: 3.4, // Delay before animation starts (3.3 seconds)
  });
  
 
  var overlay = document.querySelector(".shape-overlays");
  var paths = document.querySelectorAll(".shape-overlays__path");
  
  var numPoints = 10;
  var numPaths = paths.length;
  var delayPointsMax = 0.3;
  var delayPerPath = 0.25;
  var duration = 0.6;
  var isOpened = false;
  var pointsDelay = [];
  var allPoints = [];
  var ease = Power2.easeInOut;
  
  var tl = new TimelineMax({ onUpdate: render });
  console.log('tl:')
  
  for (var i = 0; i < numPaths; i++) {
    var points = [];
    allPoints.push(points);
    for (var j = 0; j < numPoints; j++) {
      points.push(100);
    }
  }
  let path = document.querySelector("path");
  let spanBefore = CSSRulePlugin.getRule("#hamburger span:before");
  gsap.set(spanBefore, { background: "black" });
  gsap.set(".menu", { visibility: "hidden" });
  gsap.set(".menu", { visibility: "hidden" });
  
  // toggle menu
  function revealMenu() {
    revealMenuItems();
    const hamburger = document.getElementById("hamburger");
    const toggleBtn = document.getElementById("toggle-btn");
    toggleBtn.onclick = function (e) {
      hamburger.classList.toggle("active");
      tl.reversed(!tl.reversed());
    };
  }
  
  revealMenu();
  
  function revealMenuItems() {

    isOpened = !isOpened;
    
    const start = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const end = "M0,1005S175,995,500,995s500,5,500,5V0H0Z";
    const power2 = "power2.inOut";
    const power4 = "power4.inOut";
  
    tl.to("#hamburger", 0.9, {
      marginTop: "-5px",
      x: -40,
      y: 40,
      ease: power4,
    });
     
    
    tl.to(
      "#hamburger span",
      1,
      {
        background: "rgb(40, 37, 37)",
        ease: power2,
      },
      "<"
    );
    toggle();
    tl.to(
      spanBefore,
      1,
      {
        background: "rgb(40, 37, 37)",
        ease: power2,
      },
      "<"
    );
  
    tl.to(
      ".btn .btn-outline",
      0.9,
      {
        x: -0,
        y: 0,
        width: "140px",
        height: "140px",
        border: "1px solid rgb(40, 37, 37)",
        ease: power4,
      },
      "<"
    );
  
  
    tl.to(
      path,
      0.8,
      {
        attr: {
          d: start,
        },
        ease: Power2.easeInOut,
      },
      "<"
    ).to(
      path,
      0.8,
      {
        attr: {
          d: end,
        },
        ease: Power2.easeInOut,
      },
      "-0.5"
    );
  
    const hamburger = document.getElementById("toggle-btn");
    let isOpen = false;
  
    hamburger.addEventListener("click", () => {
        if (!isOpen) {
            gsap.to(".bar:nth-child(1)", { y: 9.5,  backgroundColor: "#1d1d1d",rotate: 45, duration: 0.3 });
            gsap.to(".bar:nth-child(1)", {backgroundColor: "#1d1d1d", rotate: 45, duration: 0.5 });

            gsap.to(".bar:nth-child(2)", { opacity: 0,backgroundColor: "#1d1d1d", duration: 0.3 });
            gsap.to(".bar:nth-child(3)", { y: -9, rotate: -45, duration: 0.3 });
            gsap.to(".bar:nth-child(3)", {backgroundColor: "#1d1d1d", rotate: -45, duration: 0.5 });
        } else {
            gsap.to(".bar:nth-child(1)", { y: 0,backgroundColor: "#fcfcfc", rotate: 0, duration: 0.3 });
            gsap.to(".bar:nth-child(1)", { backgroundColor: "#fcfcfc", rotate: 0, duration:0.5 });
            gsap.to(".bar:nth-child(2)", { opacity: 1,backgroundColor: "#fcfcfc", duration: 0.3 });
            gsap.to(".bar:nth-child(3)", { y: 0,backgroundColor: "#fcfcfc", rotate: 0, duration: 0.3 });
            gsap.to(".bar:nth-child(3)", { backgroundColor: "#fcfcfc", rotate: 0, duration:0.5 });

        }
        isOpen = !isOpen;
    });
    
  }
  function toggle() {
   
      tl.progress(0).clear();
      
      for (var i = 0; i < numPoints; i++) {
        pointsDelay[i] = Math.random() * delayPointsMax;
      }
      
      for (var i = 0; i < numPaths; i++) {
        var points = allPoints[i];
        var pathDelay = delayPerPath * (isOpened ? i : (numPaths - i - 1));
            
        for (var j = 0; j < numPoints; j++) {
          
          var config = {
            ease: ease
          };
          config[j] = 0;
          var delay = pointsDelay[j];
          
          tl.to(points, duration, config, delay + pathDelay);
          // tl.to(points, duration - delay, config, delay + pathDelay);
        }
      }
     
     tl.to(".menu",0.4 , {
  
      visibility : "visible",
     },
     "-=0.3"
  );
    tl.to(
      ".menu-item > a",
      0.6,
      {
        top: 0,
        ease: "power4",
        stagger: {
          amount: 1,
        },
      },
      "<"
    ).reverse();
  
  
    }
    
    function render() {
      for (var i = 0; i < numPaths; i++) {
        var path = paths[i];
        var points = allPoints[i];
        
        var d = "";
        d += isOpened ? `M 0 0 V ${points[0]} C` : `M 0 ${points[0]} C`;
        
        for (var j = 0; j < numPoints - 1; j++) {
          
          var p = (j + 1) / (numPoints - 1) * 100;
          var cp = p - (1 / (numPoints - 1) * 100) / 2;
          d += ` ${cp} ${points[j]} ${cp} ${points[j+1]} ${p} ${points[j+1]}`;
        }
        
        d += isOpened ? ` V 100 H 0` : ` V 0 H 0`;
        path.setAttribute("d", d)
      }  
    }
    $(".container").mouseleave(function (e) {
        TweenMax.to(this, 0.3, { height: 150, width: 250 });
        TweenMax.to(".circle", 0.3, { scale: 1, x: 0, y: 0 });
      });
      
      $(".container").mouseenter(function (e) {
        TweenMax.to(this, 0.3, { height: 200, width: 200 });
        TweenMax.to(".circle", 0.3, { scale: 1.3 });
      });
      
      $(".container").mousemove(function (e) {
        callParallax(e);
      });
      
      function callParallax(e) {
        parallaxIt(e, ".circle", 80);
      }
      
      function parallaxIt(e, target, movement) {
        var $this = $(".container");
        var relX = e.pageX - $this.offset().left;
        var relY = e.pageY - $this.offset().top;
      
        TweenMax.to(target, 0.3, {
          x: ((relX - $this.width() / 2) / $this.width()) * movement,
          y: ((relY - $this.height() / 2) / $this.height()) * movement,
          ease: Power2.easeOut
        });
      }
      
      gsap.registerPlugin(ScrollTrigger);

      // Select all elements with class "ml9"
      document.querySelectorAll('.ml9').forEach((element) => {
          // Wrap each letter in a span
          let textWrapper = element.querySelector('.letters');
          textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
      
          gsap.set(element, { opacity: 1 }); // Make text visible before animation starts
      
          // Animate letters when entering the section
          gsap.fromTo(
              textWrapper.querySelectorAll('.letter'),
              { scale: 0, opacity: 0 },
              {
                  scale: 1,
                  opacity: 1,
                  duration: 1,
                  stagger: 0.05, // Delay between letters
                  ease: "elastic.out(1, 0.6)",
                  scrollTrigger: {
                      trigger: element.parentElement,
                      start: "top 90%", 
                      toggleActions: "play none none reverse"
                  }
              }
          );
      
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
      gsap.from(".heading-style-h3", {
        opacity: 0,
        y: 50, // Moves the text up from 50px
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5, // Small delay for a smoother entrance
      });
      gsap.from(".animatefadeup", {
        opacity: 0,
        y: 50, // Moves the text up from 50px
        duration: 2,
        ease: "power3.out",
        delay: 5, // Small delay for a smoother entrance
      });
      
      document.querySelectorAll('.animatefadein').forEach((el) => {
        // Find the closest parent element with the class "heading-box"
        const parentHeading = el.closest('.animatefadein');
      
        // Check if a parent heading-box was found to avoid errors
        if (parentHeading) {
          gsap.from(el, {
            opacity: 0,
            y: 50, // Moves the element upward from 50px below its final position
            duration: 2,
            ease: "power3.out",
            delay: 0.3,
            scrollTrigger: {
              trigger: parentHeading, // Use the parent .heading-box as the trigger
              start: "top 90%",       // When the top of the parent hits 90% down the viewport
              end: "top 0%",      // When the bottom of the parent reaches 10% from the top
              toggleActions: "play reverse play reverse",
              // markers: true,       // Uncomment for debugging trigger positions
            }
          });
        }
      });

      
      
      

      gsap.registerPlugin(ScrollTrigger);

      // Animate .vertical-line when it enters the viewport
      gsap.from(".vertical-line", {
        scrollTrigger: {
          trigger: ".vertical-line",
          start: "top 90%", // Adjust start position as needed
          toggleActions: "play reverse play reverse"
        },
        duration: 1,
        
        scaleY: 0,
        transformOrigin: "bottom",
        opacity: 0
      });
  
      // Animate .horizontal-line when it enters the viewport
      gsap.from(".horizontal-line", {
        scrollTrigger: {
          trigger: ".horizontal-line",
          start: "top 90%",
          toggleActions: "play reverse play reverse"
        },
        duration: 1,
        scaleX: 0,
        transformOrigin: "left",
        opacity: 0.5
      });
  
      // Repeat similarly for the other elements
      gsap.from(".vertical-line1", {
        scrollTrigger: {
          trigger: ".vertical-line1",
          start: "top 90%",
          toggleActions: "play reverse play reverse"
        },
        duration: 1,
        delay:0.5,
        scaleY: 0,
        transformOrigin: "bottom",
        opacity: 0
      });
  
      gsap.from(".horizontal-line1", {
        scrollTrigger: {
          trigger: ".horizontal-line1",
          start: "top 90%",
          toggleActions: "play reverse play reverse"
        },
        duration: 1,
        delay:0.2,
        scaleX: 0,
        transformOrigin: "left",
        opacity: 0.7
      });
  
      gsap.from(".vertical-line2", {
        scrollTrigger: {
          trigger: ".vertical-line2",
          start: "top 90%",
          toggleActions: "play reverse play reverse"
        },
        duration: 1,
        delay:0.5,
        scaleY: 0,
        transformOrigin: "bottom",
        opacity: 0
      });
  
      gsap.from(".horizontal-line2", {
        scrollTrigger: {
          trigger: ".horizontal-line2",
          start: "top 90%",
          toggleActions: "play reverse play reverse"
        },
        duration: 1,
        delay:0.2,
        scaleX: 0,
        transformOrigin: "left",
        opacity: 0.5
      });
     gsap.from(".vertical-line3", {
      scrollTrigger: {
        trigger: ".vertical-line3",
        start: "top 90%",
        toggleActions: "play reverse play reverse"
      },
      duration: 1,
      delay:0.5,
      scaleY: 0,
      transformOrigin: "bottom",
      opacity: 0
    });

    gsap.from(".horizontal-line3", {
      scrollTrigger: {
        trigger: ".horizontal-line3",
        start: "top 90%",
        toggleActions: "play reverse play reverse"
      },
      duration: 1.5,
      delay:0.2,
      scaleX: 0,
      transformOrigin: "left",
      opacity: 0.5
    });
  


   // Make sure GSAP is loaded:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>

// Ensure GSAP is loaded before this script runs
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js"></script>

const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    gsap.timeline()
      .fromTo(
        button.querySelector('.button_text.is-in'),
        { opacity: 0, y: 0 },
        { opacity: 1, y: -20, duration: 0.3, ease: 'power2.out' },
        0
      )
      .fromTo(
        button.querySelector('.button_text.is-out'),
        { opacity: 1, y: 0 },
        { opacity: 0, y: -20, duration: 0.3, ease: 'power2.out' },
        0
      );
  });

  button.addEventListener('mouseleave', () => {
    gsap.timeline()
      .fromTo(
        button.querySelector('.button_text.is-in'),
        { opacity: 1, y: 0 },
        { opacity: 0, y: 20, duration: 0.3, ease: 'power2.out' },
        0
      )
      .fromTo(
        button.querySelector('.button_text.is-out'),
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        0
      );
  });
});


document.querySelectorAll(".onovo-bubble").forEach((bubbleContainer) => {
  // Create one timeline for the container (big bubble) and its child bubbles
  let creativeTl = gsap.timeline({ paused: true });
  
  // Reset the container and children to their starting states
  creativeTl.set(bubbleContainer, { scale: 1 });
  creativeTl.set(bubbleContainer.querySelectorAll(".bubble-1, .bubble-2, .bubble-3 , .bubble-4"), {
    opacity: 0,
    scale: 0,
    y: 0  // ensure no vertical offset at start
  });
  
  // Animate the big bubble (container) with a subtle scale-up
  creativeTl.to(bubbleContainer, {
    scale: 1.05,
    
    duration: 0.3,
    ease: "power1.out"
  }, 0); // starts at time 0
  
  // "Burst in" effect for the inner bubbles: scale and fade them in
  creativeTl.to(bubbleContainer.querySelectorAll(".bubble-1, .bubble-2, .bubble-3 , .bubble-4"), {
    opacity: 1,
    scale: 1.2,      // burst to a slightly larger size
    duration: 0.5,
    ease: "back.out(1.7)", // creative overshoot effect
    stagger: 0.1
  }, 0.1); // starts slightly after container begins scaling
  
  // Transition the bubbles into a continuous floating loop
  creativeTl.to(bubbleContainer.querySelectorAll(".bubble-1, .bubble-2, .bubble-3 "), {
    y: -30,
    repeat: -1,
    yoyo: true,
    duration: 2,
    ease: "power1.inOut",
    stagger: 0.2
  }, "-=0.2"); // overlap with burst effect
  
  // Event listeners for hover actions
  bubbleContainer.addEventListener("mouseenter", () => {
    // Play the creative timeline from the start
    creativeTl.play(0);
  });
  
  bubbleContainer.addEventListener("mouseleave", () => {
    // Pause the timeline to stop the looping float
    creativeTl.pause();
    // Fade out the inner bubbles
    if (window.matchMedia('(max-width: 768px)').matches) {
      // If mobile, set opacity to 1
      gsap.to(bubbleContainer.querySelectorAll(".bubble-1, .bubble-2, .bubble-3, .bubble-4"), {
        opacity: 1,
        duration: 0.5
      });
    } else {
      // Otherwise, set opacity to 0
      gsap.to(bubbleContainer.querySelectorAll(".bubble-1, .bubble-2, .bubble-3, .bubble-4"), {
        opacity: 0,
        duration: 0.5
      });
    }
    
    // Animate the container (big bubble) back to its original scale
    gsap.to(bubbleContainer, { scale: 1, duration: 0.3 });
  });
});


const magnetStrength = 0.3; // Adjust this value to control the effect's intensity

buttons.forEach(button => {
  button.addEventListener('mousemove', (e) => {
    // Get the button's position and dimensions
    const rect = button.getBoundingClientRect();
    
    // Calculate the center of the button
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate the mouse position relative to the button
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Determine the distance from the center
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    
    // Apply the magnetic effect using a fraction of the offset
    gsap.to(button, {
      x: dx * magnetStrength,
      y: dy * magnetStrength,
      duration: 0.3,
      ease: 'power2.out'
    });
  });

  button.addEventListener('mouseleave', () => {
    // Reset position when the mouse leaves
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
});



$(".container1").mouseleave(function (e) {
  TweenMax.to(this, 0.3, { height: 150, width: 250 });
  TweenMax.to(".circle1", 0.3, { scale: 1, x: 0, y: 0 });
});

$(".container1").mouseenter(function (e) {
  TweenMax.to(this, 0.3, { height: 200, width: 200 });
  TweenMax.to(".circle1", 0.3, { scale: 1.3 });
});

$(".container1").mousemove(function (e) {
  callParallax1(e);
});

function callParallax1(e) {
  parallaxIt1(e, ".circle1", 80);
}

function parallaxIt1(e, target, movement) {
  var $this = $(".container1");
  var relX = e.pageX - $this.offset().left;
  var relY = e.pageY - $this.offset().top;

  TweenMax.to(target, 0.3, {
    x: ((relX - $this.width() / 2) / $this.width()) * movement,
    y: ((relY - $this.height() / 2) / $this.height()) * movement,
    ease: Power2.easeOut
  });
}

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

document.querySelectorAll('.text-container').forEach(container => {
  const hoverText = container.querySelector('.hover-text');
  const line = container.querySelector('.line3');

  hoverText.addEventListener('mouseenter', () => {
    gsap.to(line, { duration: 0.8, width: '100%', ease: 'power2.out' });
  });

  hoverText.addEventListener('mouseleave', () => {
    gsap.to(line, { duration: 0.8, width: '0%', ease: 'power2.in' });
  });
});


document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  const arrow = item.querySelector('.arrow');

  question.addEventListener('click', () => {
    // If the item is already active, close it
    if (item.classList.contains('active')) {
      gsap.to(answer, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });
      gsap.to(arrow, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.inOut"
      });
      item.classList.remove('active');
    } else {
      // Open the answer
      // Measure the natural height of the content
      let contentHeight = answer.scrollHeight;
      gsap.to(answer, {
        height: contentHeight,
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          // After the animation, set height to auto so that
          // it can adjust if the content changes (optional)
          answer.style.height = "auto";
        }
      });
      gsap.to(arrow, {
        rotation: 45,
        duration: 0.3,
        ease: "power2.inOut"
      });
      item.classList.add('active');
    }
  });
});

const socialIcons = document.querySelectorAll('.social-icon');

socialIcons.forEach(icon => {
  // When the mouse moves over the icon, calculate the difference from the icon’s center to the mouse position
  icon.addEventListener('mousemove', (e) => {
    const rect = icon.getBoundingClientRect();
    const iconCenterX = rect.left + rect.width / 2;
    const iconCenterY = rect.top + rect.height / 2;
    const deltaX = e.clientX - iconCenterX;
    const deltaY = e.clientY - iconCenterY;

    // Multiply the delta values to adjust the magnetic intensity (adjust the multiplier as desired)
    gsap.to(icon, {
      x: deltaX * 0.3,
      y: deltaY * 0.3,
      duration: 0.3,
      ease: "power3.out"
    });
  });

  // When the mouse leaves, return the icon to its original position
  icon.addEventListener('mouseleave', () => {
    gsap.to(icon, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: "power3.out"
    });
  });
});


  // Animate the iframe on scroll
  gsap.to("#myIframe", {
    scrollTrigger: {
      trigger: "#myIframe", // Element that triggers the animation
      start: "top top",     // Animation starts when the top of the iframe reaches the top of the viewport
      end: "bottom top",    // Animation ends when the bottom of the iframe reaches the top of the viewport
      scrub: true           // Smooth scrubbing, links the animation progress to the scrollbar position
    },
    opacity: 0,             // Fade out the iframe
    scale: 0.8,             // Scale down slightly
    ease: "none"            // Linear easing for a smooth transition
  });

  document.addEventListener("DOMContentLoaded", function () {
    gsap.from(".dividerprocess", {
        height: 0,  // Start from 0 height
        duration: 1.5,
        ease: "power1",
        scrollTrigger: {
            trigger: ".dividerprocess",
            start: "top 80%",  // Start animation when 80% of the viewport height is reached
            toggleActions: "play none none reverse",
        },
    });

    gsap.from(".dividerprocess1", {
        height: 0,  // Start from 0 height
        duration: 1.5,
        ease: "power1",
        scrollTrigger: {
            trigger: ".dividerprocess",
            start: "top 80%",
            toggleActions: "play none none reverse",
        },
    });
});




gsap.from(".custom-faq-item", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  stagger: 0.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".custom-faq-container",
    start: "top 80%",
    end: "bottom 80%",
    toggleActions: "play none none reverse",
  }
});
const slider = document.querySelector(".slider");

// Clone slides for infinite effect
const slides = document.querySelectorAll(".slide");

// GSAP Timeline for continuous scrolling
gsap.to(slider, {
    x: "-50%", // Moves left by half
    duration: 25, // Duration for full slide
    ease: "linear",
    repeat: -1 // Infinite loop
});

// Magnetic Effect
slides.forEach(slide => {
    const img = slide.querySelector("img");

    slide.addEventListener("mousemove", (e) => {
        const { left, top, width, height } = slide.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) * 0.2; // Scale movement
        const y = (e.clientY - top - height / 2) * 0.2;
        
        gsap.to(img, {
            x: x,
            y: y,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    slide.addEventListener("mouseleave", () => {
        gsap.to(img, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
    });
});
document.addEventListener("DOMContentLoaded", function () {
  gsap.to("#preloader", {
      opacity: 0,
      duration: 1,
      delay: 4.5, // Show loader for 2 seconds
      onComplete: function () {
          document.getElementById("preloader").style.display = "none";
          document.getElementById("content").style.display = "block";
          gsap.from("#content", { opacity: 0, y: 50, duration: 1 });
      }
  });
});
