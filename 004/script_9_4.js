console.log(`Модуль 9. AJAX. 9.3. XHR Задание 3`);
/* 
Задание 4

Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число.

При клике на кнопку происходит следующее:

1) Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
2) Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
Пример. Если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
3) После получения данных вывести ниже картинку на экран.

Подсказка
Получение данных из input:const value = document.querySelector('input').value;
*/
let width = document.querySelector(".width");
let height = document.querySelector(".height");
const btnRequest = document.querySelector(".btn");
const resultNode = document.querySelector(".result");
let url = `https://picsum.photos/`;

width.addEventListener("input", () => disabledButton(width));
height.addEventListener("input", () => disabledButton(height));

function disabledButton(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
  if (width.value && height.value) {
    btnRequest.removeAttribute("disabled");
  } else {
    btnRequest.setAttribute("disabled", "true");
  }
}

function checkInput(inputValue) {
  if (
    +inputValue.value > 99 &&
    +inputValue.value < 301 &&
    !isNaN(+inputValue.value)
  ) {
    return true;
  } else {
    const string = `Число ${inputValue.value} вне диапазона от 100 до 300`;
    resultNode.innerHTML = string;
    return false;
  }
}

function useRequest(url) {
  return fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(
          response.status +
            " " +
            response.statusText +
            ". Объект не найден или неверный url."
        );
      } else {
        let cards = "";
        const cardBlock = `
      <div class="card">
        <img
          src="${response.url}"
          class="card-image"          
        />      
      </div>
    `;
        cards = cards + cardBlock;
        resultNode.innerHTML = cards;
      }
    })
    .catch((error) => {
      console.log("error", error);
      resultNode.innerHTML = error;
    });
}

btnRequest.addEventListener("click", async () => {
  resultNode.innerHTML = "";
  if (checkInput(width) && checkInput(height)) {
    url += `${width.value}/${height.value}`;
    useRequest(url);
  }
});
