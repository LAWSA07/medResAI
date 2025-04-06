/**
 * Utility functions for the Molecule Viewer component
 */

/**
 * Checks if 3DMol.js is loaded and available globally
 * @returns {Promise<boolean>} Promise that resolves to true if 3DMol.js is available
 */
export const check3DMolAvailability = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if 3DMol is already available
    if (window.$3Dmol) {
      console.log('3DMol.js is already available');
      resolve(true);
      return;
    }

    // Set a timeout to check multiple times
    let attempts = 0;
    const maxAttempts = 10;
    const checkInterval = setInterval(() => {
      attempts++;
      if (window.$3Dmol) {
        console.log(`3DMol.js became available after ${attempts} attempts`);
        clearInterval(checkInterval);
        resolve(true);
      } else if (attempts >= maxAttempts) {
        console.error(`3DMol.js failed to load after ${maxAttempts} attempts`);
        clearInterval(checkInterval);
        resolve(false);
      }
    }, 300);
  });
};

/**
 * Loads 3DMol.js dynamically if not already loaded
 * @returns {Promise<boolean>} Promise that resolves to true if 3DMol.js is loaded successfully
 */
export const load3DMol = async (): Promise<boolean> => {
  // Check if 3DMol is already available
  if (window.$3Dmol) {
    return true;
  }

  // Check if jQuery is available, load if not
  if (!window.$) {
    try {
      const jqueryScript = document.createElement('script');
      jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
      jqueryScript.async = true;
      document.head.appendChild(jqueryScript);

      // Wait for jQuery to load
      await new Promise<void>((resolve) => {
        jqueryScript.onload = () => resolve();
      });
    } catch (error) {
      console.error('Failed to load jQuery:', error);
      return false;
    }
  }

  // Load 3DMol.js
  try {
    const threeDMolScript = document.createElement('script');
    threeDMolScript.src = 'https://3Dmol.org/build/3Dmol-min.js';
    threeDMolScript.async = true;
    document.head.appendChild(threeDMolScript);

    // Wait for 3DMol to load
    await new Promise<void>((resolve) => {
      threeDMolScript.onload = () => resolve();
    });

    // Verify 3DMol is available
    return await check3DMolAvailability();
  } catch (error) {
    console.error('Failed to load 3DMol.js:', error);
    return false;
  }
};

/**
 * Gets available visualization styles for 3DMol.js
 * @returns {Array<{label: string, value: string}>} Array of style options
 */
export const getVisualizationStyles = (): Array<{label: string, value: string}> => {
  return [
    { label: 'Stick', value: 'stick' },
    { label: 'Sphere', value: 'sphere' },
    { label: 'Line', value: 'line' },
    { label: 'Cartoon', value: 'cartoon' },
    { label: 'Surface', value: 'surface' }
  ];
};

/**
 * Gets available size presets for the viewer
 * @returns {Record<string, {width: number, height: number}>} Object of size presets
 */
export const getViewerSizePresets = (): Record<string, {width: number, height: number}> => {
  return {
    small: { width: 400, height: 300 },
    medium: { width: 500, height: 400 },
    large: { width: 600, height: 500 },
    extraLarge: { width: 800, height: 600 }
  };
};