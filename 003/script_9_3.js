console.log(`Модуль 9. AJAX. 9.3. XHR Задание 3`);
/* 
Задание 3

Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.
Пример. Если пользователь ввёл 5, то запрос будет вида: https://picsum.photos/v2/list?limit=5.
После получения данных вывести ниже картинки на экран.

Подсказка
Получение данных из input: const value = document.querySelector('input').value;
*/
let input = document.querySelector("#input");
const btnRequest = document.querySelector(".btn");
const resultNode = document.querySelector(".result");
let url = `https://picsum.photos/v2/list/?limit=`;

input.addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
  if (this.value) {
    btnRequest.removeAttribute("disabled");
  } else {
    btnRequest.setAttribute("disabled", "true");
  }
});

function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log(`Ошибка! Статус ответа: ${xhr.status}: ${xhr.statusText}`);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };

  xhr.onerror = function () {
    console.log(`Ошибка! Статус ответа: ${xhr.status}: ${xhr.statusText}`);
  };

  xhr.send();
}

function displayResult(apiData) {
  let cards = "";

  apiData.forEach((item) => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
          width="300"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards += cardBlock;
  });

  resultNode.innerHTML = cards;
}

function checkInput(input) {
  if (+input > 0 && +input < 11 && !isNaN(+input)) {
    return true;
  } else {
    return false;
  }
}

btnRequest.addEventListener("click", () => {
  resultNode.innerHTML = ``;
  if (checkInput(input.value)) {
    url += input.value;
    useRequest(url, displayResult);
  } else {
    resultNode.innerHTML = `Число ${input.value} вне диапазона от 1 до 10`;
  }
});
