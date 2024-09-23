// Web Audio API 컨텍스트 생성
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 주파수 (음) 매핑
const frequencies = {
    'A': 261.63,  // C4
    'W': 277.18,  // C#4
    'S': 293.66,  // D4
    'E': 311.13,  // D#4
    'D': 329.63,  // E4
    'F': 349.23,  // F4
    'T': 369.99,  // F#4
    'G': 392.00,  // G4
    'Y': 415.30,  // G#4
    'H': 440.00,  // A4
    'U': 466.16,  // A#4
    'J': 493.88,  // B4
    'K': 523.25,  // C5
    'O': 554.37,  // C#5
    'L': 587.33,  // D5
    'P': 622.25,  // D#5
    ';': 659.25   // E5
};

// 소리 재생 함수
function playSound(frequency, keyElement) {
    const oscillator = audioContext.createOscillator(); // 사운드를 생성하는 오실레이터
    const gainNode = audioContext.createGain(); // 볼륨 제어

    oscillator.type = 'sine'; // 기본 파형 'sine' (사인파)
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // 주파수 설정

    oscillator.connect(gainNode); // 오실레이터를 게인 노드에 연결
    gainNode.connect(audioContext.destination); // 게인 노드를 오디오 출력에 연결

    // 사운드 생성 후, 짧게 끊기는 효과 주기
    oscillator.start();
    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.3); // 0.3초 후 사라짐
    oscillator.stop(audioContext.currentTime + 0.3); // 0.3초 후 정지

    // 시각적 피드백: active 클래스
    keyElement.classList.add('active');
    oscillator.onended = () => {
        keyElement.classList.remove('active'); // 소리 종료 후 클래스 제거
    };
}



// 키 이벤트 리스너 추가
document.addEventListener('keydown', function(event) {
    const key = event.key.toUpperCase(); 
    if (frequencies[key]) {
        const keyElement = Array.from(pianoKeys).find(k => k.querySelector('span').textContent === key);
        playSound(frequencies[key], keyElement);  
    }
});

// 마우스 클릭 이벤트 추가
const pianoKeys = document.querySelectorAll('.piano-keys .key');
pianoKeys.forEach(key => {
  key.addEventListener('click', () => {
    const note = key.querySelector('span').textContent.toUpperCase();
    if (frequencies[note]) {
      playSound(frequencies[note], key);
    }
  });
});