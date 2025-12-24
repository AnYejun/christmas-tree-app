import { forwardRef } from 'react';
import './PosterOverlay.css';

// Tree personality interpretations based on quiz results
const getTreePersonality = (params) => {
    const { color, speed, density, starBrightness } = params;

    let personality = '';
    let title = '';

    // Based on color (activity preference)
    if (color < 100) {
        title = '따뜻한 마음의 트리';
        personality = '따뜻한 벽난로 앞에서 소중한 사람들과 조용한 시간을 보내고 싶은 당신';
    } else if (color < 200) {
        title = '영화같은 트리';
        personality = '아늑한 공간에서 나만의 시간을 즐기며 여유를 찾는 당신';
    } else if (color < 250) {
        title = '낭만의 트리';
        personality = '겨울 풍경 속에서 낭만을 찾고 싶어하는 감성적인 당신';
    } else {
        title = '축제의 트리';
        personality = '사람들과 함께 즐거운 에너지를 나누고 싶은 당신';
    }

    // Add decoration style description
    if (starBrightness > 1.5) {
        personality += '의 트리는 화려하게 빛나고 있어요 ✨';
    } else if (starBrightness > 1.0) {
        personality += '의 트리는 고급스럽게 빛나고 있어요 🌟';
    } else {
        personality += '의 트리는 은은하게 빛나고 있어요 💫';
    }

    // Snow/weather description
    if (density > 1500) {
        personality += '\n펑펑 내리는 눈과 함께하는 화이트 크리스마스!';
    } else if (density > 1000) {
        personality += '\n살랑살랑 내리는 눈이 분위기를 더해요.';
    }

    return { title, personality };
};

// Warm messages pool
const warmMessages = [
    '올 한 해도 수고 많았어요.\n행복한 연말 보내세요 🎄',
    '당신의 크리스마스가\n따뜻한 추억으로 가득하길 💝',
    '소중한 사람들과 함께\n행복한 시간 보내세요 ✨',
    '메리 크리스마스!\n새해에도 좋은 일만 가득하길 🌟',
    '따뜻한 연말 되세요.\n당신은 충분히 빛나고 있어요 💫',
];

const PosterOverlay = forwardRef(({ params, visible }, ref) => {
    if (!visible) return null;

    const { title, personality } = getTreePersonality(params);
    const message = warmMessages[Math.floor(params.color / 60) % warmMessages.length];

    return (
        <div ref={ref} className="poster-overlay">
            {/* Header decorations */}
            <div className="poster-deco-top">
                <span>❄️</span>
                <span>✨</span>
                <span>🎄</span>
                <span>✨</span>
                <span>❄️</span>
            </div>

            {/* Title */}
            <h2 className="poster-title">{title}</h2>

            {/* Tree interpretation */}
            <p className="poster-interpretation">{personality}</p>

            {/* Warm message */}
            <div className="poster-message">
                <p>{message}</p>
            </div>

            {/* Bottom decorations */}
            <div className="poster-deco-bottom">
                <span>🎁</span>
                <span>⭐</span>
                <span>🔔</span>
                <span>⭐</span>
                <span>🎁</span>
            </div>

            {/* Year */}
            <p className="poster-year">2025 Christmas</p>
        </div>
    );
});

PosterOverlay.displayName = 'PosterOverlay';

export default PosterOverlay;
