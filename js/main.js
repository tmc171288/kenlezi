// ========================================
// LANGUAGE SWITCHING
// ========================================
const btnVi = document.getElementById("btn-vi");
const btnEn = document.getElementById("btn-en");

function switchButtons(activeBtn, inactiveBtn) {
  activeBtn.classList.add("active");
  inactiveBtn.classList.remove("active");
}

function setLanguage(lang) {
  const showClass = lang;
  const hideClass = lang === "vi" ? "en" : "vi";

  // Hiển thị ngôn ngữ được chọn
  document.querySelectorAll(".lang." + showClass).forEach((el) => {
    el.classList.remove("hidden", "fade-out");
    el.classList.add("fade-in");
  });

  // Ẩn ngôn ngữ còn lại
  document.querySelectorAll(".lang." + hideClass).forEach((el) => {
    el.classList.remove("fade-in");
    el.classList.add("fade-out");
    setTimeout(() => el.classList.add("hidden"), 220);
  });

  // Lưu lựa chọn vào localStorage
  localStorage.setItem("preferredLanguage", lang);

  // Cập nhật thuộc tính lang của HTML
  document.documentElement.lang = lang;
}

// Event listeners cho nút ngôn ngữ
btnVi.addEventListener("click", () => {
  setLanguage("vi");
  switchButtons(btnVi, btnEn);
});

btnEn.addEventListener("click", () => {
  setLanguage("en");
  switchButtons(btnEn, btnVi);
});

// Khôi phục ngôn ngữ đã lưu hoặc mặc định là tiếng Việt
window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("preferredLanguage") || "vi";
  setLanguage(savedLang);
  if (savedLang === "en") {
    switchButtons(btnEn, btnVi);
  }
});

// ========================================
// SMOOTH SCROLLING
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================
let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Thêm shadow khi scroll
  if (scrollTop > 50) {
    header.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.5)";
  } else {
    header.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.3)";
  }

  lastScrollTop = scrollTop;
});

// ========================================
// FORM VALIDATION & SUBMISSION
// ========================================
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Lấy giá trị từ form
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const message = contactForm.querySelector("textarea").value.trim();

    // Validation đơn giản
    if (!name || !email || !message) {
      showNotification(
        localStorage.getItem("preferredLanguage") === "en"
          ? "Please fill in all fields!"
          : "Vui lòng điền đầy đủ thông tin!",
        "error"
      );
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification(
        localStorage.getItem("preferredLanguage") === "en"
          ? "Please enter a valid email address!"
          : "Email không hợp lệ!",
        "error"
      );
      return;
    }

    // Giả lập gửi form (trong thực tế bạn sẽ gửi đến server)
    showNotification(
      localStorage.getItem("preferredLanguage") === "en"
        ? "Message sent successfully!"
        : "Gửi tin nhắn thành công!",
      "success"
    );

    // Reset form
    contactForm.reset();
  });
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type = "success") {
  // Xóa notification cũ nếu có
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Tạo notification mới
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Style cho notification
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 40px;
    padding: 16px 24px;
    background: ${
      type === "success"
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    };
    color: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    font-weight: 600;
    animation: slideInRight 0.3s ease;
    max-width: 300px;
  `;

  document.body.appendChild(notification);

  // Tự động xóa sau 3 giây
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Quan sát tất cả các section
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

// ========================================
// CARD HOVER EFFECTS
// ========================================
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    // Tạo hiệu ứng ripple khi hover
    this.style.transition = "all 0.3s ease";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transition = "all 0.3s ease";
  });
});

// ========================================
// PARALLAX EFFECT FOR HERO
// ========================================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");

  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    hero.style.opacity = 1 - scrolled / 500;
  }
});

// ========================================
// ADD ANIMATION KEYFRAMES DYNAMICALLY
// ========================================
const style = document.createElement("style");
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ========================================
// LOADING ANIMATION (Optional)
// ========================================
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log(
  "%c🚀 Welcome to KenLeZi!",
  "color: #667eea; font-size: 24px; font-weight: bold;"
);
console.log(
  "%cMade with ❤️ and modern web technologies",
  "color: #764ba2; font-size: 14px;"
);
