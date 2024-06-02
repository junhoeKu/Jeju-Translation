let voices = [];

function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    if (!voices.length) {
        setTimeout(loadVoices, 100);
    }
}

window.speechSynthesis.onvoiceschanged = function() {
    loadVoices();
};

loadVoices();

function setupOutputLanguage() {
    const inputLang = document.getElementById('sourceLanguage').value;
    const outputLang = document.getElementById('outputLanguage');
    
    if (inputLang === '표준') {
        outputLang.value = '제주';
    } else if (inputLang === '제주') {
        outputLang.value = '표준';
    }
}

async function translateText() {
    setupOutputLanguage(); // 호출하여 초기 설정

    let inputText = document.getElementById('inputText').value;
    const sourceLanguage = document.getElementById('sourceLanguage').value;
    const outputLanguage = document.getElementById('outputLanguage').value;

    // 엔터를 온점으로 변경
    inputText = inputText.replace(/\n/g, '. ');

    console.log('Input Text:', inputText);
    console.log('Source Language:', sourceLanguage);
    console.log('Output Language:', outputLanguage);

    try {
        const response = await fetch('http://143.198.93.184:5000/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: inputText, source_language: sourceLanguage })
        });

        const responseData = await response.json();
        console.log('Response Data:', responseData);

        if (responseData.translated_text) {
            const translated_text = responseData.translated_text.replace(/\.\s/g, '\n');
            document.getElementById('translationResult').innerHTML = translated_text;

            // 발음듣기 버튼 클릭 시 음성 재생
            const playButton = document.getElementById('playTranslatedSpeech');
            if (playButton) {
                playButton.onclick = () => {
                    playTextToSpeech('translationResult');
                };
            }
        } else {
            document.getElementById('translationResult').innerText = 'Translation error: ' + (responseData.error || 'Unknown error');
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('translationResult').innerText = 'Error: ' + error.message;
    }
}

function playTextToSpeech(elementId) {
    const text = document.getElementById(elementId).value;
    if (!text) {
        console.error('Text is empty');
        return;
    }

    // gTTS의 경우 서버에서 음성을 생성하여 클라이언트로 전달해야 합니다.
    fetch('http://143.198.93.184:5000/text-to-speech', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text, source_language: 'ko' })
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.play();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function copyText(elementId) {
    console.log('Copy Text:', document.getElementById(elementId).value);
    const text = document.getElementById(elementId).value;
    navigator.clipboard.writeText(text).then(() => {
        console.log('Text copied to clipboard');
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

function bookmarkText() {
    console.log('Bookmark Text');
    // Add functionality to bookmark the text if required
}

function shareText() {
    console.log('Share Text');
    // Add functionality to share the text if required
}
