// --- ВАШ КОНФИГ FIREBASE (v9+ Модульный) ---
// Импортируем только то, что нужно
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Ваш конфиг (я вставил тот, что вы давали раньше)
const firebaseConfig = {
    apiKey: "AIzaSyBvuOY_EZ_PyABGvLU9_5LcthFPkkF6nhE",
    authDomain: "victorina-7ef9b.firebaseapp.com",
    projectId: "victorina-7ef9b",
    storageBucket: "victorina-7ef9b.firebasestorage.app",
    messagingSenderId: "881919211027",
    appId: "1:881919211027:web:c7417fdea935e9b9bc71e6"
    // measurementId вам не нужен
};

// Инициализируем Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

    // !!! ВНИМАНИЕ !!!
    // Укажите правильные ответы для каждого вопроса,
    // используя ключ ('a', 'b', 'c', 'd').
    const questions = [
        {
            question: "Самая крупная река Хакасии?",
            options: { a: "Абакан", b: "Чёрный Июс", c: "Белый Июс", d: "Енисей" },
            correct: "d" 
        },
        {
            question: "Какое название носит хакасская спортивная борьба?",
            options: { a: "курес", b: "хомыс", c: "хуреш", d: "кандык" },
            correct: "a" 
        },
        {
            question: "Как называется традиционная хакасская сметанная каша?",
            options: { a: "харчо", b: "потхы", c: "гурьевская каша", d: "талган" },
            correct: "b" 
        },
        {
            question: "Выдающийся исполнитель героических сказаний.",
            options: { a: "Котюшев", b: "Кадышев", c: "Коков", d: "Топанов" },
            correct: "b" // ПРОВЕРЬТЕ ЭТОТ ОТВЕТ
        },
        {
            question: "Традиционным видом верхней одежды хакасской женщины в прошлом была безрукавка, как она называется?",
            options: { a: "когенек", b: "сигедек", c: "мелей", d: "тон" },
            correct: "b" 
        },
        {
            question: "Какое животное изображено на гербе Хакасии?",
            options: { a: "медведь", b: "волк", c: "барс", d: "лось" },
            correct: "c" 
        },
        {
            question: "Что означает название «Абахай»?",
            options: { a: "имя девушки", b: "название причёски", c: "название реки", d: "название божества" },
            correct: "a" // ПРОВЕРЬТЕ ЭТОТ ОТВЕТ
        },
        {
            question: "Как называется самый большой курган в Хакасии?",
            options: { a: "Сахсар", b: "Большой салбыкский", c: "Кара-Курган", d: "Узун-оба" },
            correct: "b" 
        },
        {
            question: "Назовите персонажа героического эпоса – деву-воительницу.",
            options: { a: "Алтын-Арыг", b: "Джанай", c: "Алтын-Чюс", d: "Очен-матыр" },
            correct: "a" // ПРОВЕРЬТЕ ЭТОТ ОТВЕТ
        },
        {
            question: "Сколько районов в Хакасии?",
            options: { a: "6", b: "9", c: "8", d: "11" },
            correct: "c" // (8 районов)
        },
        {
            question: "Что означает название «Солбан»?",
            options: { a: "название хакасского блюда", b: "название населённого пункта", c: "название горной вершины", d: "утренняя звезда" },
            correct: "d" 
        },
        {
            question: "Когда Хакасия официально вошла в состав Российской империи?",
            options: { a: "в 1707 году", b: "в 1727 году", c: "в 1718 году", d: "в 1730 году" },
            correct: "b" 
        },
        {
            question: "Каково значение слова «хайджи»?",
            options: { a: "предводитель отряда", b: "мастер устного сказа", c: "правитель губернии", d: "сборщик – ясака" },
            correct: "b" 
        },
        {
            question: "Что означает слово «тахпах»?",
            options: { a: "стихи", b: "песни", c: "пьесы", d: "рассказы" },
            correct: "b" // (Это фольклорный жанр, короткая песня)
        },
        {
            question: "Каменное божество, олицетворяющее Умай.",
            options: { a: "Улуг-Хуртуях тас", b: "Узун-жуль", c: "Узун-оба", d: "Омай-тура" },
            correct: "a" 
        },
        {
            question: "Листочки какого дерева украшают герб Хакасии?",
            options: { a: "липа", b: "берёза", c: "осина", d: "тополь" },
            correct: "b" 
        },
        {
            question: "Когда празднуется День Республики Хакасия?",
            options: { a: "4 сентября", b: "3 июня", c: "3 июля", d: "20 октября" },
            correct: "c" 
        },
        {
            question: "Национальный инструмент, на котором играет хайджи?",
            options: { a: "бубен", b: "хомыс", c: "тимир-хомыс", d: "чатхан" },
            correct: "d" 
        },
        {
            question: "Самое большое озеро Хакасии?",
            options: { a: "Иткуль", b: "Белё", c: "Шира", d: "Баланкуль" },
            correct: "b" 
        },
        {
            question: "Кто такой алып?",
            options: { a: "богатырь", b: "крестьянин", c: "кочевник", d: "учёный" },
            correct: "a" 
        },
        {
            question: "Первая обнаруженная стоянка неандертальцев в Хакасии.",
            options: { a: "Бородинская пещера", b: "Туимский провал", c: "Кутень-Булук", d: "Грот Двуглазка" },
            correct: "d" 
        },
        {
            question: "Как называется традиционное жилище хакасов?",
            options: { a: "изба", b: "юрта", c: "чум", d: "кибитка" },
            correct: "b" 
        },
        {
            question: "Что такое пого?",
            options: { a: "женское нагрудное украшение", b: "амулет", c: "рукавицы", d: "перстень" },
            correct: "a" 
        },
        {
            question: "Самый большой по площади район Хакасии?",
            options: { a: "Орджоникидзевский", b: "Аскизский", c: "Боградский", d: "Таштыпский" },
            correct: "d" 
        },
        {
            question: "Что в переводе с хакасского обозначает «Аба»?",
            options: { a: "медведь", b: "лиса", c: "тигр", d: "заяц" },
            correct: "a" 
        },
        {
            question: "Сколько букв в хакасском алфавите?",
            options: { a: "31", b: "36", c: "33", d: "39" },
            correct: "d" 
        },
        {
            question: "Как называется праздник первого молока?",
            options: { a: "Ай Пазы", b: "Тун Пайрам", c: "Чыл Пазы", d: "Уртун Тойы" },
            correct: "b" 
        },
        {
            question: "Какой город является столицей Республики Хакасия?",
            options: { a: "Черногорск", b: "Абакан", c: "Саяногорск", d: "Абаза" },
            correct: "b" 
        },
        {
            question: "Священное дерево хакасов?",
            options: { a: "сосна", b: "кедр", c: "берёза", d: "осина" },
            correct: "c" 
        },
        {
            question: "Как называются древние рисунки на камне?",
            options: { a: "петроглифы", b: "иероглифы", c: "гравюры", d: "питекантропы" },
            correct: "a" 
        }
    ];

  document.addEventListener('DOMContentLoaded', () => {

    // Элементы DOM
    const screens = document.querySelectorAll('.screen');
    const startForm = document.getElementById('user-form');
    
    // Поля ввода
    const userNameInput = document.getElementById('user-name');
    const userAgeInput = document.getElementById('user-age');
    const userPhoneInput = document.getElementById('user-phone');   // ! НОВОЕ
    const userAddressInput = document.getElementById('user-address'); // ! НОВОЕ
    const consentCheckbox = document.getElementById('consent-checkbox'); // ! НОВАЯ ГАЛОЧКА

    // Элементы викторины
    const questionCounter = document.getElementById('question-counter');
    const timerDisplay = document.getElementById('timer');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const restartBtn = document.getElementById('restart-btn');
    
    // Элементы результатов
    const resultName = document.getElementById('result-name');
    const resultAge = document.getElementById('result-age');
    const resultScore = document.getElementById('result-score');
    const resultTime = document.getElementById('result-time');

    // Состояние викторины
    let currentQuestionIndex = 0;
    let score = 0;
    let shuffledQuestions = [];
    
    // Переменные для данных пользователя
    let userName = "";
    let userAge = "";
    let userPhone = "";   // ! НОВОЕ
    let userAddress = ""; // ! НОВОЕ

    let timerInterval;
    let secondsElapsed = 0;

    // Старт викторины
    startForm.addEventListener('submit', (e) => {
        e.preventDefault();
        userName = userNameInput.value;
        userAge = userAgeInput.value;
        
        // --- ! НОВОЕ ФОРМАТИРОВАНИЕ НОМЕРА ---
        let rawPhone = userPhoneInput.value.replace(/[\s\-()]/g, ''); // Убираем мусор (скобки, тире)
        
        if (rawPhone.startsWith('8')) {
            // Заменяем 8 (Россия) на +7
            userPhone = '+7' + rawPhone.substring(1);
        } else if (rawPhone.startsWith('+7')) {
            // Уже в правильном формате
            userPhone = rawPhone;
        } else {
            // Добавляем +7, если его нет (для номеров РФ/KZ)
            userPhone = '+7' + rawPhone;
        }
        // --- ! КОНЕЦ ФОРМАТИРОВАНИЯ ---

        userAddress = userAddressInput.value; // ! НОВОЕ
        const isConsentChecked = consentCheckbox.checked; // ! НОВАЯ ПРОВЕРКА
        
        // ! ОБНОВЛЕННАЯ ПРОВЕРКА
        if (userName && userAge && userPhone && userAddress && isConsentChecked) {
            startGame();
        } else if (!isConsentChecked) {
            // Можно будет сюда добавить кастомное сообщение,
            // но `required` в HTML и так должен остановить отправку.
            console.log("Нужно согласие на обработку данных");
        } else {
            // (Можно добавить сообщение об ошибке, но required и так не пропустит)
            console.log("Заполните все поля");
        }
    });

    // Перезапуск викторины
    restartBtn.addEventListener('click', () => {
        // Сбрасываем все значения
        currentQuestionIndex = 0;
        score = 0;
        secondsElapsed = 0;
        userName = "";
        userAge = "";
        userPhone = "";   // ! НОВОЕ
        userAddress = ""; // ! НОВОЕ
        consentCheckbox.checked = false; // ! СБРОС ГАЛОЧКИ

        // Очищаем поля
        userNameInput.value = "";
        userAgeInput.value = "";
        userPhoneInput.value = "";   // ! НОВОЕ
        userAddressInput.value = ""; // ! НОВОЕ

        clearInterval(timerInterval);
        
        // Показываем стартовый экран
        showScreen('start-screen');
    });

    function startGame() {
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
        score = 0;
        secondsElapsed = 0;
        
        showScreen('quiz-screen');
        startTimer();
        showQuestion();
    }

    function showScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    function startTimer() {
        timerDisplay.textContent = formatTime(secondsElapsed);
        timerInterval = setInterval(() => {
            secondsElapsed++;
            timerDisplay.textContent = formatTime(secondsElapsed);
        }, 1000);
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }

    function showQuestion() {
        optionsContainer.innerHTML = "";
        
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        
        questionText.textContent = currentQuestion.question;
        questionCounter.textContent = `Вопрос ${currentQuestionIndex + 1} / ${shuffledQuestions.length}`;
        
        Object.entries(currentQuestion.options).forEach(([key, value]) => {
            const button = document.createElement('button');
            button.classList.add('option');
            button.textContent = value;
            button.dataset.key = key;
            
            button.addEventListener('click', handleAnswerClick);
            optionsContainer.appendChild(button);
        });
    }

    function handleAnswerClick(e) {
        const selectedButton = e.target;
        const selectedAnswerKey = selectedButton.dataset.key;
        const correctAnswerKey = shuffledQuestions[currentQuestionIndex].correct;

        Array.from(optionsContainer.children).forEach(button => {
            button.disabled = true;
            if (button.dataset.key === correctAnswerKey) {
                button.classList.add('correct');
            }
        });

        if (selectedAnswerKey === correctAnswerKey) {
            score++;
        } else {
            selectedButton.classList.add('incorrect');
        }

        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < shuffledQuestions.length) {
                showQuestion();
            } else {
                showResults();
            }
        }, 1000);
    }

    async function showResults() {
        clearInterval(timerInterval);
        showScreen('results-screen');
        
        const finalTimeFormatted = formatTime(secondsElapsed);
        
        resultName.textContent = userName;
        resultAge.textContent = userAge;
        resultScore.textContent = `${score}`;
        resultTime.textContent = finalTimeFormatted;

        // --- ! ОБНОВЛЕННЫЙ БЛОК: ОТПРАВКА В FIREBASE ---
        try {
            const docRef = await addDoc(collection(db, "results"), {
                name: userName,
                age: parseInt(userAge),
                phone: userPhone,       // ! НОВОЕ
                address: userAddress,   // ! НОВОЕ
                score: score,
                timeSeconds: secondsElapsed,
                timeFormatted: finalTimeFormatted,
                timestamp: new Date()
            });
            console.log("Результат сохранен в Firebase с ID: ", docRef.id);
        } catch (e) {
            console.error("Ошибка при отправке результата в Firebase: ", e);
        }
        // --- КОНЕЦ ОБНОВЛЕННОГО БЛОКА ---
    }
});
