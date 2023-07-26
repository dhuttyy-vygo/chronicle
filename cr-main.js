gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

if (document.querySelector('.page-wrapper') && window.innerWidth >= 991) {
  let smoother = ScrollSmoother.create({
    smooth: 0.6,
    effects: true,
    normalizeScroll: true,
    ignoreMobileResize: true,
    preventDefault: true,
  });
}

const mobileMenu = gsap.timeline({ paused: true });
let originalBackgroundColor, originalTextColor; // Variables to store original colors

function openNav() {
  // Store the original color values before animation starts
  const navIs = document.getElementById("nav-is");
  originalBackgroundColor = navIs.style.backgroundColor;
  originalTextColor = navIs.style.color;

  animateOpenNav();
  const navBtn = document.getElementById("m-toggle");
  navBtn.onclick = function (e) {
    navBtn.classList.toggle("active");
    mobileMenu.reversed(!mobileMenu.reversed());

    // Check if the timeline is reversed, and if it is, revert the navbar color and background color
    if (mobileMenu.reversed()) {
      navIs.style.backgroundColor = originalBackgroundColor;
      navIs.style.color = originalTextColor;
    }
  };
}

openNav();

function animateOpenNav() {
  mobileMenu.to("#nav-container", 0.2, {
    autoAlpha: 1,
    ease: "power4.inOut"
  }, "0");

  
  mobileMenu.to(
    "#cr-nav-logo",
    .5,
    {
      opacity: 0,
      ease: "power4.inOut"
    },
    "0"
  );
  
  mobileMenu.to(
    ".ch-menu-logo",
    .5,
    {
      opacity: 1,
      ease: "power4.inOut"
    },
    "0.2"
  );
  mobileMenu.from(".is-in-f > div", .85, {
    opacity: 0,
    y: 10,
    stagger: {
      amount: 0.04,
    },
    ease: "power4.inOut"
  }, ".2");
	
  mobileMenu.from(
    ".nav-li > a",
    .85,
    {
      yPercent: 100,
      ease: "power4.inOut",
      stagger: {
        amount: 0.2,
      },
    }, ".3").reverse();
}

$("[dark-mode]").each(function (index) {
  ScrollTrigger.create({
    trigger: $(this),
    start: "top 2%",
    end: "bottom 2%",
    onEnter: () => {
      $(".navbar").addClass("dark-m");
      $(".navbar").removeClass("light-m top-m");
    },
    onEnterBack: () => {
      $(".navbar").addClass("dark-m");
      $(".navbar").removeClass("light-m top-m");
    }
  });
});

$("[light-mode]").each(function (index) {
    ScrollTrigger.create({
      trigger: $(this),
      start: "top 2%",
      end: "bottom 2%",
      onEnter: () => {
        $(".navbar").addClass("light-m");
        $(".navbar").removeClass("dark-m top-m");
      },
      onEnterBack: () => {
        $(".navbar").addClass("light-m");
        $(".navbar").removeClass("dark-m top-m");
      }
    });
});
  
$("[is--top]").each(function (index) {
    ScrollTrigger.create({
      trigger: $(this),
      start: "top 2%",
      end: "bottom 2%",
      onEnter: () => {
        $(".navbar").addClass("top-m");
        $(".navbar").removeClass("dark-m light-m");
      },
      onEnterBack: () => {
        $(".navbar").addClass("top-m");
        $(".navbar").removeClass("dark-m light-m");
      }
    });
  });
  
window.addEventListener("DOMContentLoaded", (event) => {
    // Split text into spans
    let typeSplit = new SplitType(".is-split", {
      types: "lines",
      tagName: "span"
    });

    // Link timelines to scroll position
    function createScrollTrigger(triggerElement, timeline) {

      // Play tl when scrolled into view (60% from top of screen)
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 70%",
        onEnter: () => timeline.play()
      });
    }

    $(".fade-in").each(function (index) {
      let tl = gsap.timeline({ paused: true });
      tl.from($(this).find(".line"), { opacity: 0, yPercent: 100, duration: 1, ease: "power2.out", stagger: { amount: 0.3 } });
      createScrollTrigger($(this), tl);
    });

    gsap.set(".is-split", { opacity: 1 });
 
});

 

$(".sp-img").each(function (index) {
    let triggerElement = $(this);
    let targetElement = $(this).find("img");
  
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top bottom",
        end: "bottom+=100vh bottom",
        scrub: 0
      }
    });
    tl.fromTo(
      targetElement,
      {
        y: "-30%",
        duration: 1
      },
      {
        y: "30%",
        duration: 1
      }
    );
 });
 
  
if (window.innerWidth >= 991) {
  const showAnim = gsap.from("#nav-is", {
    yPercent: -100,
    paused: true,
    duration: 0.8,
  }).progress(1);

  ScrollTrigger.create({
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse();
    },
  });
}

$(".projects_link").each(function (index) {
    // vars
    let relatedPopupItem = $(".popup_item").eq(index);
    let projectImg = $(this).find(".projects_img");
    let popupImg = relatedPopupItem.find(".projects_img");
    projectImg.attr("data-flip-id", index);
    popupImg.attr("data-flip-id", index);
    // initial states
    gsap.set(relatedPopupItem.find(".popup_heading"), { yPercent: -102 });
  
    // Popup Interaction
    let openPopup = gsap
      .timeline({
        paused: true,
        onStart: () => {
          smoother.paused(true);
        },
        onReverseComplete: () => {
          smoother.paused(false);
        },
        defaults: {
          duration: 0.7,
          ease: "power1.inOut"
        }
      })
      .to($(this).find(".projects_heading"), { yPercent: 100 })
      .to($(this).find(".projects_p"), { yPercent: 100, opacity: 0 }, "<")
      .to($(this).parent().siblings(), { opacity: 0, duration: 0.5 }, "<")
      .to(relatedPopupItem.find(".popup_heading"), { yPercent: 0 })
      .from(relatedPopupItem.find(".popup_p"), { yPercent: 100, opacity: 0 }, "<");
  
    function toggleOpenClasses() {
      $("body").toggleClass("popup-open");
      relatedPopupItem.toggleClass("current");
      projectImg.toggleClass("current");
    }
  
    // Open Popup
    $(this).on("click", function () {
      // record states
      const state = Flip.getState(projectImg, { props: "backgroundPosition" });
      // toggle between states
      toggleOpenClasses();
      // animate between states
      Flip.from(state, {
        targets: popupImg,
        duration: 1,
        absolute: true,
        toggleClass: "flipping",
        ease: "power1.inOut"
      });
  
      openPopup.restart();
    });
  
    // Close Popup
    relatedPopupItem.find(".cccc.is-popup").on("click", function () {
      // record states
      const state = Flip.getState(popupImg, { props: "backgroundPosition" });
      // toggle between states
      toggleOpenClasses();
      // animate between states
      Flip.from(state, {
        targets: projectImg,
        duration: 1,
        absolute: true,
        toggleClass: "flipping",
        ease: "power1.inOut"
      });
  
      openPopup.reverse();
    });
  
    // Parallax Image Interaction
    gsap
      .timeline({
        scrollTrigger: {
          trigger: $(this),
          scrub: true
        },
        defaults: {
          ease: "none"
        }
      })
      .fromTo($(this).find(".projects_img"), { backgroundPosition: "50% 100%" }, { backgroundPosition: "50% 0%" })
      .fromTo($(this).find(".projects_content-wrap"), { yPercent: 50 }, { yPercent: -50 }, 0);
  });