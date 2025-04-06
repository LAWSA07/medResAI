import React, { useRef, useEffect } from 'react';

// Define global types for 3DMol and jQuery
declare global {
  interface Window {
    $3Dmol: any;
    $: any;
  }
}

// Props interface for the MoleculeViewer component
interface MoleculeViewerProps {
  // The molecular data string (PDB, SDF, etc.)
  molData: string;
  // The format of the molData (default: 'pdb')
  format?: 'pdb' | 'sdf' | 'mol2' | 'xyz' | string;
  // The height of the viewer container (default: 400px)
  height?: number;
  // The width of the viewer container (default: 400px)
  width?: number;
  // The style to display the molecule (default: 'stick')
  style?: 'stick' | 'sphere' | 'line' | 'cartoon' | 'surface';
  // Additional CSS class name
  className?: string;
  // Additional inline styles
  containerStyle?: React.CSSProperties;
}

/**
 * MoleculeViewer Component
 *
 * A React component that renders a 3D molecular structure using 3DMol.js
 */
const MoleculeViewer: React.FC<MoleculeViewerProps> = ({
  molData,
  format = 'pdb',
  height = 400,
  width = 400,
  style = 'stick',
  className = '',
  containerStyle = {},
}) => {
  // Reference to the container element
  const viewerContainerRef = useRef<HTMLDivElement>(null);
  // Reference to the 3DMol viewer instance
  const viewerRef = useRef<any>(null);

  // Effect to initialize and clean up the 3DMol viewer
  useEffect(() => {
    if (!viewerContainerRef.current || !molData || !window.$3Dmol) {
      console.log("Missing required elements:", {
        container: Boolean(viewerContainerRef.current),
        molData: Boolean(molData),
        $3Dmol: Boolean(window.$3Dmol)
      });
      return;
    }

    // Clean up any existing viewer
    if (viewerRef.current) {
      try {
        viewerRef.current.removeAllModels();
        viewerRef.current = null;
      } catch (e) {
        console.error('Error cleaning up previous viewer:', e);
      }
    }

    // Use a setTimeout to ensure DOM is fully rendered
    setTimeout(() => {
      try {
        // Initialize the viewer with the global $ and $3Dmol from CDN
        const viewer = window.$3Dmol.createViewer(window.$(viewerContainerRef.current), {
          backgroundColor: 'white',
          antialias: true,
        });

        // Add the molecular model
        const model = viewer.addModel(molData, format);

        // Set the visualization style
        switch (style) {
          case 'stick':
            model.setStyle({}, { stick: { radius: 0.15, colorscheme: 'jmol' } });
            break;
          case 'sphere':
            model.setStyle({}, { sphere: { radius: 0.8, colorscheme: 'jmol' } });
            break;
          case 'line':
            model.setStyle({}, { line: { colorscheme: 'jmol' } });
            break;
          case 'cartoon':
            model.setStyle({}, { cartoon: { colorscheme: 'jmol' } });
            break;
          case 'surface':
            model.setStyle({}, { surface: { opacity: 0.8, colorscheme: 'jmol' } });
            break;
          default:
            model.setStyle({}, { stick: { radius: 0.15, colorscheme: 'jmol' } });
        }

        // Zoom to fit the model in the viewer
        viewer.zoomTo();
        // Render the model
        viewer.render();

        // Store the viewer reference
        viewerRef.current = viewer;

        console.log("3DMol viewer initialized successfully");
      } catch (error) {
        console.error("Error initializing 3DMol viewer:", error);
      }
    }, 100);

    // Clean up function
    return () => {
      try {
        if (viewerRef.current) {
          viewerRef.current.removeAllModels();
          viewerRef.current = null;
        }
      } catch (e) {
        console.error('Error during cleanup:', e);
      }
    };
  }, [molData, format, style]); // Re-run when these dependencies change

  // Effect to handle resize
  useEffect(() => {
    if (viewerRef.current) {
      try {
        viewerRef.current.resize();
        viewerRef.current.render();
      } catch (error) {
        console.error("Error resizing viewer:", error);
      }
    }
  }, [height, width]);

  return (
    <div
      ref={viewerContainerRef}
      className={`molecule-viewer ${className}`}
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        margin: '0 auto',
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        ...containerStyle,
      }}
      data-testid="molecule-viewer"
    />
  );
};

export default MoleculeViewer;