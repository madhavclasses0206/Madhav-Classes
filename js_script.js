/* ==========================================
   madhav-class.js
========================================== */

/* ===== MOBILE MENU TOGGLE ===== */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}

/* ===== CLOSE MENU AFTER CLICK ===== */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        if (navLinks) {
            navLinks.classList.remove("active");
        }

    });

});

/* ===== NAVBAR SCROLL EFFECT ===== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.boxShadow =
        "0 5px 20px rgba(0,0,0,0.1)";

    } else {

        navbar.style.boxShadow =
        "0 2px 15px rgba(0,0,0,0.05)";

    }

});

/* ===== SMOOTH SCROLL ===== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target =
        document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

/* ===== FADE-IN ANIMATION ===== */

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.2
});

document.querySelectorAll(
    ".stat-card, .class-card, .teacher-card, .testimonial-card"
).forEach((el) => {

    el.classList.add("hidden");

    observer.observe(el);

});

/* ===== GALLERY IMAGE ZOOM ===== */

document.querySelectorAll(".gallery-grid img").forEach((img) => {

    img.addEventListener("click", () => {

        const overlay =
        document.createElement("div");

        overlay.className = "image-overlay";

        overlay.innerHTML = `
            <div class="image-popup">
                <img src="${img.src}" alt="">
                <span class="close-popup">&times;</span>
            </div>
        `;

        document.body.appendChild(overlay);

        overlay.querySelector(".close-popup")
        .addEventListener("click", () => {

            overlay.remove();

        });

        overlay.addEventListener("click", (e) => {

            if (e.target === overlay) {

                overlay.remove();

            }

        });

    });

});

/* ===== ACTIVE NAV LINK ===== */

const currentPage =
window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a").forEach(link => {

    const linkPage =
    link.getAttribute("href");

    if (linkPage === currentPage) {

        link.classList.add("active-link");

    }

});

/* ===== TESTIMONIAL AUTO SLIDER ===== */

const testimonials =
document.querySelectorAll(".testimonial-card");

let testimonialIndex = 0;

if (testimonials.length > 0) {

    setInterval(() => {

        testimonials.forEach(card => {

            card.style.opacity = "0.7";

        });

        testimonials[testimonialIndex]
        .style.opacity = "1";

        testimonialIndex++;

        if (testimonialIndex >= testimonials.length) {

            testimonialIndex = 0;

        }

    }, 3000);

}

/* ===== WHATSAPP BUTTON EFFECT ===== */

const whatsappBtn =
document.querySelector(".whatsapp-btn");

if (whatsappBtn) {

    setInterval(() => {

        whatsappBtn.classList.toggle("pulse");

    }, 1000);

}

/* ===== CURRENT YEAR IN FOOTER ===== */

const year =
document.querySelector(".current-year");

if (year) {

    year.textContent =
    new Date().getFullYear();

}

console.log(
    "Bright Future Academy Loaded Successfully 🚀"
);
// ================= HOME BANNER AUTO SLIDER =================

const bannerSlides =
document.querySelectorAll(".banner-slide");

let currentBanner = 0;

if(bannerSlides.length > 0){

    setInterval(() => {

        bannerSlides[currentBanner]
        .classList.remove("active");

        currentBanner =
        (currentBanner + 1)
        % bannerSlides.length;

        bannerSlides[currentBanner]
        .classList.add("active");

    }, 4000);

}
/* ===== BANNER PAUSE ON HOVER ===== */

const bannerContainer =
document.querySelector(".banner-container");

let bannerInterval;

if (bannerSlides.length > 0) {

    clearInterval(bannerInterval);

    const startBanner = () => {

        bannerInterval = setInterval(() => {

            bannerSlides[currentBanner]
            .classList.remove("active");

            currentBanner =
            (currentBanner + 1) %
            bannerSlides.length;

            bannerSlides[currentBanner]
            .classList.add("active");

        }, 4000);

    };

    startBanner();

    if (bannerContainer) {

        bannerContainer.addEventListener(
            "mouseenter",
            () => clearInterval(bannerInterval)
        );

        bannerContainer.addEventListener(
            "mouseleave",
            startBanner
        );

    }

}
/* ===== STATS COUNTER ANIMATION ===== */

const counters = document.querySelectorAll(".stat-card h2");

const runCounter = () => {

    counters.forEach(counter => {

        const text = counter.innerText;
        const number = parseInt(text);

        if (isNaN(number)) return;

        let start = 0;
        const speed = Math.ceil(number / 50);

        const update = () => {

            start += speed;

            if (start >= number) {
                counter.innerText = text;
            } else {
                counter.innerText = start + (text.includes("+") ? "+" : text.includes("%") ? "%" : "");
                requestAnimationFrame(update);
            }

        };

        update();

    });

};

const statsSection = document.querySelector(".stats");

if (statsSection) {

    const statsObserver = new IntersectionObserver((entries) => {

        if (entries[0].isIntersecting) {

            runCounter();
            statsObserver.disconnect();

        }

    });

    statsObserver.observe(statsSection);

}
/* ===== SCROLL TO TOP ===== */

const scrollBtn =
document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {

    if (!scrollBtn) return;

    if (window.scrollY > 300) {

        scrollBtn.classList.add("show");

    } else {

        scrollBtn.classList.remove("show");

    }

});

if (scrollBtn) {

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}
// ================= FIREBASE =================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDFEzgIjon9HWPA3HH25kvGHQVhpHEY72k",
  authDomain: "madhav-class.firebaseapp.com",
  projectId: "madhav-class",
  storageBucket: "madhav-class.firebasestorage.app",
  messagingSenderId: "750047640585",
  appId: "1:750047640585:web:879ba4b5ffc4097e430cd8",
  measurementId: "G-PC91F2PNJ0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ================= ENQUIRY WHATSAPP ================= */
async function sendWhatsApp() {

    try {

        const name = document.getElementById("studentName").value.trim();
        const mobile = document.getElementById("mobile").value.trim();
        const parentName = document.getElementById("parentName").value.trim();
        const schoolName = document.getElementById("schoolName").value.trim();
        const studentClass = document.getElementById("studentClass").value;
        const message = document.getElementById("message").value.trim();

        // validation
        if (!name || !mobile || !studentClass) {
            alert("Please fill required fields");
            return;
        }

        // message text
        const text = `
🎓 New Admission Enquiry

👤 Student: ${name}
📱 Mobile: ${mobile}
👨‍👩‍👧 Parent: ${parentName}
🏫 School: ${schoolName}
📚 Class: ${studentClass}
📝 Message: ${message}
        `;

        // WhatsApp link (SAFE FORMAT)
        const phoneNumber = "916352712978"; // <-- YOUR NUMBER HERE

        const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(text)}`;

        // open whatsapp
        window.open(url, "_blank");

    } catch (error) {
        console.error("Error in sendWhatsApp:", error);
        alert("Something went wrong. Check console.");
    }
}
 window.sendWhatsApp = sendWhatsApp;
