/**
 * =========================================================================
 * AALIYAAAA's BIRTHDAY SURPRISE – MAIN APPLICATION LOGIC
 * =========================================================================
 * Strict Envelope-First Experience:
 * 1. Initial State: Only the dreamy invitation and closed envelope are shown.
 *    All other sections are strictly locked and hidden. Scrolling is disabled.
 * 2. When she clicks "Open Your Surprise ❤️":
 *    - Animate 3D envelope opening.
 *    - Reveal the birthday greeting with confetti and floating hearts.
 *    - Display "Continue Our Story ♡" button.
 * 3. Only after clicking "Continue Our Story ♡":
 *    - Unlocks complete website and enables smooth scrolling.
 *    - Reveals photo gallery, love notes, letter, wedding countdown, future together.
 */

let isSurpriseOpened = false;
let scrollObserverInstance = null;

document.addEventListener("DOMContentLoaded", () => {
  const config = window.BIRTHDAY_CONFIG || {};

  initEnvelopeGateway(config);
  initTimelineMilestones(config);
  initScrapbookGallery(config);
  initThingsILove(config);
  initSecretNotes(config);
  initWeddingCountdown(config);
  initWeddingRingsAnimation();
  initMusicPlayer(config);
  initCakeInteraction();
  initFinaleActions();
  initSettingsModal(config);

  // Check if surprise was previously opened in this session
  checkSavedOpeningState();
});

/**
 * 1. Intersection Observer for Scroll Reveals
 */
function initScrollReveal() {
  if (scrollObserverInstance) {
    scrollObserverInstance.disconnect();
  }

  scrollObserverInstance = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  document.querySelectorAll(".reveal-on-scroll").forEach(el => scrollObserverInstance.observe(el));
}

/**
 * 2. Envelope Gateway Interaction (Strict Locking & Unlocking)
 */
function initEnvelopeGateway(config) {
  const envelopeBox = document.getElementById("envelope-box");
  const waxSeal = document.getElementById("wax-seal");
  const openSurpriseBtn = document.getElementById("open-surprise-btn");
  const gateCtaWrapper = document.getElementById("gate-cta-wrapper");
  const revealCard = document.getElementById("birthday-reveal-card");
  const continueStoryBtn = document.getElementById("continue-story-btn");

  // Step 1: Open the envelope & reveal birthday greeting
  const openEnvelope = () => {
    if (envelopeBox.classList.contains("is-open")) return;

    envelopeBox.classList.add("is-open");
    if (gateCtaWrapper) gateCtaWrapper.classList.add("is-hidden");

    // Confetti cannon & floating hearts burst
    const rect = envelopeBox.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    if (window.RomanticParticles) {
      window.RomanticParticles.burst(centerX, centerY, 85);
      setTimeout(() => {
        window.RomanticParticles.burst(centerX, centerY - 60, 50);
      }, 350);
    }

    // Start romantic background melody gently
    if (window.RomanticAudio && !window.RomanticAudio.isPlaying) {
      window.RomanticAudio.play();
    }

    // Reveal the birthday card with the "Continue Our Story ♡" button
    setTimeout(() => {
      if (revealCard) {
        revealCard.classList.add("visible");
        document.body.classList.add("envelope-opened");
        revealCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 650);
  };

  if (openSurpriseBtn) openSurpriseBtn.addEventListener("click", openEnvelope);
  if (waxSeal) waxSeal.addEventListener("click", (e) => {
    e.stopPropagation();
    openEnvelope();
  });
  if (envelopeBox) envelopeBox.addEventListener("click", openEnvelope);

  // Step 2: "Continue Our Story ♡" - Unlocks the full website and enables scrolling
  if (continueStoryBtn) {
    continueStoryBtn.addEventListener("click", (e) => {
      e.preventDefault();
      unlockFullWebsite(true);
    });
  }
}

/**
 * Unlock the complete love story and enable scrolling
 */
function unlockFullWebsite(shouldScroll = true) {
  isSurpriseOpened = true;
  sessionStorage.setItem("aaliya_surprise_opened", "true");

  // Unlock scrolling on html and body
  document.documentElement.classList.remove("is-locked");
  document.documentElement.classList.add("is-unlocked");
  document.body.classList.remove("is-locked", "envelope-opened");
  document.body.classList.add("is-unlocked");

  // Unlock the story container
  const storyContainer = document.getElementById("unlocked-story");
  if (storyContainer) {
    storyContainer.classList.remove("story-locked");
    storyContainer.classList.add("story-unlocked");
  }

  // Initialize scroll observer for all newly unlocked sections
  initScrollReveal();

  if (shouldScroll) {
    // Secondary celebration burst
    if (window.RomanticParticles) {
      window.RomanticParticles.burst(window.innerWidth / 2, 200, 60);
    }

    // Smooth scroll into the first chapter: Our Story (From 2020 to Forever)
    setTimeout(() => {
      const firstSection = document.getElementById("our-story") || document.getElementById("memories");
      if (firstSection) {
        firstSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
  }
}

/**
 * Check if the surprise was already opened in this session
 */
function checkSavedOpeningState() {
  const savedState = sessionStorage.getItem("aaliya_surprise_opened");
  if (savedState === "true") {
    // Restore opened envelope state
    const envelopeBox = document.getElementById("envelope-box");
    const gateCtaWrapper = document.getElementById("gate-cta-wrapper");
    const revealCard = document.getElementById("birthday-reveal-card");

    if (envelopeBox) envelopeBox.classList.add("is-open");
    if (gateCtaWrapper) gateCtaWrapper.classList.add("is-hidden");
    if (revealCard) revealCard.classList.add("visible");

    // Unlock story without jump scrolling
    unlockFullWebsite(false);
  }
}

/**
 * 3. Interactive Birthday Cake
 */
function initCakeInteraction() {
  const cake = document.getElementById("birthday-cake");
  const flame = document.getElementById("cake-flame");
  const wishPrompt = document.getElementById("cake-wish-prompt");
  if (!cake || !flame) return;

  cake.addEventListener("click", () => {
    if (flame.classList.contains("extinguished")) {
      // Re-light
      flame.classList.remove("extinguished");
      if (wishPrompt) wishPrompt.textContent = "Make a wish & tap the candle 🎂✨";
    } else {
      // Extinguish & make wish
      flame.classList.add("extinguished");
      if (window.RomanticParticles) {
        const rect = flame.getBoundingClientRect();
        window.RomanticParticles.burst(rect.left + rect.width / 2, rect.top, 50);
      }
      if (wishPrompt) {
        wishPrompt.innerHTML = "✨ <em>Wish made! May all your duas come true, Aaliyaaaa! ❤️</em>";
      }
    }
  });
}

/**
 * 4. Scrapbook Timeline Milestones – Photo Upload & In-place Description Editing
 */
function initTimelineMilestones(config) {
  const milestones = document.querySelectorAll(".timeline-milestone");

  milestones.forEach((milestone, index) => {
    const mId = milestone.getAttribute("data-milestone") || `${index + 1}`;
    const img = milestone.querySelector(".polaroid-img");
    const descEl = milestone.querySelector(".milestone-desc");
    const titleEl = milestone.querySelector(".milestone-title");
    const fileInput = milestone.querySelector(".file-input-hidden");
    const uploadBtn = milestone.querySelector(".upload-btn");

    // Load saved custom photo
    // Photos are fixed (no upload UI) – clear any previously uploaded override
    localStorage.removeItem(`aaliya_milestone_photo_${mId}`);

    // Load saved custom description
    const savedDesc = localStorage.getItem(`aaliya_milestone_desc_${mId}`);
    if (savedDesc && descEl) {
      descEl.textContent = savedDesc;
    }

    // Load saved custom title
    const savedTitle = localStorage.getItem(`aaliya_milestone_title_${mId}`);
    if (savedTitle && titleEl) {
      titleEl.textContent = savedTitle;
    }

    // Photo upload
    if (uploadBtn && fileInput) {
      uploadBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        fileInput.click();
      });

      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
          alert("Please select an image file (JPEG, PNG, WebP).");
          return;
        }

        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          const dataUrl = loadEvent.target.result;
          if (img) img.src = dataUrl;
          try {
            localStorage.setItem(`aaliya_milestone_photo_${mId}`, dataUrl);
          } catch (storageErr) {
            console.warn("Storage full for milestone photo:", storageErr);
          }
          if (window.RomanticParticles) {
            const rect = milestone.getBoundingClientRect();
            window.RomanticParticles.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
          }
        };
        reader.readAsDataURL(file);
      });
    }

    // Editable description
    if (descEl) {
      descEl.setAttribute("contenteditable", "true");
      descEl.setAttribute("spellcheck", "false");
      descEl.addEventListener("blur", () => {
        const newDesc = descEl.textContent.trim();
        localStorage.setItem(`aaliya_milestone_desc_${mId}`, newDesc);
      });
      descEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          descEl.blur();
        }
      });
    }

    // Editable title
    if (titleEl) {
      titleEl.setAttribute("contenteditable", "true");
      titleEl.setAttribute("spellcheck", "false");
      titleEl.addEventListener("blur", () => {
        const newTitle = titleEl.textContent.trim();
        localStorage.setItem(`aaliya_milestone_title_${mId}`, newTitle);
      });
      titleEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          titleEl.blur();
        }
      });
    }
  });
}

/**
 * 5. Scrapbook Memories – 3D Tilt, Photo Upload & In-place Caption Editing
 */
function initScrapbookGallery(config) {
  const polaroids = document.querySelectorAll(".polaroid-card");

  polaroids.forEach((card, index) => {
    const photoId = card.getAttribute("data-id") || `photo-${index + 1}`;
    const img = card.querySelector(".polaroid-img");
    const captionEl = card.querySelector(".polaroid-caption");
    const fileInput = card.querySelector(".file-input-hidden");
    const uploadBtn = card.querySelector(".upload-btn");

    // Load any saved custom photo or caption from localStorage
    // Photos are fixed (no upload UI) – clear any previously uploaded override
    localStorage.removeItem(`aaliya_photo_${photoId}`);

    const savedCaption = localStorage.getItem(`aaliya_caption_${photoId}`);
    if (savedCaption && captionEl && 
        !savedCaption.includes("From one unexpected message to endless conversations") &&
        !savedCaption.includes("The brightest light in every room") &&
        !savedCaption.includes("Every journey with you is my favourite journey") &&
        !savedCaption.includes("Anywhere by your side is where I truly belong") &&
        !savedCaption.includes("Laughing until our stomachs hurt") &&
        !savedCaption.includes("Counting down to all the adventures")) {
      captionEl.textContent = savedCaption;
    }

    // 3D Tilt on Mousemove
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04) translateY(-10px)`;
    });

    card.addEventListener("mouseleave", () => {
      const originalRot = card.style.getPropertyValue("--rot") || "0deg";
      card.style.transform = `rotate(${originalRot})`;
    });

    // Photo Upload replacement
    if (uploadBtn && fileInput) {
      uploadBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        fileInput.click();
      });

      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
          alert("Please select an image file (JPEG, PNG, WebP).");
          return;
        }

        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          const dataUrl = loadEvent.target.result;
          if (img) img.src = dataUrl;
          try {
            localStorage.setItem(`aaliya_photo_${photoId}`, dataUrl);
          } catch (storageErr) {
            console.warn("Storage full or quota reached for high-res photo:", storageErr);
          }
          if (window.RomanticParticles) {
            const rect = card.getBoundingClientRect();
            window.RomanticParticles.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);
          }
        };
        reader.readAsDataURL(file);
      });
    }

    // Editable Caption auto-save on blur
    if (captionEl) {
      captionEl.setAttribute("contenteditable", "true");
      captionEl.setAttribute("spellcheck", "false");
      captionEl.addEventListener("blur", () => {
        const newCaption = captionEl.textContent.trim();
        localStorage.setItem(`aaliya_caption_${photoId}`, newCaption);
      });

      captionEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          captionEl.blur();
        }
      });
    }
  });
}

/**
 * 5. Things I Love About You – 3D Card Flip
 */
function initThingsILove(config) {
  const cards = document.querySelectorAll(".love-card-container");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const isFlipped = card.classList.toggle("is-flipped");
      if (isFlipped && window.RomanticParticles) {
        const rect = card.getBoundingClientRect();
        window.RomanticParticles.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);
      }
    });
  });
}

/**
 * 6. Secret Love Notes – Folded Notes Expansion
 */
function initSecretNotes(config) {
  const noteItems = document.querySelectorAll(".secret-note-item");

  noteItems.forEach(note => {
    note.addEventListener("click", () => {
      const isOpened = note.classList.toggle("is-opened");
      if (isOpened && window.RomanticParticles) {
        const rect = note.getBoundingClientRect();
        window.RomanticParticles.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 30);
      }
    });
  });
}

/**
 * 7. Live Wedding Countdown Timer (May 2027)
 */
function initWeddingCountdown(config) {
  const daysEl = document.getElementById("countdown-days");
  const hoursEl = document.getElementById("countdown-hours");
  const minutesEl = document.getElementById("countdown-minutes");
  const secondsEl = document.getElementById("countdown-seconds");
  const statusLabel = document.getElementById("countdown-label-text");

  let targetDateStr = localStorage.getItem("aaliya_wedding_date") || config.weddingDate || "2027-05-01T00:00:00";
  let targetDate = new Date(targetDateStr);

  function updateTimer() {
    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;

    if (difference <= 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
      if (statusLabel) statusLabel.textContent = "Our Forever Has Begun! 💍❤️";
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);

  // Quick date change modal trigger
  const dateToggleBtn = document.getElementById("wedding-date-toggle-btn");
  if (dateToggleBtn) {
    dateToggleBtn.addEventListener("click", () => {
      const currentVal = targetDateStr.substring(0, 10);
      const newDate = prompt("Set exact wedding date (YYYY-MM-DD):", currentVal);
      if (newDate) {
        const parsed = new Date(newDate + "T00:00:00");
        if (!isNaN(parsed.getTime())) {
          targetDateStr = newDate + "T00:00:00";
          targetDate = parsed;
          localStorage.setItem("aaliya_wedding_date", targetDateStr);
          updateTimer();
          alert("Wedding countdown date updated! 💍");
        } else {
          alert("Invalid date format. Please use YYYY-MM-DD (e.g. 2027-05-15).");
        }
      }
    });
  }
}

/**
 * 8. Wedding Rings Coming Together Animation
 */
function initWeddingRingsAnimation() {
  const ringsStage = document.getElementById("wedding-rings-stage");
  if (!ringsStage) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        ringsStage.classList.add("rings-interlocked");
        if (window.RomanticParticles) {
          const rect = ringsStage.getBoundingClientRect();
          window.RomanticParticles.burst(rect.left + rect.width / 2, rect.top + 50, 45);
        }
      }
    });
  }, { threshold: 0.5 });

  observer.observe(ringsStage);
}

/**
 * 9. Background Music Player & Controls
 */
function initMusicPlayer(config) {
  const toggleBtn = document.getElementById("music-toggle-btn");
  const modalBackdrop = document.getElementById("music-modal-backdrop");
  const modalClose = document.getElementById("modal-close-btn");
  const volumeSlider = document.getElementById("volume-slider");
  const uploadInput = document.getElementById("song-upload-input");
  const uploadBtn = document.getElementById("song-upload-btn");
  const synthModeBtn = document.getElementById("synth-mode-btn");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", (e) => {
      if (window.RomanticAudio) {
        window.RomanticAudio.toggle();
      }
    });

    const infoIcon = document.getElementById("music-settings-icon");
    if (infoIcon) {
      infoIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        if (modalBackdrop) modalBackdrop.classList.add("is-open");
      });
    }
  }

  if (modalClose && modalBackdrop) {
    modalClose.addEventListener("click", () => modalBackdrop.classList.remove("is-open"));
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) modalBackdrop.classList.remove("is-open");
    });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value);
      if (window.RomanticAudio) window.RomanticAudio.setVolume(val);
    });
  }

  if (uploadBtn && uploadInput) {
    uploadBtn.addEventListener("click", () => uploadInput.click());
    uploadInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file && window.RomanticAudio) {
        window.RomanticAudio.saveCustomTrack(file);
        alert(`Loaded "${file.name}"! Playing now ♪`);
        if (modalBackdrop) modalBackdrop.classList.remove("is-open");
      }
    });
  }

  const songDefaultBtn = document.getElementById("song-default-btn");
  if (songDefaultBtn) {
    songDefaultBtn.addEventListener("click", () => {
      const audio = window.RomanticAudio;
      if (audio && audio.defaultSrc) {
        audio.stopSynth();
        if (!audio.audioElement.src.endsWith(audio.defaultSrc.split("/").pop())) {
          audio.audioElement.src = audio.defaultSrc;
        }
        audio.currentMode = "file";
        audio.updateTrackName((window.BIRTHDAY_CONFIG.music && window.BIRTHDAY_CONFIG.music.title) || "Our Song");
        audio.play();
        if (modalBackdrop) modalBackdrop.classList.remove("is-open");
      }
    });
  }

  if (synthModeBtn) {
    synthModeBtn.addEventListener("click", () => {
      if (window.RomanticAudio) {
        window.RomanticAudio.currentMode = 'synth';
        window.RomanticAudio.updateTrackName("Our Romantic Melody");
        if (window.RomanticAudio.audioElement) window.RomanticAudio.audioElement.pause();
        window.RomanticAudio.play();
        alert("Switched to acoustic romantic piano melody!");
        if (modalBackdrop) modalBackdrop.classList.remove("is-open");
      }
    });
  }
}

/**
 * 10. Finale Actions – Replay & Love Reaction
 */
function initFinaleActions() {
  const replayBtn = document.getElementById("replay-surprise-btn");
  const loveReactionBtn = document.getElementById("love-reaction-btn");

  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      // Re-lock the website and reset to closed envelope gate
      sessionStorage.removeItem("aaliya_surprise_opened");
      isSurpriseOpened = false;

      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        document.documentElement.classList.remove("is-unlocked");
        document.documentElement.classList.add("is-locked");
        document.body.classList.remove("is-unlocked", "envelope-opened");
        document.body.classList.add("is-locked");

        const storyContainer = document.getElementById("unlocked-story");
        if (storyContainer) {
          storyContainer.classList.remove("story-unlocked");
          storyContainer.classList.add("story-locked");
        }

        const envelopeBox = document.getElementById("envelope-box");
        const gateCtaWrapper = document.getElementById("gate-cta-wrapper");
        const revealCard = document.getElementById("birthday-reveal-card");

        if (envelopeBox) envelopeBox.classList.remove("is-open");
        if (gateCtaWrapper) gateCtaWrapper.classList.remove("is-hidden");
        if (revealCard) revealCard.classList.remove("visible");

        showToast("✨ Surprise reset! Ready to open again ♡");
      }, 600);
    });
  }

  if (loveReactionBtn) {
    loveReactionBtn.addEventListener("click", (e) => {
      const rect = loveReactionBtn.getBoundingClientRect();
      if (window.RomanticParticles) {
        window.RomanticParticles.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 90);
      }
      showToast("💕 All my love sent to my beautiful Aaliyaaaa! Always & forever.");
    });
  }
}

/**
 * 11. Settings / Personalization Drawer
 */
function initSettingsModal(config) {
  const fab = document.getElementById("settings-fab");
  const modal = document.getElementById("settings-modal");
  const closeBtn = document.getElementById("settings-modal-close");
  const resetBtn = document.getElementById("reset-all-btn");

  if (fab && modal) {
    fab.addEventListener("click", () => modal.classList.add("is-open"));
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.remove("is-open"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("is-open");
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset all uploaded photos and custom edits to default?")) {
        for (let i = 1; i <= 9; i++) {
          localStorage.removeItem(`aaliya_photo_photo-${i}`);
          localStorage.removeItem(`aaliya_caption_photo-${i}`);
        }
        for (let i = 1; i <= 4; i++) {
          localStorage.removeItem(`aaliya_milestone_photo_${i}`);
          localStorage.removeItem(`aaliya_milestone_desc_${i}`);
          localStorage.removeItem(`aaliya_milestone_title_${i}`);
        }
        localStorage.removeItem("aaliya_wedding_date");
        localStorage.removeItem("aaliya_card_bg_birthday_reveal");
        localStorage.removeItem("aaliya_card_bg_story");
        localStorage.removeItem("aaliya_card_bg_letter");
        location.reload();
      }
    });
  }
}

/**
 * Interactive Background Photo Upload for Main Story & Letter Cards
 */
function initCardBackgroundUploads() {
  const cardUploads = [
    {
      btnId: "btn-upload-birthday-reveal",
      inputId: "upload-birthday-reveal",
      targetSelector: "#birthday-reveal-card",
      storageKey: "aaliya_card_bg_birthday_reveal",
      gradient: "linear-gradient(180deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 248, 251, 0.40) 25%, rgba(255, 246, 249, 0.36) 50%, rgba(255, 248, 251, 0.42) 75%, rgba(255, 255, 255, 0.55) 100%)",
      position: "center 20% / cover no-repeat"
    },
    {
      btnId: "btn-upload-story-bg",
      inputId: "upload-story-bg",
      targetSelector: ".story-letter-card",
      storageKey: "aaliya_card_bg_story",
      gradient: "linear-gradient(180deg, rgba(255, 253, 249, 0.70) 0%, rgba(255, 248, 251, 0.60) 25%, rgba(255, 246, 249, 0.54) 50%, rgba(255, 248, 251, 0.62) 75%, rgba(255, 253, 249, 0.74) 100%)",
      position: "center 35% / cover no-repeat"
    },
    {
      btnId: "btn-upload-letter-bg",
      inputId: "upload-letter-bg",
      targetSelector: ".letter-parchment",
      storageKey: "aaliya_card_bg_letter",
      gradient: "linear-gradient(180deg, rgba(255, 253, 249, 0.68) 0%, rgba(255, 248, 251, 0.58) 25%, rgba(255, 246, 249, 0.52) 50%, rgba(255, 248, 251, 0.60) 75%, rgba(255, 253, 249, 0.72) 100%)",
      position: "center 45% / cover no-repeat"
    }
  ];

  cardUploads.forEach(({ btnId, inputId, targetSelector, storageKey, gradient, position }) => {
    const btn = document.getElementById(btnId);
    const input = document.getElementById(inputId);
    const target = document.querySelector(targetSelector);

    if (!target) return;

    // Restore saved custom background if present
    const savedBg = localStorage.getItem(storageKey);
    if (savedBg) {
      target.style.background = `${gradient}, url("${savedBg}") ${position}`;
    }

    if (btn && input) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        input.click();
      });

      input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
          alert("Please select an image file (JPEG, PNG, WebP).");
          return;
        }

        const reader = new FileReader();
        reader.onload = (loadEvt) => {
          const dataUrl = loadEvt.target.result;
          target.style.background = `${gradient}, url("${dataUrl}") ${position}`;
          try {
            localStorage.setItem(storageKey, dataUrl);
          } catch (err) {
            console.warn("Storage full for card background:", err);
          }

          if (window.RomanticParticles) {
            const rect = btn.getBoundingClientRect();
            window.RomanticParticles.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  });
}

function showToast(message) {
  let toast = document.getElementById("romantic-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "romantic-toast";
    toast.style.cssText = `
      position: fixed;
      top: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(-20px);
      background: rgba(109, 41, 71, 0.95);
      color: #FFF;
      padding: 14px 28px;
      border-radius: 9999px;
      font-size: 1rem;
      font-weight: 500;
      box-shadow: 0 10px 30px rgba(109, 41, 71, 0.35);
      z-index: 99999;
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
      text-align: center;
      max-width: 90vw;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = "1";
  toast.style.transform = "translateX(-50%) translateY(0)";

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(-20px)";
  }, 3500);
}
