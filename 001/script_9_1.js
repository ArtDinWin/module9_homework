console.log(`Модуль 9. AJAX. 9.2. JSON vs XML. Задание 1`);
/* 
Задание 1.
Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.
JS-объект:
{
  list: [
    { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
    { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
  ]
}
*/

const xmlString = `<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;

function xmlToObj(xmlString) {
  const parser = new DOMParser();
  const jsObj = {};
  jsObj.list = [];
  const xmlDOM = parser.parseFromString(xmlString, "text/xml");
  const studentNodes = xmlDOM.querySelectorAll("student");

  if (studentNodes.length) {
    studentNodes.forEach((student) => {
      const studentObj = {};
      studentObj.name =
        String(student.querySelector("first").textContent) +
        " " +
        String(student.querySelector("second").textContent);
      studentObj.age = Number(student.querySelector("age").textContent);
      studentObj.prof = String(student.querySelector("prof").textContent);
      studentObj.lang = String(
        student.querySelector("name").getAttribute("lang")
      );
      jsObj.list.push(studentObj);
    });

    return jsObj;
  } else {
    return "При преобразовании XML в JS-объект произошла ошибка, проверьте введенные данные";
  }
}
console.log(xmlToObj(xmlString));
console.log(xmlToObj("error"));
