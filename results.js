// --- ВАШ КОНФИГ FIREBASE (v9+ Модульный) ---
// Импортируем только то, что нужно
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
// ! ДОБАВИЛ 'deleteDoc', 'writeBatch'
import { getFirestore, collection, query, orderBy, getDocs, deleteDoc, writeBatch } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Ваш конфиг
const firebaseConfig = {
    apiKey: "AIzaSyBvuOY_EZ_PyABGvLU9_5LcthFPkkF6nhE",
    authDomain: "victorina-7ef9b.firebaseapp.com",
    projectId: "victorina-7ef9b",
    storageBucket: "victorina-7ef9b.firebasestorage.app",
    messagingSenderId: "881919211027",
    appId: "1:881919211027:web:c7417fdea935e9b9bc71e6"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- КОНЕЦ КОНФИГА FIREBASE ---


// 3. Загрузка данных
document.addEventListener('DOMContentLoaded', () => {
    loadResults(); // ! Вынес загрузку в отдельную функцию

    // ! НОВЫЙ ОБРАБОТЧИК КНОПКИ
    const clearButton = document.getElementById('clear-data-btn');
    clearButton.addEventListener('click', clearAllData);
});


// ! НОВАЯ ФУНКЦИЯ ЗАГРУЗКИ
async function loadResults() {
    const tableBody = document.getElementById('results-body');
    const loading = document.getElementById('loading');
    
    // Очищаем таблицу перед загрузкой
    tableBody.innerHTML = '';
    loading.textContent = "Загрузка результатов...";
    loading.style.display = 'block';

    try {
        // Создаем запрос (q)
        // Он сортирует по 'score' (по убыванию), а затем по 'timeSeconds' (по возрастанию)
        // Это требует КОМПОЗИТНОГО ИНДЕКСА в Firebase (который вы уже создали)
        const resultsRef = collection(db, "results");
        const q = query(resultsRef, 
            orderBy("score", "desc"), 
            orderBy("timeSeconds", "asc")
        );

        // Выполняем запрос
        const querySnapshot = await getDocs(q);

        loading.style.display = 'none'; // Скрываем "Загрузка..."
        
        if (querySnapshot.empty) {
            loading.textContent = "Результатов пока нет.";
            loading.style.display = 'block';
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            // Форматируем дату
            const date = data.timestamp ? new Date(data.timestamp.seconds * 1000).toLocaleString('ru-RU') : 'N/A';
            
            // ! ОБНОВЛЕННАЯ СТРОКА ТАБЛИЦЫ
            const row = `<tr>
                <td>${data.name}</td>
                <td>${data.age}</td>
                <td>${data.phone || '---'}</td>
                <td>${data.address || '---'}</td>
                <td>${data.score}</td>
                <td>${data.timeFormatted}</td>
                <td>${date}</td>
            </tr>`;
            
            tableBody.innerHTML += row;
        });

    } catch (error) {
        console.error("Ошибка при загрузке результатов: ", error);
        loading.textContent = "Ошибка при загрузке. Проверьте консоль (F12) и правила Firebase.";
        
        // Показываем ошибку про индекс, если она есть
        if (error.code === 'failed-precondition') {
             loading.innerHTML = `<b>Ошибка:</b> Отсутствует индекс Firebase.
             <br>Перейдите в консоль Firebase -> Firestore -> Индексы и создайте его.
             <br><small>${error.message}</small>`;
        }
    }
}


// ! НОВАЯ ФУНКЦИЯ УДАЛЕНИЯ
async function clearAllData() {
    // ПЕРВАЯ ПРОВЕРКА
    if (!confirm("ВЫ УВЕРЕНЫ?\n\nЭто действие удалит ВСЕ результаты викторины. Отменить это будет НЕВОЗМОЖНО.")) {
        return;
    }

    // ВТОРАЯ ПРОВЕРКА
    if (!confirm("ПОСЛЕДНЕЕ ПРЕДУПРЕЖДЕНИЕ:\n\nТочно удалить все данные?")) {
        return;
    }

    const loading = document.getElementById('loading');
    loading.textContent = "Удаление данных...";
    loading.style.display = 'block';

    try {
        const resultsRef = collection(db, "results");
        const querySnapshot = await getDocs(resultsRef);
        
        if (querySnapshot.empty) {
            loading.textContent = "Данных для удаления нет.";
            return;
        }

        // Используем 'batch' (пакет) для удаления всех документов одним махом
        const batch = writeBatch(db);
        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref); // Добавляем удаление в "пакет"
        });

        await batch.commit(); // Отправляем "пакет" на выполнение

        loading.textContent = "Все данные успешно удалены.";
        console.log("Все результаты удалены.");
        
        // Перезагружаем список
        loadResults();

    } catch (error) {
        console.error("Ошибка при удалении данных: ", error);
        loading.textContent = "Ошибка при удалении. Проверьте правила Firebase (нужно 'delete').";
        alert("Ошибка при удалении. Убедитесь, что в правилах Firebase разрешено 'delete'.");
    }
}
