
/* ================= STARS ================= */
function generateStars(count) {
    const container = document.querySelector(".stars");
    if (!container) return;

    for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        star.className = "star";

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const delay = Math.random() * 3;
        const duration = 2 + Math.random() * 3;

        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;

        container.appendChild(star);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    generateStars(200);
});


/* ================= PLANETS (click for mobile) ================= */
document.addEventListener("DOMContentLoaded", () => {
    const planets = document.querySelectorAll(".planet");

    planets.forEach(planet => {
        planet.addEventListener("click", () => {
            const isActive = planet.classList.contains("active");

            planets.forEach(p => p.classList.remove("active"));

            if (!isActive) {
                planet.classList.add("active");
            }
        });
    });
});


/* ================= TYPING NAME ================= */
document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("typedName");
    if (!el) return;

    const text = el.dataset.text || el.textContent.trim();
    let i = 0;
    let deleting = false;

    el.textContent = "";

    const tick = () => {
        if (!deleting) {
            i++;
            el.textContent = text.slice(0, i);

            if (i === text.length) {
                deleting = true;
                return setTimeout(tick, 1800);
            }

            return setTimeout(tick, 130);
        }

        i--;
        el.textContent = text.slice(0, i);

        if (i === 0) {
            deleting = false;
            return setTimeout(tick, 500);
        }

        setTimeout(tick, 70);
    };

    setTimeout(tick, 600);
});


/* ================= VOLUNTEER SLIDER ================= */
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".vol-slider");
    if (!slider) return;

    const track = slider.querySelector(".vol-track");
    const slides = slider.querySelectorAll(".vol-slide");
    const dotsWrap = document.querySelector(".vol-dots");
    const prev = slider.querySelector(".vol-prev");
    const next = slider.querySelector(".vol-next");

    if (!track || !slides.length || !dotsWrap || !prev || !next) return;

    let index = 0;
    let timer = null;

    slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "vol-dot";
        dot.setAttribute("aria-label", `Photo ${i + 1}`);

        dot.addEventListener("click", () => {
            go(i);
            restart();
        });

        dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll(".vol-dot");

    function go(i) {
        index = (i + slides.length) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;

        dots.forEach((d, j) => {
            d.classList.toggle("active", j === index);
        });
    }

    function start() {
        stop();
        timer = setInterval(() => go(index + 1), 4000);
    }

    function stop() {
        clearInterval(timer);
    }

    function restart() {
        stop();
        start();
    }

    prev.addEventListener("click", () => {
        go(index - 1);
        restart();
    });

    next.addEventListener("click", () => {
        go(index + 1);
        restart();
    });

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);

    let startX = null;

    slider.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        stop();
    }, { passive: true });

    slider.addEventListener("touchend", (e) => {
        if (startX !== null) {
            const dx = e.changedTouches[0].clientX - startX;

            if (Math.abs(dx) > 40) {
                go(index + (dx < 0 ? 1 : -1));
            }

            startX = null;
        }

        start();
    });

    go(0);
    start();
});


/* ================= PRAY BUTTON ================= */
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("prayBtn");
    const thanks = document.getElementById("prayThanks");

    if (!btn) return;

    const KEY = "prayed_for_dad";

    const markDone = () => {
        btn.disabled = true;
        btn.classList.add("done");
        btn.innerHTML = '<i class="fa-solid fa-check"></i> تقبّل الله دعاءك';

        if (thanks) {
            thanks.textContent = "جزاك الله خيراً، ولك بمثله ✦";
        }
    };

    try {
        if (localStorage.getItem(KEY)) {
            markDone();
        }
    } catch (e) {}

    btn.addEventListener("click", () => {
        markDone();

        try {
            localStorage.setItem(KEY, "1");
        } catch (e) {}
    });
});


/* ================= CONTACT FORM (Web3Forms) ================= */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");

    if (!form || !status) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const btn = form.querySelector(".send-btn");

        if (btn) {
            btn.disabled = true;
        }

        status.className = "form-status";
        status.textContent = "Sending...";

        try {
            const formData = new FormData(form);

            formData.append(
                "access_key",
                "9aa8803f-5147-4443-8ef1-38b067df01b4"
            );

            formData.append(
                "subject",
                "New message from Malak's Portfolio"
            );

            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(
                    data.message || "Failed to send message. Please try again."
                );
            }

            status.textContent = "Message sent successfully! ✦";
            form.reset();

        } catch (err) {
            status.textContent =
                err.message || "Something went wrong, please try again.";

            status.classList.add("error");

        } finally {
            if (btn) {
                btn.disabled = false;
            }
        }
    });
});

