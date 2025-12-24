import { useState, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import QuizOverlay from './components/QuizOverlay';
import TreeScene from './components/TreeScene';
import PosterOverlay from './components/PosterOverlay';
import TreeDescription from './components/TreeDescription';
import './index.css';

function App() {
  const [step, setStep] = useState('quiz');
  const [treeParams, setTreeParams] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const appRef = useRef(null);
  const glRef = useRef(null);

  const handleQuizComplete = (params) => {
    setTreeParams(params);
    setStep('result');
  };

  const handleRestart = () => {
    setStep('quiz');
    setTreeParams(null);
    setIsCapturing(false);
  };

  const handleScreenshot = useCallback(async () => {
    // Show poster and hide buttons
    setIsCapturing(true);

    // Wait for render
    await new Promise(resolve => setTimeout(resolve, 150));

    try {
      if (appRef.current) {
        const canvas = await html2canvas(appRef.current, {
          backgroundColor: '#050510',
          scale: 2,
          useCORS: true,
          logging: false,
        });

        // Convert canvas to blob for sharing
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        const file = new File([blob], `my-2025-christmas-tree.png`, { type: 'image/png' });

        // Try Web Share API first (works in Instagram, etc.)
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: '나만의 2025 크리스마스 트리 🎄',
              text: '나만의 크리스마스 트리를 만들어봤어요!',
            });
          } catch (shareError) {
            // User cancelled or share failed, fall back to download
            if (shareError.name !== 'AbortError') {
              downloadImage(canvas);
            }
          }
        } else {
          // Fallback: direct download
          downloadImage(canvas);
        }
      }
    } catch (error) {
      console.error('Screenshot failed:', error);
      // Fallback to WebGL screenshot
      if (glRef.current) {
        const dataUrl = glRef.current.domElement.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `my-2025-christmas-tree.png`;
        link.href = dataUrl;
        link.click();
      }
    }

    // Hide poster and show buttons after short delay
    setTimeout(() => setIsCapturing(false), 600);
  }, []);

  const downloadImage = (canvas) => {
    const link = document.createElement('a');
    link.download = `my-2025-christmas-tree.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleGlReady = (gl) => {
    glRef.current = gl;
  };

  return (
    <div className="app-container" ref={appRef}>
      {/* 3D Canvas */}
      {treeParams && (
        <div className="canvas-container">
          <TreeScene initialParams={treeParams} onGlReady={handleGlReady} />
        </div>
      )}

      {/* Quiz Overlay */}
      {step === 'quiz' && <QuizOverlay onComplete={handleQuizComplete} />}

      {/* Result UI */}
      {step === 'result' && (
        <>
          {/* Title when not capturing */}
          {!isCapturing && (
            <div className="title-overlay">
              <h1>✨ 나만의 2025 크리스마스 트리 ✨</h1>
              <p className="subtitle">터치 또는 드래그로 트리를 돌려보세요</p>
            </div>
          )}

          {/* Poster overlay for screenshot */}
          <PosterOverlay params={treeParams} visible={isCapturing} />

          {/* Tree description - shown when not capturing */}
          {!isCapturing && (
            <TreeDescription
              color={treeParams.color}
              density={treeParams.density}
              starBrightness={treeParams.starBrightness}
            />
          )}

          {/* Buttons - hidden during capture */}
          {!isCapturing && (
            <div className="button-container">
              <button className="screenshot-btn" onClick={handleScreenshot}>
                📷 저장하기
              </button>
              <button className="restart-btn" onClick={handleRestart}>
                다시 시작
              </button>
            </div>
          )}
        </>
      )}

      {/* Branding */}
      <span className="branding">codex.of.anyed</span>
    </div>
  );
}

export default App;
