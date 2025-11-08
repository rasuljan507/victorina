// --- ВАШ КОНФИГ FIREBASE (v9+ Модульный) ---
// Импортируем все, что нужно для ЧТЕНИЯ данных
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Ваш конфиг
const firebaseConfig = {
    apiKey: "AIzaSyBvuOY_EZ_PyABGvLU9_5LcthFPkkF6nhE",
    authDomain: "victorina-7ef9b.firebaseapp.com",
    projectId: "victorina-7ef9b",
    storageBucket: "victorina-7ef9b.firebasestorage.app",
    messagingSenderId: "881919211027",
    appId: "1:881919211027:web:c7417fdea935e9b9bc71e6"
};

// Инициализируем Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// --- КОНЕЦ БЛОКА FIREBASE ---


// --- ЛОГИКА ЗАГРУЗКИ РЕЗУЛЬТАТОВ (v9+ Модульный синтаксис) ---
document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.getElementById('results-body');
    const loading = document.getElementById('loading');
    const table = document.getElementById('results-table');

    try {
        // 1. Создаем запрос к Firebase
        const resultsQuery = query(
            collection(db, "results"),
            orderBy("score", "desc"),      // Сначала лучший счет
            orderBy("timeSeconds", "asc")  // Потом быстрейшее время
        );

        // 2. Выполняем запрос
        const querySnapshot = await getDocs(resultsQuery);

        // 3. Прячем загрузчик и показываем таблицу
        loading.style.display = 'none';
        table.style.display = 'table';

        if (querySnapshot.empty) {
            loading.textContent = "Результатов пока нет.";
            loading.style.display = 'block';
            table.style.display = 'none';
            return;
        }

        // 4. Строим таблицу
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            // Форматируем дату (она сохранилась как объект Timestamp)
            const date = data.timestamp ? new Date(data.timestamp.seconds * 1000).toLocaleString('ru-RU') : 'N/A';
            
            const row = `<tr>
                <td>${data.name}</td>
                <td>${data.age}</td>
                <td>${data.score}</td>
                <td>${data.timeFormatted}</td>
                <td>${date}</td>
            </tr>`;
            
            tableBody.innerHTML += row;
        });

    } catch (error) {
        console.error("Ошибка при загрузке результатов: ", error);
        loading.textContent = "Ошибка при загрузке. Проверьте консоль (F12) и правила безопасности Firebase.";
    }
});