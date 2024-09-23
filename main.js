//오디오 컨텍스트 생성
const audioContext = new (window.AudioContext || window.webkitAudioContext)();


//Oscillator 생성
function playNote(frequency) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';  // 사인파 타입을 사용한 기본적인 음
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // 주파수 설정
    oscillator.connect(audioContext.destination);  // 소리를 출력 장치로 연결
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2); // 1초 후 소리 종료
}


//음계 매칭
const notes = {
    'C4': 261.63,
    'D4': 293.66,
    'E4': 329.63,
    'F4': 349.23,
    'G4': 392.00,
    'A4': 440.00,
    'B4': 493.88
};


//키 이벤트
document.addEventListener('keydown', function(event) {
    if (event.key === 'a') {
        playNote(notes['C4']);
    } else if (event.key === 's') {
        playNote(notes['D4']);
    }
});