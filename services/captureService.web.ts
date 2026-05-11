import html2canvas from 'html2canvas';
import { RefObject } from 'react';
import { findDOMNode } from 'react-dom';

export const captureAndShare = async (viewRef: RefObject<any>): Promise<void> => {
  if (!viewRef.current) {
    console.error("Element not found for capture");
    return;
  }
  
  // On react-native-web, refs point to RN component instances.
  // We need the underlying DOM node. Try multiple strategies:
  let element: HTMLElement | null = null;
  
  try {
    // Strategy 1: If the ref IS a DOM node (e.g., from a raw <div>)
    if (viewRef.current instanceof HTMLElement) {
      element = viewRef.current;
    } 
    // Strategy 2: findDOMNode for React Native Web components
    else {
      const node = findDOMNode(viewRef.current);
      if (node instanceof HTMLElement) {
        element = node;
      }
    }
  } catch (e) {
    console.warn('findDOMNode fallback failed:', e);
  }

  if (!element) {
    console.error("Could not resolve DOM element from ref");
    alert("Capture failed: could not find the card element.");
    return;
  }
  
  try {
    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      scale: 2,
      backgroundColor: '#F1F5F9',
      logging: false,
    });
    
    const image = canvas.toDataURL('image/png');
    
    const link = document.createElement('a');
    link.href = image;
    link.download = 'greeting-card.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
  } catch (error) {
    console.error('Web capture failed:', error);
    alert('Download failed. Cross-origin images may block capture on localhost.');
  }
};
