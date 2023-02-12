console.log(`Модуль 9. AJAX. 9.3. XHR Задание 3`);
/* 
Задание 5.

Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».

При клике на кнопку происходит следующее:
1) Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
2) Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;

3) Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
4) Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.

Пример. Если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
После получения данных вывести список картинок на экран.

6) Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).

Удачи!
*/
const dataObj = {};
const nameStorageKey = "displayImgKey";
const btnRequest = document.querySelector(".btn");
const btnClear = document.querySelector(".clear");
const resultNode = document.querySelector(".result");

let numberPage = document.querySelector("#numberPage");
let limit = document.querySelector("#limit");
let localData = localStorage.getItem(nameStorageKey);

numberPage.addEventListener("input", () => disabledButton(numberPage));
limit.addEventListener("input", () => disabledButton(limit));

if (localData) {
  const parseJSON = JSON.parse(localData);
  dataObj.numberPage = +parseJSON.numberPage;
  dataObj.limit = +parseJSON.limit;
  numberPage.value = dataObj.numberPage;
  limit.value = dataObj.limit;
  btnRequest.removeAttribute("disabled");
  const url = `https://picsum.photos/v2/list?page=${+dataObj.numberPage}&limit=${+dataObj.limit}`;
  useRequest(url);
} else {
  numberPage.value = "";
  limit.value = "";
  resultNode.innerHTML = "";
}

function disabledButton(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
  if (numberPage.value && limit.value) {
    btnRequest.removeAttribute("disabled");
  } else {
    btnRequest.setAttribute("disabled", "true");
  }
}

function checkInput(numberPage, limit) {
  let string = ``;
  let checkPage, checkLimit;
  function check(inputValue) {
    if (
      inputValue &&
      +inputValue > 0 &&
      +inputValue < 11 &&
      !isNaN(+inputValue)
    ) {
      return true;
    } else {
      return false;
    }
  }
  checkPage = check(numberPage.value);
  checkLimit = check(limit.value);

  if (checkPage && checkLimit) {
    return true;
  } else if (!checkPage && !checkLimit) {
    string += `Номер страницы и лимит `;
  } else if (!checkPage) {
    string += `Номер страницы ${numberPage.value} `;
  } else {
    string += `Лимит ${limit.value} `;
  }
  string += `вне диапазона от 1 до 10`;
  resultNode.innerHTML = string;
  return false;
}

function useRequest(url) {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let cards = "<h3>Ваша коллекция фотографий:</h3>";
      data.forEach((img) => {
        const cardBlock = `
      <div class="card">
        <img
          src="${img.download_url}"
          class="card-image"
          width="300"
        />
        <p>${img.author}</p>
      </div>
    `;
        cards = cards + cardBlock;
      });
      resultNode.innerHTML = cards;
      dataObj.numberPage = +numberPage.value;
      dataObj.limit = +limit.value;
      localStorage.setItem(nameStorageKey, JSON.stringify(dataObj));
    })
    .catch((error) => {
      console.log("error", error);
      resultNode.innerHTML = "Error";
    });
}

btnRequest.addEventListener("click", async () => {
  resultNode.innerHTML = "";
  if (checkInput(numberPage, limit)) {
    const url = `https://picsum.photos/v2/list?page=${+numberPage.value}&limit=${+limit.value}`;
    useRequest(url);
  }
});

btnClear.addEventListener("click", () => {
  if (localStorage.getItem(nameStorageKey)) {
    numberPage.value = "";
    limit.value = "";
    resultNode.innerHTML = "";
    localStorage.removeItem(nameStorageKey);
  }
});
