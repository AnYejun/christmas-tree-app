import './TreeDescription.css';

// Must match ParticleTree.jsx themes
const treeThemes = [
    { name: 'forest', desc: '클래식한 초록 트리', emoji: '🌲', detail: '전통적인 크리스마스의 따뜻함이 담긴' },
    { name: 'red', desc: '정열의 레드 트리', emoji: '❤️', detail: '열정과 사랑이 가득한' },
    { name: 'gold', desc: '화려한 골드 트리', emoji: '✨', detail: '럭셔리하고 화려한 빛이 나는' },
    { name: 'silver', desc: '우아한 실버 트리', emoji: '🤍', detail: '세련되고 고급스러운' },
    { name: 'white', desc: '순수한 화이트 트리', emoji: '🕊️', detail: '깨끗하고 순수한' },
    { name: 'champagne', desc: '고급스러운 샴페인 트리', emoji: '🥂', detail: '우아하고 품격있는' },
    { name: 'pink', desc: '사랑스러운 핑크 트리', emoji: '💕', detail: '달콤하고 로맨틱한' },
    { name: 'rosegold', desc: '로맨틱 로즈골드 트리', emoji: '🌹', detail: '따뜻하고 감성적인' },
    { name: 'lavender', desc: '몽환적인 라벤더 트리', emoji: '💜', detail: '신비롭고 평화로운' },
    { name: 'blue', desc: '차분한 블루 트리', emoji: '💙', detail: '고요하고 차분한' },
    { name: 'mint', desc: '상쾌한 민트 트리', emoji: '🌿', detail: '청량하고 상쾌한' },
    { name: 'aurora', desc: '신비로운 오로라 트리', emoji: '🌌', detail: '환상적이고 몽환적인' },
    { name: 'purple', desc: '신비한 퍼플 트리', emoji: '👑', detail: '고귀하고 신비로운' },
    { name: 'orange', desc: '따뜻한 오렌지 트리', emoji: '🧡', detail: '따스하고 활기찬' },
    { name: 'candycane', desc: '달콤한 캔디케인 트리', emoji: '🍭', detail: '달콤하고 사랑스러운' },
    { name: 'emerald', desc: '고귀한 에메랄드 트리', emoji: '💎', detail: '고귀하고 우아한' },
];

export default function TreeDescription({ color, density, starBrightness }) {
    const themeIndex = Math.floor(color / 20) % treeThemes.length;
    const theme = treeThemes[themeIndex];

    // Generate decoration description
    let decorDesc = '';
    if (starBrightness > 1.5) {
        decorDesc = '반짝이는 장식이 화려하게 빛나고';
    } else if (starBrightness > 1.0) {
        decorDesc = '은은한 장식이 고급스럽게 빛나고';
    } else {
        decorDesc = '심플한 장식이 우아하게 빛나고';
    }

    let snowDesc = '';
    if (density > 1500) {
        snowDesc = ' 펑펑 내리는 눈이 함께해요';
    } else if (density > 1000) {
        snowDesc = ' 살랑살랑 눈이 내리고 있어요';
    } else {
        snowDesc = ' 포근한 분위기를 자아내요';
    }

    return (
        <div className="tree-description">
            <div className="tree-type">
                <span className="tree-emoji">{theme.emoji}</span>
                <span className="tree-name">{theme.desc}</span>
            </div>
            <p className="tree-detail">
                {theme.detail} 트리에<br />
                {decorDesc}{snowDesc}
            </p>
        </div>
    );
}
