document.addEventListener('DOMContentLoaded', function() {
  // ===== THEME SWITCHER =====
  const toggleBtn = document.getElementById("themeToggle");
  const body = document.body;

  // Применяем сохранённую тему при загрузке
  if (localStorage.getItem("theme") === "light") {
    body.classList.add("light");
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }

  // Переключение темы по кнопке
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("light");
    if (body.classList.contains("light")) {
      localStorage.setItem("theme", "light");
      toggleBtn.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "dark");
      toggleBtn.textContent = "🌙";
    }
  });

  // Синхронизация темы между вкладками
  window.addEventListener("storage", () => {
    if (localStorage.getItem("theme") === "light") {
      body.classList.add("light");
      toggleBtn.textContent = "☀️";
    } else {
      body.classList.remove("light");
      toggleBtn.textContent = "🌙";
    }
  });

  // ===== READ MORE =====
  const readMoreBtn = document.getElementById("readMoreBtn");
  const bioFull = document.getElementById("bioFull");

  if (readMoreBtn && bioFull) {
    readMoreBtn.addEventListener("click", () => {
      bioFull.classList.toggle("open");

      readMoreBtn.textContent = bioFull.classList.contains("open")
        ? "Скрыть"
        : "Читать полностью";
    });
  }

  // ===== SPOTIFY LINKS =====
  document.querySelectorAll(".tracklist li").forEach(track => {
    track.addEventListener("click", () => {
      const spotifyUrl = track.getAttribute("data-spotify");
      if (spotifyUrl) {
        window.open(spotifyUrl, "_blank");
      }
    });
  });

  // ===== SCROLL ANIMATION =====
  const sections = document.querySelectorAll(".fade-section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));

  // ===== FULLSCREEN GALLERY =====
  const galleryImages = document.querySelectorAll(".gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.querySelector(".lightbox-close");
  const prevBtn = document.getElementById("prevImg");
  const nextBtn = document.getElementById("nextImg");

  let currentImageIndex = 0;

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentImageIndex = index;
      openLightbox(img.src);
    });
  });

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", e => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentImageIndex =
        (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
      lightboxImg.src = galleryImages[currentImageIndex].src;
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentImageIndex =
        (currentImageIndex + 1) % galleryImages.length;
      lightboxImg.src = galleryImages[currentImageIndex].src;
    });
  }

  // ESC закрытие
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
  });
});
