// ========================================
// BACK TO TOP BUTTON
// ========================================

const backToTopButton = document.getElementById("backToTop");

// Show/hide back to top button based on scroll position
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
});

// Smooth scroll to top when button is clicked
if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ========================================
// FOOTER ANIMATIONS ON SCROLL
// ========================================

const observeFooter = () => {
  const footerElements = document.querySelectorAll(".footer-column");

  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 100);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  footerElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    footerObserver.observe(element);
  });
};

// Initialize footer animations when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", observeFooter);
} else {
  observeFooter();
}

// ========================================
// SOCIAL BUTTONS TRACKING (Optional)
// ========================================

const socialButtons = document.querySelectorAll(".social-btn");

socialButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const platform = this.classList[1]; // facebook, zalo, messenger, hotline

    // Add click animation
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "";
    }, 150);

    // Optional: Track analytics
    console.log(`Social button clicked: ${platform}`);

    // You can add analytics tracking here
    // Example: gtag('event', 'social_click', { platform: platform });
  });
});

// ========================================
// FOOTER LINKS HOVER EFFECTS
// ========================================

const footerLinks = document.querySelectorAll(".footer-links a");

footerLinks.forEach((link) => {
  link.addEventListener("mouseenter", function () {
    this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  });
});

// ========================================
// WEBSITE LINKS EXTERNAL INDICATOR
// ========================================

const websiteLinks = document.querySelectorAll(".website-links a");

websiteLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    // Add a subtle animation before navigation
    this.style.transform = "translateX(12px)";

    // Optional: You can add a delay before navigation
    // e.preventDefault();
    // setTimeout(() => {
    //   window.open(this.href, '_blank');
    // }, 200);
  });
});

// ========================================
// CONTACT ITEMS - COPY TO CLIPBOARD
// ========================================

const contactItems = document.querySelectorAll(".contact-item");

contactItems.forEach((item) => {
  const link = item.querySelector("a");
  if (link && (link.href.includes("mailto:") || link.href.includes("tel:"))) {
    item.style.cursor = "pointer";

    item.addEventListener("click", function (e) {
      if (e.target.tagName !== "A") {
        const text = link.textContent.trim();

        // Try to copy to clipboard
        if (navigator.clipboard) {
          navigator.clipboard
            .writeText(text)
            .then(() => {
              showFooterNotification("Đã sao chép: " + text);
            })
            .catch(() => {
              // Fallback if clipboard API fails
              console.log("Could not copy to clipboard");
            });
        }
      }
    });
  }
});

// ========================================
// FOOTER NOTIFICATION SYSTEM
// ========================================

function showFooterNotification(message) {
  // Remove existing notification if any
  const existingNotification = document.querySelector(".footer-notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create new notification
  const notification = document.createElement("div");
  notification.className = "footer-notification";
  notification.textContent = message;

  // Style the notification
  notification.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 40px;
    padding: 16px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
    z-index: 10001;
    font-weight: 600;
    font-size: 14px;
    animation: slideInUp 0.3s ease;
    max-width: 300px;
  `;

  document.body.appendChild(notification);

  // Auto remove after 2 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutDown 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// ========================================
// SMOOTH SCROLL FOR FOOTER LINKS
// ========================================

document.querySelectorAll('.footer-links a[href^="#"]').forEach((anchor) => {
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
// DYNAMIC YEAR IN COPYRIGHT
// ========================================

const updateCopyrightYear = () => {
  const yearElements = document.querySelectorAll(".footer-bottom p");
  const currentYear = new Date().getFullYear();

  yearElements.forEach((element) => {
    if (element.textContent.includes("©")) {
      element.textContent = element.textContent.replace(/\d{4}/, currentYear);
    }
  });
};

updateCopyrightYear();

// ========================================
// ADD SLIDE ANIMATIONS TO NOTIFICATION
// ========================================

const notificationStyle = document.createElement("style");
notificationStyle.textContent = `
  @keyframes slideInUp {
    from {
      transform: translateY(100px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideOutDown {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(notificationStyle);

// ========================================
// LAZY LOAD FOOTER IMAGES (if any)
// ========================================

const lazyLoadFooterImages = () => {
  const images = document.querySelectorAll(".main-footer img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
};

lazyLoadFooterImages();

// ========================================
// KEYBOARD ACCESSIBILITY FOR BACK TO TOP
// ========================================

if (backToTopButton) {
  backToTopButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Throttle scroll events for better performance
let ticking = false;

function throttle(callback) {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      callback();
      ticking = false;
    });
    ticking = true;
  }
}

// ========================================
// CONSOLE MESSAGE FOR FOOTER
// ========================================

console.log(
  "%c👟 Footer Loaded Successfully!",
  "color: #667eea; font-size: 16px; font-weight: bold;"
);

console.log(
  "%cAll interactive features are ready.",
  "color: #764ba2; font-size: 12px;"
);
