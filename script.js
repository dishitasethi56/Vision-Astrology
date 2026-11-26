// VISION website settings
// Add the astrologer's real email address below before publishing.
// Optional: add a WhatsApp number in international format, digits only (e.g. 919876543210).
const VISION_EMAIL = "YOUR_EMAIL@example.com";
const VISION_WHATSAPP = "";

document.getElementById("year").textContent = new Date().getFullYear();

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

document.getElementById("booking-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const topic = String(data.get("topic") || "").trim();
  const message = String(data.get("message") || "").trim();

  const subject = encodeURIComponent(`VISION appointment enquiry — ${name}`);
  const body = encodeURIComponent(
`Hello VISION,

I would like to enquire about an astrology consultation.

Name: ${name}
Phone / WhatsApp: ${phone}
Topic: ${topic}

My question:
${message || "I would like to discuss this during the consultation."}

Thank you.`
  );

  if (VISION_EMAIL && !VISION_EMAIL.includes("YOUR_EMAIL")) {
    window.location.href = `mailto:${VISION_EMAIL}?subject=${subject}&body=${body}`;
    document.getElementById("form-status").textContent = "Your email app should open with the enquiry prepared.";
  } else if (VISION_WHATSAPP) {
    window.open(`https://wa.me/${VISION_WHATSAPP}?text=${body}`, "_blank", "noopener");
    document.getElementById("form-status").textContent = "Your WhatsApp chat should open with the enquiry prepared.";
  } else {
    document.getElementById("form-status").textContent =
      "The form is ready. Website owner: add your email or WhatsApp number in script.js to receive enquiries.";
  }
});
