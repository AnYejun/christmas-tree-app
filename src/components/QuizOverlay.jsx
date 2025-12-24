import { useState } from 'react';
import './QuizOverlay.css';

const questions = [
  {
    id: 1,
    emoji: '🎄',
    question: '크리스마스 이브에 가장 하고 싶은 것은?',
    param: 'color',
    options: [
      { text: '따뜻한 벽난로 앞에서 핫초코 마시기', emoji: '🔥', value: 30 },
      { text: '친구들과 파티하기', emoji: '🎉', value: 280 },
      { text: '눈 내리는 거리 산책하기', emoji: '🌨️', value: 200 },
      { text: '집에서 영화 마라톤하기', emoji: '🎬', value: 120 },
    ],
  },
  {
    id: 2,
    emoji: '🎵',
    question: '지금 듣고 싶은 크리스마스 음악은?',
    param: 'speed',
    options: [
      { text: 'Last Christmas 같은 팝송', emoji: '🎤', value: 1.2 },
      { text: 'All I Want for Christmas Is You', emoji: '💃', value: 1.8 },
      { text: 'Silent Night 같은 캐롤', emoji: '🕯️', value: 0.4 },
      { text: 'Jingle Bell Rock!', emoji: '🎸', value: 1.5 },
    ],
  },
  {
    id: 3,
    emoji: '🎁',
    question: '선물을 받는다면 어떤 게 좋을까?',
    param: 'radius',
    options: [
      { text: '특별한 의미가 담긴 작은 선물', emoji: '💝', value: 1.2 },
      { text: '실용적인 전자기기', emoji: '📱', value: 2.0 },
      { text: '직접 만든 수제 선물', emoji: '🧶', value: 1.5 },
      { text: '깜짝 놀랄 만한 큰 선물', emoji: '🚗', value: 2.8 },
    ],
  },
  {
    id: 4,
    emoji: '❄️',
    question: '이상적인 크리스마스 날씨는?',
    param: 'density',
    options: [
      { text: '펑펑 내리는 눈', emoji: '☃️', value: 2000 },
      { text: '살짝 내리는 눈', emoji: '🌨️', value: 1200 },
      { text: '맑고 차가운 날씨', emoji: '🌟', value: 800 },
      { text: '포근한 겨울비', emoji: '🌧️', value: 600 },
    ],
  },
  {
    id: 5,
    emoji: '🌟',
    question: '트리 장식 스타일 선호는?',
    param: 'starBrightness',
    options: [
      { text: '화려하고 반짝이는 스타일', emoji: '✨', value: 2.0 },
      { text: '고급스러운 골드 & 실버', emoji: '🥂', value: 1.5 },
      { text: '아기자기한 파스텔톤', emoji: '🎀', value: 1.0 },
      { text: '심플하고 미니멀한 스타일', emoji: '🤍', value: 0.6 },
    ],
  },
  {
    id: 6,
    emoji: '🍰',
    question: '크리스마스에 먹고 싶은 디저트는?',
    param: 'treeHeight',
    options: [
      { text: '클래식 크리스마스 케이크', emoji: '🎂', value: 5.0 },
      { text: '진저브레드 쿠키', emoji: '🍪', value: 3.5 },
      { text: '슈톨렌이나 파네토네', emoji: '🥖', value: 4.5 },
      { text: '따뜻한 애플파이', emoji: '🥧', value: 4.0 },
    ],
  },
];

export default function QuizOverlay({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (option) => {
    const question = questions[currentQuestion];
    const newAnswers = {
      ...answers,
      [question.param]: option.value,
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate final parameters
      const finalParams = {
        color: newAnswers.color || 120,
        speed: newAnswers.speed || 1.0,
        radius: newAnswers.radius || 1.8,
        density: newAnswers.density || 1000,
        starBrightness: newAnswers.starBrightness || 1.2,
        treeHeight: newAnswers.treeHeight || 4.5,
        starColor: Math.floor((newAnswers.color || 120) / 60) % 6,
        // Store answer texts for poster interpretation
        answerTexts: Object.keys(newAnswers),
      };
      onComplete(finalParams);
    }
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion) / questions.length) * 100;

  return (
    <div className="quiz-overlay">
      <div className="quiz-container">
        <div className="quiz-header">
          <span className="emoji">{question.emoji}</span>
          <h1>나만의 크리스마스 트리 만들기</h1>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="question-section" key={question.id}>
          <p className="question-number">
            {currentQuestion + 1} / {questions.length}
          </p>
          <h2 className="question-text">{question.question}</h2>

          <div className="options-grid">
            {question.options.map((option, index) => (
              <button
                key={index}
                className="option-btn"
                onClick={() => handleAnswer(option)}
              >
                <span className="option-emoji">{option.emoji}</span>
                <span>{option.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
