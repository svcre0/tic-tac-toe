import confetti from 'canvas-confetti';

/**
 * Create a confetti animation with customizable options
 * @param {Object} options - Configuration for the confetti animation
 * @param {number} options.during - Duration of the confetti effect in milliseconds
 * @param {boolean} options.disableForReducedMotion - Disable confetti for users with reduced motion settings
 */
export function createConfetti({
  during = 500,
  disableForReducedMotion = false
} = {}) {
  const end = Date.now() + during;

  // Recursive function to generate confetti effects
  (function frame() {
    // Launch confetti from the left edge of the screen
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      disableForReducedMotion
    });

    // Launch confetti from the right edge of the screen
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      disableForReducedMotion
    });

    // Continue the animation until the time limit is reached
    if (!disableForReducedMotion && Date.now() < end) {
      window.requestAnimationFrame(frame);
    }
  })();
}

/**
 * Reset the confetti animation (stop any ongoing effects)
 */
export function resetConfetti() {
  confetti.reset();
}
