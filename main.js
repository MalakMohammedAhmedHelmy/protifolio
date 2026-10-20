/* ================= STARS ================= */
function generateStars(count) {
    const container = document.querySelector(".stars");
    if (!container) return;

    for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        star.className = "star";

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const delay = Math.random() * 3;        // كل نجمة تبدأ الوميض في وقت مختلف
        const duration = 2 + Math.random() * 3; // سرعة الوميض تختلف من نجمة للتانية

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
            if (!isActive) planet.classList.add("active");
        });
    });
});

/* ================= CONTACT FORM (Laravel) ================= */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const btn = form.querySelector(".send-btn");
        btn.disabled = true;
        status.className = "form-status";
        status.textContent = "Sending...";

        try {
            const res = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),   // فيه الـ _token من @csrf
                headers: { Accept: "application/json" }
            });

            const data = await res.json();

            if (res.ok && data.ok) {
                status.textContent = "Message sent successfully! ✦";
                form.reset();
            } else {
                const firstError = data.errors
                    ? Object.values(data.errors)[0][0]
                    : data.message;
                throw new Error(firstError || "failed");
            }
        } catch (err) {
            status.textContent = err.message || "Something went wrong, please try again.";
            status.classList.add("error");
        } finally {
            btn.disabled = false;
        }
    });
});