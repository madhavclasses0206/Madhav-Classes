/*==================================================
  HIT N RUN BOX CRICKET
  MAIN.JS V2.0
  PART 1A
==================================================*/

"use strict";


/*==================================================
  DOM READY
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initWebsite();

});


/*==================================================
  CORE INITIALIZATION
==================================================*/

function initWebsite() {

    initMobileMenu();

    initStickyHeader();

    initNavigationLinks();

    initVisualEffects();

    initGalleryLightbox();

    initBookingForm();

    initContactForm();

}


/*==================================================
  MOBILE MENU
==================================================*/

function initMobileMenu() {

    const menuButton =
        document.querySelector(".menu-btn");

    const navLinks =
        document.querySelector(".nav-links");

    const header =
        document.querySelector(".header");


    if (!menuButton || !navLinks) {

        return;

    }


    /*----------------------------------------------
      OPEN / CLOSE MENU
    ----------------------------------------------*/

    menuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                navLinks.classList.toggle("active");


            menuButton.classList.toggle(
                "active",
                isOpen
            );


            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        }
    );


    /*----------------------------------------------
      CLOSE MENU WHEN LINK IS CLICKED
    ----------------------------------------------*/

    const menuItems =
        navLinks.querySelectorAll("a");


    menuItems.forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    closeMobileMenu();

                }
            );

        }
    );


    /*----------------------------------------------
      CLOSE MENU ON ESCAPE
    ----------------------------------------------*/

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                navLinks.classList.contains("active")
            ) {

                closeMobileMenu();

            }

        }
    );


    /*----------------------------------------------
      CLOSE MENU WHEN CLICKING OUTSIDE
    ----------------------------------------------*/

    document.addEventListener(
        "click",
        (event) => {

            if (
                !navLinks.classList.contains("active")
            ) {

                return;

            }


            const clickedInsideMenu =
                navLinks.contains(event.target);


            const clickedMenuButton =
                menuButton.contains(event.target);


            if (
                !clickedInsideMenu &&
                !clickedMenuButton
            ) {

                closeMobileMenu();

            }

        }
    );


    /*----------------------------------------------
      CLOSE MENU ON RESIZE
    ----------------------------------------------*/

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 992
            ) {

                closeMobileMenu();

            }

        }
    );


    /*----------------------------------------------
      CLOSE MENU FUNCTION
    ----------------------------------------------*/

    function closeMobileMenu() {

        navLinks.classList.remove(
            "active"
        );


        menuButton.classList.remove(
            "active"
        );


        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );


        document.body.classList.remove(
            "menu-open"
        );

    }

}


/*==================================================
  STICKY HEADER
==================================================*/

function initStickyHeader() {

    const header =
        document.querySelector(".header");


    if (!header) {

        return;

    }


    const updateHeader =
        () => {

            if (
                window.scrollY > 30
            ) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        };


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive:true
        }
    );

}


/*==================================================
  NAVIGATION LINKS
==================================================*/

function initNavigationLinks() {

    const navLinks =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );


    if (!navLinks.length) {

        return;

    }


    navLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior:"smooth",

                        block:"start"

                    });

                }
            );

        }
    );

}
/*==================================================
  STATS COUNTER
==================================================*/

function initCounters() {

    const counters =
        document.querySelectorAll(".counter");


    if (!counters.length) {

        return;

    }


    /*
    Prevent the same counter from
    being animated multiple times.
    */

    const animateCounter =
        (counter) => {

            if (
                counter.dataset.animated === "true"
            ) {

                return;

            }


            counter.dataset.animated = "true";


            const target =
                parseFloat(
                    counter.dataset.target
                );


            if (
                Number.isNaN(target)
            ) {

                return;

            }


            const duration = 1600;

            const startTime =
                performance.now();


            const isDecimal =
                !Number.isInteger(target);


            const updateCounter =
                (currentTime) => {

                    const elapsed =
                        currentTime -
                        startTime;


                    const progress =
                        Math.min(
                            elapsed / duration,
                            1
                        );


                    /*
                    Ease-out effect
                    */

                    const easedProgress =
                        1 -
                        Math.pow(
                            1 - progress,
                            3
                        );


                    const currentValue =
                        target *
                        easedProgress;


                    if (isDecimal) {

                        counter.textContent =
                            currentValue.toFixed(1);

                    } else {

                        counter.textContent =
                            Math.floor(
                                currentValue
                            ).toLocaleString(
                                "en-IN"
                            );

                    }


                    if (
                        progress < 1
                    ) {

                        requestAnimationFrame(
                            updateCounter
                        );

                    } else {

                        /*
                        Always show exact
                        final target value.
                        */

                        counter.textContent =
                            isDecimal
                                ? target.toFixed(1)
                                : target.toLocaleString(
                                    "en-IN"
                                );

                    }

                };


            requestAnimationFrame(
                updateCounter
            );

        };


    /*
    IntersectionObserver makes counters
    start when the stats section enters
    the viewport.
    */

    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                animateCounter(
                                    entry.target
                                );


                                observerInstance.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold:0.35
                }
            );


        counters.forEach(
            (counter) => {

                observer.observe(
                    counter
                );

            }
        );

    } else {

        /*
        Fallback for older browsers.
        */

        counters.forEach(
            (counter) => {

                animateCounter(
                    counter
                );

            }
        );

    }

}


/*==================================================
  SCROLL REVEAL
==================================================*/

function initScrollReveal() {

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        !revealElements.length
    ) {

        return;

    }


    /*
    Accessibility:
    Users who prefer reduced motion
    should see content immediately.
    */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        prefersReducedMotion
    ) {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "active"
                );

            }
        );

        return;

    }


    /*
    Modern browser solution.
    */

    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (
                    entries,
                    observerInstance
                ) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "active"
                                );


                                observerInstance.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold:0.12,

                    rootMargin:
                        "0px 0px -50px 0px"

                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        /*
        Fallback:
        Show all content if
        IntersectionObserver is unavailable.
        */

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "active"
                );

            }
        );

    }

}


/*==================================================
  INITIALIZE PART 1B
==================================================*/

function initVisualEffects() {

    initCounters();

    initScrollReveal();

}
/*==================================================
  GALLERY LIGHTBOX
==================================================*/

function initGalleryLightbox(){

    const galleryImages =
        document.querySelectorAll(
            ".gallery-item img"
        );

    const lightbox =
        document.querySelector(
            ".lightbox"
        );

    const lightboxImage =
        document.querySelector(
            "#lightbox-image"
        );

    const closeBtn =
        document.querySelector(
            ".lightbox-close"
        );

    const nextBtn =
        document.querySelector(
            ".lightbox-next"
        );

    const prevBtn =
        document.querySelector(
            ".lightbox-prev"
        );


    if(
        !galleryImages.length ||
        !lightbox ||
        !lightboxImage
    ){
        return;
    }


    let currentIndex = 0;


    const images =
        Array.from(
            galleryImages
        );


    /*-------------------------------
      OPEN LIGHTBOX
    -------------------------------*/

    function openLightbox(index){

        currentIndex = index;

        lightboxImage.src =
            images[currentIndex].src;


        lightbox.classList.add(
            "active"
        );


        document.body.classList.add(
            "lightbox-open"
        );

    }



    /*-------------------------------
      CLOSE LIGHTBOX
    -------------------------------*/

    function closeLightbox(){

        lightbox.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "lightbox-open"
        );


        lightboxImage.src = "";

    }



    /*-------------------------------
      NEXT IMAGE
    -------------------------------*/

    function nextImage(){

        currentIndex++;

        if(
            currentIndex >= images.length
        ){

            currentIndex = 0;

        }


        lightboxImage.src =
            images[currentIndex].src;

    }



    /*-------------------------------
      PREVIOUS IMAGE
    -------------------------------*/

    function previousImage(){

        currentIndex--;

        if(
            currentIndex < 0
        ){

            currentIndex =
                images.length - 1;

        }


        lightboxImage.src =
            images[currentIndex].src;

    }



    /*-------------------------------
      IMAGE CLICK
    -------------------------------*/

    images.forEach(
        (image,index)=>{

            image.addEventListener(
                "click",
                ()=>{

                    openLightbox(index);

                }
            );

        }
    );



    /*-------------------------------
      BUTTON EVENTS
    -------------------------------*/

    if(closeBtn){

        closeBtn.addEventListener(
            "click",
            closeLightbox
        );

    }


    if(nextBtn){

        nextBtn.addEventListener(
            "click",
            nextImage
        );

    }


    if(prevBtn){

        prevBtn.addEventListener(
            "click",
            previousImage
        );

    }



    /*-------------------------------
      CLICK OUTSIDE IMAGE
    -------------------------------*/

    lightbox.addEventListener(
        "click",
        (event)=>{

            if(
                event.target === lightbox
            ){

                closeLightbox();

            }

        }
    );



    /*-------------------------------
      KEYBOARD CONTROL
    -------------------------------*/

    document.addEventListener(
        "keydown",
        (event)=>{


            if(
                !lightbox.classList.contains(
                    "active"
                )
            ){

                return;

            }


            if(
                event.key === "Escape"
            ){

                closeLightbox();

            }


            if(
                event.key === "ArrowRight"
            ){

                nextImage();

            }


            if(
                event.key === "ArrowLeft"
            ){

                previousImage();

            }


        }
    );

}



/*==================================================
  BOOKING FORM
==================================================*/

function initBookingForm(){

    const form =
        document.getElementById("bookingForm");

    if(!form){
        return;
    }

    form.addEventListener("submit",function(event){

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const date =
            document.getElementById("date").value;

        const slot =
            document.getElementById("slot").value;

        const message =
            document.getElementById("message").value.trim();

        const whatsappNumber =
            "919725131552";

        const text =
`🏏 *New Booking Request*

👤 Name: ${name}
📞 Phone: ${phone}
📅 Date: ${date}
⏰ Slot: ${slot}

📝 Message:
${message || "N/A"}`;

        const url =
`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

        window.open(url,"_blank");

        form.reset();

    });

}
/*==================================================
  CONTACT FORM
==================================================*/

function initContactForm(){

    const form =
        document.getElementById("contactForm");

    if(!form){
        return;
    }

    form.addEventListener("submit",function(event){

        event.preventDefault();

        const inputs =
            form.querySelectorAll("input, textarea");

        const name =
            inputs[0].value.trim();

        const phone =
            inputs[1].value.trim();

        const message =
            inputs[2].value.trim();

        const whatsappNumber =
            "919725131552";

        const text =
`📩 *New Enquiry*

👤 Name: ${name}

📞 Phone: ${phone}

💬 Message:
${message}`;

        const url =
`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

        window.open(url,"_blank");

        form.reset();

    });

}