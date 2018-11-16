// /**
//  * Что-то вроде объекта для работы с базой данных.
//  */
// let databaseObject = {};
// // Тут будут сгруппированы функции для работы с базой данных
// databaseObject.functions = {};
// // Тут будет храниться информация из базы данных
// databaseObject.data = {};
//
// // Функция открытия(если такая база данных уже есть)/создания(если такой базы данны ещё нет) базы данных
// databaseObject.functions.open = function () {
//     // Первый параметр - название БД, второй - версия, третий - начальный размер
//     databaseObject.data = openDatabase("StudentsTestDatabase", "1.0", "", 5 * 1024 * 1024);
// };
//
// // Функция создания и добавления к базе данных таблицы для хранения информации
// databaseObject.functions.createStudentsShawroomTable = function () {
//     databaseObject.data.transaction(function (tx) {
//         tx.executeSql("create table if not exists carShawroom(" +
//             "cs_id integer primary key autoincrement," +
//             "cs_first_name varchar(20)," +
//             "cs_second_name varchar(20)," +
//             "cs_address varchar(20)," +
//             "cs_class varchar(20)," +
//             "cs_is_olympic_player varchar(20)," +
//             "cs_otherInfo varchar(40)" +
//             ")", [],
//             function () {
//                 //alert("Table was successfully created !");
//                 console.log("Table was successfully created !");
//             },
//
//             function () {
//                 //alert("Operation failed !");
//                 console.log("Operation failed !");
//             });
//     });
// };
//
// // !!!!!!!!!!!!!!!НЕ ИСПОЛЬЗУЕТСЯ!!!!!!!!!!!!!!!
// // Функция добавления записи в таблицу carShawroom (функциональный подход)
// databaseObject.functions.addEntry = function (carMark, carModel, dateOfIssue, carType, producersAddress) {
//     databaseObject.data.transaction(function (tx) {
//         tx.executeSql(`insert into
//                        carShawroom2(cs_mark, cs_model, cs_dateOfIssue, cs_type, cs_address)
//                        values ('${carMark}', '${carModel}', '${dateOfIssue}', '${carType}', '${producersAddress}')`, [],
//             function () {
//                 //alert("Data successfully inserted !");
//                 console.log("Data successfully inserted !");
//             },
//             function () {
//                 //alert("Data inserting failed !");
//                 console.log("Data inserting failed !");
//             });
//     });
// };
//
// // Функция добавления записи в таблицу carShawroom (объектный подход)
// databaseObject.functions.addObjectEntry = function (carEntry) {
//     // Нужно выполнить следующее: пройтись по всем свойствам внутри otherInfo и сформировать строку типа <"'Ключ-1':'Значение-1'">...<"'Ключ-n':'Значение-n'">
//     let otherInfo = "";
//     for (let key in carEntry.getOtherInfo()) {
//         otherInfo += key + ":" + carEntry.getOtherInfo()[key] + "@";
//     }
//
//     // Выполняем вставку информации в объекте carEntry в базу данных
//     databaseObject.data.transaction(function (tx) {
//         tx.executeSql(`insert into
//                        carShawroom(cs_first_name, cs_second_name, cs_address, cs_class, cs_is_olympic_player)
//                        values (
//                        '${carEntry.getFirstName()}',
//                        '${carEntry.getSecondName()}',
//                        '${carEntry.getAddress()}',
//                        '${carEntry.getClassNum()}',
//                        '${carEntry.getIsOlympicPlayer()}'
//                        )`, [],
//             function () {
//                 //alert("Data successfully inserted !");
//                 console.log("Data successfully inserted !");
//             },
//             function () {
//                 //alert("Data inserting failed !");
//                 console.log("Data inserting failed !");
//             });
//     });
// };
//
// // Функция получения информации из таблицы carShawroom на основе запроса selectQuery
// databaseObject.functions.executeSelectQuery = function (selectQuery, callback) {
//     let resultArray = [];
//     databaseObject.data.transaction(function (tx) {
//             tx.executeSql(selectQuery, [],
//                 function (transaction, resultSet) {
//                     console.log("Selection successful !");
//                     for (let i = 0; i < resultSet.rows.length; i++) {
//                         resultArray[i] = resultSet.rows.item(i);
//                     }
//                     callback(resultArray);
//                 },
//                 function () {
//                     console.log("Selection failed !");
//                 });
//         }
//     );
// };
//
// // Функция удаления информации из таблицы carShawroom на основе запроса deleteQuery
// databaseObject.functions.executeDeleteQuery = function (removeQuery) {
//     databaseObject.data.transaction(function (tx) {
//         tx.executeSql(removeQuery, [],
//             function () {
//                 console.log("Remove successful !");
//             },
//             function () {
//                 console.log("Remove failed !");
//             });
//     });
// };
//
// // Функция для удаления всего живого в таблице carShawroom
// databaseObject.functions.removeAllData = function () {
//     databaseObject.data.transaction(function (tx) {
//         tx.executeSql("delete from carShawroom where cs_id > 0", [],
//             function () {
//                 console.log("Every entry removing successful !");
//             },
//             function () {
//                 console.log("Every entry removing failed !");
//             });
//     });
// };
//
// /**
//  * Класс для хранения информации.
//  * Содержит конструктор, сеттеры и геттеры для всех полей.
//  */
// class CarEntry {
//     constructor(firstName, secondName, address, classNum, olympicPlayer, otherInfo) {
//         this.setFirstName(firstName);
//         this.setSecondName(secondName);
//         this.setAddress(address);
//         this.setClassNum(classNum);
//         this.setIsOlympicPlayer(olympicPlayer);
//         this.setOtherInfo(otherInfo);
//     }
//
//     getFirstName() {
//         return this.firstName;
//     }
//
//     setFirstName(firstName) {
//         this.firstName = firstName;
//     }
//
//     getSecondName() {
//         return this.secondName;
//     }
//
//     setSecondName(secondName) {
//         this.secondName = secondName;
//     }
//
//     getAddress() {
//         return this.address;
//     }
//
//     setAddress(address) {
//         this.address = address;
//     }
//
//     getClassNum() {
//         return this.classNum;
//     }
//
//     setClassNum(classNum) {
//         this.classNum = classNum;
//     }
//
//     getIsOlympicPlayer() {
//         return this.olympicPlayer;
//     }
//
//     setIsOlympicPlayer(olympicPlayer) {
//         this.olympicPlayer = olympicPlayer;
//     }
//
//     getOtherInfo() {
//         return this.otherInfo;
//     }
//
//     setOtherInfo(otherInfo) {
//         this.otherInfo = otherInfo;
//     }
//
//     // Этот метод возвращает строку таблицы(<tr>), полями которой является содержимое полей класса.
//     // Используется при формировании таблицы.
//     getHTMLRow() {
//         let HTMLRow = ``;
//         HTMLRow += `<td>${this.getFirstName()}</td>`;
//         HTMLRow += `<td>${this.getSecondName()}</td>`;
//         HTMLRow += `<td>${this.getAddress()}</td>`;
//         HTMLRow += `<td>${this.getClassNum()}</td>`;
//         HTMLRow += `<td>${this.getIsOlympicPlayer()}</td>`;
//
//         // Получаем одну строку из свойств внутреннего объекта otherInfo
//         let otherInfo = ``;
//         for (let key in this.getOtherInfo()) {
//             //otherInfo +=  "[" + key + ":" + this.getOtherInfo()[key] + "]\n";
//             otherInfo += `[${key}:${this.getOtherInfo()[key]}]`;
//         }
//         HTMLRow += `<td>${otherInfo}</td>`;
//
//         return HTMLRow;
//     }
// }
//
// /**
//  * Контейнер для хранения информации.
//  */
// // Контейнер-посредник, между базой данных и страницей.
// let currentData = new Map();
//
// /**
//  * Функция, которая вызывается при загрузке страницы.
//  * Выполняет:
//  *  1) Создание базы данных CarsTestDatabase, если её ещё не существует, или открытие базы данных CarsTestDatabase,
//  *     если она уже есть;
//  *  2) Создание таблицы в базе данных CarsTestDatabase, если такой таблицы ещё нет;
//  *  3) Инициализацию списка с (чем ?) id записей;
//  */
// function onLoad() {
//     // Открываем/создаём базу данных CarsTestDatabase
//     databaseObject.functions.open();
//     // Создаём(если такой таблицы ещё нет) таблицу studentsShawroom
//     databaseObject.functions.createStudentsShawroomTable();
//
//     // Записываем элементы базы данных в контейнер
//     databaseObject.functions.executeSelectQuery("select * from carShawroom", function (resultArray) {
//         for (let i = 0; i < resultArray.length; i++) {
//             let carEntry = new CarEntry(
//                 resultArray[i]["cs_first_name"],
//                 resultArray[i]["cs_second_name"],
//                 resultArray[i]["cs_address"],
//                 resultArray[i]["cs_class"],
//                 resultArray[i]["cs_is_olympic_player"],
//                 {});
//             currentData.set(resultArray[i]["cs_id"], carEntry);
//
//             // Разбиваем содержимое столбца cs_otherInfo - строку - по символу '@'. В результате получаем массив.
//             // Каждый элемент этого массива - это пара ключ-значение для свойства внутреннего объекта класса CarEntry otherInfo.
//             let pairs = resultArray[i]["cs_otherInfo"].split("@");
//             if (pairs.length > 1) {
//                 for (let j = 0; j < pairs.length - 1; j++) {
//                     let keyValue = pairs[j].split(":");
//                     carEntry.getOtherInfo()[keyValue[0]] = keyValue[1];
//                 }
//             }
//         }
//
//         // Обновляем список с (чем ?) id.
//         reloadListContainer();
//     });
// }
//
// /**
//  * Функция, обрабатывающая нажатие на кнопку 'Add entry'.
//  * Алгоритм её работы:
//  *  1) Сохранение инпутов в переменные;
//  *  2) Отправка данных из инпутов в функцию проверки;
//  *  3) Если введённые данные корректны, записываем их в базу данных;
//  *     Если введённые данные некорректны, завершаем функцию.
//  */
// function onAddEntry() {
//     // Функциональный подход.
//     /*
//     // Получаем ище инпуты по id и записываем из в переменные
//     let carMark = document.getElementById("firstName-input");
//     let carModel = document.getElementById("secondName-input");
//     let address = document.getElementById("date-input");
//     let carType = document.getElementById("classNum-input");
//     let olympicPlayer = document.getElementById("address-input");
//
//     // Отправляем содержиое инпутов в функцию проверки
//     // Если хотя бы один инпут будет содержать недопустимую информацию, эта функция вернёт false
//     if (!validate(carMark.value, carModel.value, address.value, carType.value, olympicPlayer.value)) {
//         carMark.value = "test";
//         carModel.value = "test";
//         address.value = '1996-01-30';
//         carType.value = "test";
//         olympicPlayer.value = "test";
//     }
//
//     // Вызов функции добавления записи в таблицу
//     databaseObject.functions.addEntry(carMark.value, carModel.value, address.value, carType.value, olympicPlayer.value);
//
//     // Обновляем список
//     reloadList();
//
//     // Обновляем таблицу
//     fromDBToTable();
//     */
//
//     // Объектный подход.
//     // Создаём объект-запись для хранения/обработки информации, которую ввёл пользователь
//     let carEntry = new CarEntry(
//         document.getElementById("firstName-input").value,
//         document.getElementById("secondName-input").value,
//         document.getElementById("address-input").value,
//         document.getElementById("classNum-input").value,
//         document.getElementById("olympic-input").value,
//         {}
//     );
//
//     // Проверяем правильность заполнения формы
//     if (!validateObject(carEntry)) {
//         return;
//     }
//
//     // Добавляем запись-объект в таблицу базы данных напрямую.
//     // Подход, который бы использовал любой человек с нормальным восприятием реальности.
//     // Я его использовать не буду.
//     /*
//     databaseObject.functions.addObjectEntry(carEntry);
//     */
//
//     // Добавляем запись в контейнер-посредник между базой данных и страницей
//
//     // Получаем индекс для нового элемента контейнера
//     if (currentData.size === 0) {
//         currentData.set(1, carEntry);
//     } else {
//         let k;
//         for (let key of currentData.keys()) {
//             k = key;
//         }
//         currentData.set(Number(k) + 1, carEntry);
//     }
//     // Обновляем список
//     reloadListContainer();
//
//     // Обновляем таблицу, если она есть
//     // Решение кривоватое
//     if (document.getElementsByTagName("table").length === 2) {
//         fromContainerToTable();
//     }
// }
//
// /**
//  * Функция, обрабатывающая нажатие на кнопку 'Delete by id'.
//  * Алгорим её работы:
//  *  1) Записываем список в переменную;
//  *  2) Если был выбран какой-либо элемент, получаем его номер и на его основе формируем sql-запрос удаления из базы;
//  *     Если ничего выбрано не было, завершаем работу функции;
//  , *  3) Подаём в функцию execute deleteQuery() сформированный ранее sql-запрос удаления;
//  *  4) Обновляем список с (чем ?) id.
//  */
// function onDeleteById() {
//     // Записваем список в переменную
//     let selectList = document.getElementById("id-select-list");
//
//     if (selectList.selectedIndex === -1) {
//         console.log("Select the element you want to delete !");
//         return;
//     }
//
//     // Выполняем sql-скрипт удаления элемента с указанным (чем ?)id
//     // databaseObject.functions.executeDeleteQuery(`delete from carShawroom2 where cs_id = ${selectList.options[selectList.selectedIndex].text}`);
//
//     // Удаляем элемент с указанным (чем ?)id из контейнера
//     currentData.delete(Number(selectList.options[selectList.selectedIndex].text));
//
//     // Обновляем список
//     reloadListContainer();
//
//     // Обновляем таблицу, если она есть
//     // Решение кривоватое
//     if (document.getElementsByTagName("table").length === 2) {
//         fromContainerToTable();
//     }
// }
//
// /**
//  * Функция, обрабатывающая нажатие на кнопку 'Clear form'.
//  * Просто очищает форму, ничего интересного.
//  */
// function onClearForm() {
//     // Ищем элемент по id и указываем, что внутри него должна быть пустая строка
//     document.getElementById("firstName-input").value = "";
//     document.getElementById("secondName-input").value = "";
//     document.getElementById("date-input").value = "";
//     document.getElementById("classNum-input").value = "";
//     document.getElementById("address-input").value = "";
// }
//
// /**
//  * Функция, обрабатывающая нажатие на кнопку 'Show'.
//  * Свою основную задачу - запись информации из базы данных в таблицу - делегируем функции fromDBToTable().
//  */
// function onShowData() {
//     let showHide = document.getElementById("show-or-hide-data-button");
//     if (showHide.innerText === "SHOW") {
//         showHide.innerText = "HIDE";
//         fromContainerToTable();
//     } else {
//         showHide.innerText = "SHOW";
//
//         document.getElementById("table-area").innerHTML = "";
//     }
// }
//
// /**
//  * Функция, обрабатывающая нажатие на кнопку 'Get'.
//  * Алгоритм её работы:
//  *  1) Получаем значение из инпута поиска в переменную;
//  *  2) Если в этой переменной что-то есть, генерируем sql-запрос на основе её содержимого;
//  *     Если в этой переменной ничего нет, завершаем работу функции;
//  *  3) Подаём sql-запрос в функцию-метод executeSQLQuery();
//  *  4) Если выборка непустая, заполняем её данными таблицу;
//  *     Если выборка пустая, завершаем работу функции.
//  */
// function onGetByType() {
//     // Ниже код, который работает напрямую с базой данных.
//     // Из-за требования использовать контейнеры в задании, его я использовать не буду.
//     /*
//     // Получаем инпут поиска в переенную
//     let searchByTypeInput = document.getElementById("search-by-classNum-input");
//     if (searchByTypeInput.value.length === 0) {
//         return;
//     }
//     // Ужасное дублтрование существующего кода, хочется разбить себе ебало телефоном
//     databaseObject.functions.executeSelectQuery(`select * from carShawroom2 where cs_type='${searchByTypeInput.value}'`, function (resultArray) {
//         // Получаем таблицу с информацией в переменную
//         let databaseTable = document.getElementById("database-table");
//
//         // Очищаем тыблицу от предыдущей выборки
//         databaseTable.innerHTML = "";
//
//         // Добавляем заголовок в таблицу
//         databaseTable.innerHTML = "<tr id=\"table-header\">\n" +
//             "                       <td>id</td>\n" +
//             "                       <td>Mark</td>\n" +
//             "                       <td>Model</td>\n" +
//             "                       <td>Date of issue</td>\n" +
//             "                       <td>Type</td>\n" +
//             "                       <td>Producer's address</td>\n" +
//             "                      </tr>"
//         ;
//
//         // Делаем таблицу видимой
//         databaseTable.style.visibility = "visible";
//
//         // Записываем в таблицу информацию из базы данных (по строкам)
//         for (let i = 0; i < resultArray.length; i++) {
//             // Создаём пустую строку таблицы
//             let row = document.createElement("tr");
//             row.innerHTML = ``;
//
//             for (let key in resultArray[i]) {
//                 row.innerHTML += `<td>${resultArray[i][key]}</td>`;
//             }
//
//             // Добавляем заполненную строку в таблицу
//             databaseTable.appendChild(row);
//         }
//     });
//     */
//
//     // Ниже код, который работает с контейнером.
//
//     // Получаем значение из инпута для ввода типа автомобиля в переменную
//     // Если в ней ничего нет, завершаем работу функции
//     let searchByTypeInput = document.getElementById("search-by-olympic-input");
//     if (searchByTypeInput.value === "no") {
//         return;
//     }
//
//     // Получаем область, в которую будет добавлен список в переменную
//     let tableArea = document.getElementById("table-area");
//
//     // Решение бага с SHOW/HIDE
//     // Решение плохое, но меня это не останавливает
//     document.getElementById("show-or-hide-data-button").innerText = "SHOW";
//
//     // Очищаем область, в которую будет добавлен список
//     tableArea.innerHTML = "";
//
//     // Создаём html-блок-список
//     let ol = document.createElement("ol");
//     ol.innerHTML = ``;
//
//     for (let entry of currentData.values()) {
//         if (entry.getClassNum() === searchByTypeInput.value) {
//             ol.innerHTML += `<li>${entry.getIsOlympicPlayer()}</li>`;
//         }
//     }
//
//     if (ol.innerHTML.length !== 0) {
//         let div = document.createElement("div");
//
//         // Создаём html-блок-заголовок
//         let p = document.createElement("p");
//
//         p.innerText = `${searchByTypeInput.value}-cars can be found at:`;
//
//         // Очищаем содержимое этой области от <p>...</p> при помощи регулярных выражений
//         tableArea.innerHTML = tableArea.innerHTML.replace(/<p.*?<\/p>/, "");
//
//         // Очищаем содержимое этой области от списков при помощи регулярных выражений
//         tableArea.innerHTML = tableArea.innerHTML.replace(/<ol.*?<\/ol>/, "");
//
//         // Записываем заголовок в соответствующую область
//         div.appendChild(p);
//
//         // Записываем список в соответствующую область
//         div.appendChild(ol);
//
//         tableArea.appendChild(div);
//     } else {
//         let div = document.createElement("div");
//
//         let p = document.createElement("p");
//
//         p.innerText = `There are no info about ${searchByTypeInput.value}-studs !`;
//
//         div.appendChild(p);
//
//         tableArea.appendChild(div);
//     }
// }
//
// /**
//  * Функция, обрабатывающая нажатие на кнопку 'Hide list'
//  */
// function onHideList() {
//     // Получаем область, в которую будет добавлен список в переменную
//     let tableArea = document.getElementById("table-area");
//
//     // Очищаем содержимое этой области от списков
//     tableArea.innerHTML = tableArea.innerHTML.replace(/<div.*?<\/div>/, "");
//
// }
//
// /**
//  * Функция, обрабатывающая нажатие на кнопку 'Confirm'.
//  * Алгоритм её работы:
//  * 1) Удаляем все записи из таблицы базы данных;
//  * 2) Добавляем все записи из контейнера в таблицу базы данных.
//  */
// function onConfirm() {
//     // Удаляем всё живое в таблице базы данных
//     databaseObject.functions.removeAllData();
//
//     // Записываем данные из контейнера в базу данных
//     for (let entry of currentData.values()) {
//         databaseObject.functions.addObjectEntry(entry);
//     }
//
//     // Удаляем все записи в контейнере
//     currentData.clear();
//
//     // Записываем обновлённую информацию из базы данных в контейнер
//     databaseObject.functions.executeSelectQuery("select * from carShawroom", function (resultArray) {
//         for (let i = 0; i < resultArray.length; i++) {
//             let carEntry = new CarEntry(
//                 resultArray[i]["cs_mark"],
//                 resultArray[i]["cs_model"],
//                 resultArray[i]["cs_dateOfIssue"],
//                 resultArray[i]["cs_type"],
//                 resultArray[i]["cs_address"],
//                 {}
//             );
//             currentData.set(resultArray[i]["cs_id"], carEntry);
//
//             // Разбиваем содержимое столбца cs_otherInfo - строку - по символу '@'. В результате получаем массив.
//             // Каждый элемент этого массива - это пара ключ-значение для свойства внутреннего объекта класса CarEntry otherInfo.
//             let pairs = resultArray[i]["cs_otherInfo"].split("@");
//             if (pairs.length > 1) {
//                 for (let j = 0; j < pairs.length - 1; j++) {
//                     let keyValue = pairs[j].split(":");
//                     carEntry.getOtherInfo()[keyValue[0]] = keyValue[1];
//                 }
//             }
//         }
//
//         // Обновляем список с (чем ?)id
//         reloadListContainer();
//
//         // Обновляем таблицу, если она есть
//         // Решение кривоватое
//         if (document.getElementsByTagName("table").length === 2) {
//             fromContainerToTable();
//         }
//     });
// }
//
// /**
//  * Функция, обрабатывающая нажатие на кнопку 'Property++'.
//  */
// function onAddProperty() {
//     // Получаем значения инпутов для имени и значения нового свойства
//     let newPropertyName = document.getElementById("new-property-name-input");
//     let newPropertyValue = document.getElementById("new-property-value-input");
//
//     // Получаем индекс выбранного элемента в переменную
//     let selectedElementIndex = document.getElementById("id-select-list").selectedIndex;
//
//     // Проверяем, был ли выбран элемент для добавления свойства
//     if (selectedElementIndex === -1) {
//         console.log("Select the element you want add property to !");
//         return;
//     }
//
//     // Проверяем значения инпутов на пустоту
//     if (newPropertyName.value.length === 0 || newPropertyValue.value.length === 0) {
//         console.log("Check filling of property-inputs !");
//         return;
//     }
//
//     // Добавляем к указанному объекту указанное свойство с указанным значением
//     let objectToAdd = currentData.get(Number(document.getElementById("id-select-list").options[selectedElementIndex].text));
//     objectToAdd.getOtherInfo()[`${newPropertyName.value}`] = newPropertyValue.value;
//
//     // Обновляем таблицу, если она есть
//     // Решение кривоватое
//     if (document.getElementsByTagName("table").length === 2) {
//         fromContainerToTable();
//     }
//
//     alert(`New property:[${newPropertyName.value}] with value:[${newPropertyValue.value}] added !`);
// }
//
// /**
//  * !!!!!!!!!!!!!!!!НЕ ИСПОЛЬЗУЕТСЯ!!!!!!!!!!!!!!!!
//  * Функция проверки информации из инпутов. (Применяется при функциональном подходе).
//  * Проверяет содержимое инпутов на пустоту.
//  */
// function validate(carMark, carModel, dateOfIssue, carType, producersAddress) {
//     // Проверка поля 'Марка автомобиля' на пустоту
//     if ((carMark.length === 0) || false) {
//         console.log("Check the filling of the 'Car firstName' !");
//         return false;
//     }
//
//     // Проверка поля 'Модель автомобиля' на пустоту
//     if ((carModel.length === 0) || false) {
//         console.log("Check the filling of the 'Car secondName' !");
//         return false;
//     }
//
//     // Проверка поля 'Дата выпуска' на пустоту
//     if ((dateOfIssue.length === 0) || false) {
//         console.log("Check the filling of the 'Date of issue' !");
//         return false;
//     }
//
//     // Проверка поля 'Тип автомобиля' на пустоту
//     if ((carType.length === 0) || false) {
//         console.log("Check the filling of the 'Type' !");
//         return false;
//     }
//
//     // Проверка поля 'Адрес производителя' на пустоту
//     if ((producersAddress.length === 0) || false) {
//         console.log("Check the filling of the 'Producer's address' !");
//         return false;
//     }
//
//     return true;
// }
//
// /**
//  * Функция проверки информации в объекте-записи. (Применяется при объектном подходе).
//  * Проверяет содержимое полей объекта записи на пустоту.
//  * Проверяет ввод текстовых полей только на английские буквы и цифры.
//  */
// function validateObject(carEntry) {
//     // Проверка поля 'Марка автомобиля' на пустоту
//     if ((carEntry.getFirstName().length === 0) || !(/^[A-Za-z0-9]+$/).test(carEntry.getFirstName())) {
//         console.log("Check the filling of the 'Car firstName' !");
//         return false;
//     }
//
//     // Проверка поля 'Модель автомобиля' на пустоту
//     if ((carEntry.getSecondName().length === 0) || !(/^[A-Za-z0-9]+$/).test(carEntry.getSecondName())) {
//         console.log("Check the filling of the 'Car secondName' !");
//         return false;
//     }
//
//     // Проверка поля 'Дата выпуска' на пустоту
//     let date = new Date(carEntry.getAddress());
//     if ((carEntry.getAddress().length === 0) || (date.getFullYear() < 1900 || date.valueOf() > (new Date()).valueOf())) {
//         console.log("Check the filling of the 'Date of issue' !");
//         return false;
//     }
//
//     // Проверка поля 'Тип автомобиля' на пустоту
//     if ((carEntry.getClassNum().length === 0) || !(/^[A-Za-z0-9]+$/).test(carEntry.getClassNum())) {
//         console.log("Check the filling of the 'Type' !");
//         return false;
//     }
//
//     // Проверка поля 'Адрес производителя' на пустоту
//     if ((carEntry.getIsOlympicPlayer().length === 0) || !(/^[A-Za-z0-9]+$/).test(carEntry.getIsOlympicPlayer())) {
//         console.log("Check the filling of the 'Producer's address' !");
//         return false;
//     }
//
//     return true;
// }
//
// /**
//  * !!!!!!!!!!!!!!!!НЕ ИСПОЛЬЗУЕТСЯ!!!!!!!!!!!!!!!!
//  * Функция обновления информации в списке (чего ?) id.
//  * (Работает напрямую с базой данных)
//  * Вызыввается каждый раз при изменении информации в базе данных (удаление, вставка) и при начальной
//  * инициализации, чтобы информация в списке соответствовала информации в базе.
//  */
// function reloadList() {
//     // Получаем данные из базы в переменную
//     databaseObject.functions.executeSelectQuery("select * from carShawroom", function (resultArray) {
//         // Записываем список, который мы хотим проиницилизировать (чем ?)id, в переменную
//         let selectList = document.getElementById("id-select-list");
//
//         // Добавляем в список option'ы, содержащие (что ?)id
//         selectList.innerHTML = "";
//         for (let i = 0; i < resultArray.length; i++) {
//             selectList.innerHTML += `<option>${resultArray[i]['cs_id']}</option>`;
//         }
//     });
// }
//
// /**
//  * Функция обновления информации в списке (чего ?) id.
//  * (Работает со списком)
//  * Вызыввается каждый раз при изменении информации в базе данных (удаление, вставка) и при начальной
//  * инициализации, чтобы информация в списке соответствовала информации в базе.
//  */
// function reloadListContainer() {
//     // Записываем список, который мы хотим проиницилизировать (чем ?)id, в переменную
//     let selectList = document.getElementById("id-select-list");
//
//     // Добавляем в список option'ы, содержащие (что ?)id
//     selectList.innerHTML = "";
//     for (let id of currentData.keys()) {
//         selectList.innerHTML += `<option>${id}</option>`;
//     }
// }
//
// /**
//  * !!!!!!!!!!!!!!!!НЕ ИСПОЛЬЗУЕТСЯ!!!!!!!!!!!!!!!!
//  * Функция, выполняющая запись информации из базы данных в таблицу.
//  * Алгоритм её работы:
//  *  1) Получаем информацию из базы данных;
//  *  2) Делаем таблицу для записей видимой;
//  *  3) Если в выборке есть записи, добавляем строки, созданные на основе этих записей, в таблицу;
//  *     Если в выборке нет записей, делаем таблицу невидимой и завершаем работу фунции.
//  */
// function fromDBToTable() {
//     // Получаем информацию из базы данных в переменную
//     databaseObject.functions.executeSelectQuery("select * from carShawroom2", function (resultArray) {
//         // Получаем таблицу с информацией в переменную
//         let databaseTable = document.getElementById("database-table");
//
//         // Очищаем тыблицу от предыдущей выборки
//         databaseTable.innerHTML = "";
//
//         // Добавляем заголовок в таблицу
//         databaseTable.innerHTML = "<tr id=\"table-header\">\n" +
//             "<td>id</td>\n" +
//             "<td>First Name</td>\n" +
//             "<td>Second Name</td>\n" +
//             "<td>Address</td>\n" +
//             "<td>Class</td>\n" +
//             "<td>Olympic</td>\n" +
//             "<td>Other info</td>\n" +
//             "</tr>"
//         ;
//
//         // Делаем таблицу видимой
//         databaseTable.style.visibility = "visible";
//
//         // Записываем в таблицу информацию из базы данных (по строкам)
//         for (let i = 0; i < resultArray.length; i++) {
//             // Создаём пустую строку таблицы
//             let row = document.createElement("tr");
//             row.innerHTML = ``;
//
//             for (let key in resultArray[i]) {
//                 row.innerHTML += `<td>${resultArray[i][key]}</td>`;
//             }
//
//             // Добавляем заполненную строку в таблицу
//             databaseTable.appendChild(row);
//         }
//     });
// }
//
// /**
//  * Функция, выполняющая запись информации из контейнера в таблицу.
//  */
// function fromContainerToTable() {
//     // Получаем таблицу в переменную
//     let databaseTableArea = document.getElementById("table-area");
//
//     // Очищаем содержимое области от содержимого
//     databaseTableArea.innerHTML = "";
//
//     // Создаём таблицу
//     let databaseTable = document.createElement("table");
//
//     // Добавляем заголовок в таблицу
//     databaseTable.innerHTML = "<tr id=\"table-header\">\n" +
//         "<td>id</td>\n" +
//         "<td>First Name</td>\n" +
//         "<td>Second Name</td>\n" +
//         "<td>Address</td>\n" +
//         "<td>Class</td>\n" +
//         "<td>Olympic</td>\n" +
//         "<td>Other info</td>\n" +
//         "</tr>"
//     ;
//
//     // Делаем таблицу видимой
//     databaseTable.style.visibility = "visible";
//
//     for (let key of currentData.keys()) {
//         let row = document.createElement("tr");
//
//         row.innerHTML = ``;
//         row.innerHTML += `<td>${key}</td>`;
//         row.innerHTML += currentData.get(key).getHTMLRow();
//
//         // Записываем эту строку в соответствующий <td>
//         databaseTable.appendChild(row);
//     }
//
//     databaseTableArea.appendChild(databaseTable);
// }
