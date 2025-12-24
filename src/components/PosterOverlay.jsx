import { forwardRef } from 'react';
import './PosterOverlay.css';

// Tree themes - must match ParticleTree.jsx themes
const treeThemes = [
    { name: 'forest', title: '클래식한 초록 트리', emoji: '🌲' },
    { name: 'red', title: '정열의 레드 트리', emoji: '❤️' },
    { name: 'gold', title: '화려한 골드 트리', emoji: '✨' },
    { name: 'silver', title: '우아한 실버 트리', emoji: '🤍' },
    { name: 'white', title: '순수한 화이트 트리', emoji: '🕊️' },
    { name: 'champagne', title: '고급스러운 샴페인 트리', emoji: '🥂' },
    { name: 'pink', title: '사랑스러운 핑크 트리', emoji: '💕' },
    { name: 'rosegold', title: '로맨틱 로즈골드 트리', emoji: '🌹' },
    { name: 'lavender', title: '몽환적인 라벤더 트리', emoji: '💜' },
    { name: 'blue', title: '차분한 블루 트리', emoji: '💙' },
    { name: 'mint', title: '상쾌한 민트 트리', emoji: '🌿' },
    { name: 'aurora', title: '신비로운 오로라 트리', emoji: '🌌' },
    { name: 'purple', title: '신비한 퍼플 트리', emoji: '👑' },
    { name: 'orange', title: '따뜻한 오렌지 트리', emoji: '🧡' },
    { name: 'candycane', title: '달콤한 캔디케인 트리', emoji: '🍭' },
    { name: 'emerald', title: '고귀한 에메랄드 트리', emoji: '💎' },
];

// Tree personality interpretations based on quiz results
const getTreePersonality = (params) => {
    const { color, density, starBrightness } = params;

    // Get theme based on color (must match ParticleTree logic)
    const themeIndex = Math.floor(color / 20) % treeThemes.length;
    const theme = treeThemes[themeIndex];

    let title = `${theme.emoji} ${theme.title}`;
    let personality = '';

    // Add decoration style description
    if (starBrightness > 1.5) {
        personality = '화려하게 빛나는 장식이 돋보이는 당신의 트리 ✨';
    } else if (starBrightness > 1.0) {
        personality = '고급스럽고 우아한 빛이 감도는 당신의 트리 🌟';
    } else {
        personality = '은은하고 따뜻한 빛이 감도는 당신의 트리 💫';
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
