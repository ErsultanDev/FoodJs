window.addEventListener("DOMContentLoaded", function () {
  // Tabs

  let tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", function (event) {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // Timer

  const deadline = "2022-06-11";

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  // Modal

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") === "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 300000);
  // Изменил значение, чтобы не отвлекало

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);

  // Используем классы для создание карточек меню

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
      this.parent.append(element);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    14,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню “Премиум”",
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    21,
    ".menu .container"
  ).render();

  // Forms

  // ||||||||||| Реализация скрипта отправки данных на сервер |||||||||||
  // const forms = document.querySelectorAll("form");

  // const message = {
  //   // создали обьект уведомление клиента
  //   loading: "Загрузка...",
  //   succes: "Успешно отправлено!",
  //   failure: "Что-то пошло не так",
  // };

  // forms.forEach((item) => {
  //   // достали все form и вызваем функцию postData в аргумент передали все form
  //   postData(item);
  // });

  // function postData(form) {
  //   // создали функцию
  //   form.addEventListener("submit", (e) => {
  //     // навесили обработчик событий
  //     e.preventDefault(); // убираем по умолчание, без перезагрузки страницы

  //     const statusMessage = document.createElement("div"); // создаем div
  //     statusMessage.classList.add("status"); // навесили класс status
  //     statusMessage.textContent = message.loading; // внутри div поставили текст из обьекта (ключ)
  //     form.append(statusMessage); // поставили div внутрь form

  //     const request = new XMLHttpRequest(); // создаем новый обьект
  //     request.open("POST", "server.php"); // request.open он обьязателен чтобы настроить нужные данные // открываем запрос 1. Какой запрос "POST" 2. URL куда путь

  //     request.setRequestHeader("Content-type", "application/json"); // json формат отправки на сервер
  //     // request.setRequestHeader("Content-type", "multipart/form-data"); // говорим серверу что приходит || какой тип отправки запроса

  //     const formData = new FormData(form); // new FormData конструктор формируеть ключ значение //  FormData внутрь нашу форму

  //     const object = {}; // создали Обьект
  //     formData.forEach(function (value, key) {
  //       // callBack function || передаем в аргумент value, key
  //       object[key] = value; // в пустой обьект положили аргумент key: value
  //     });

  //     const json = JSON.stringify(object); // object конвертировали в строку

  //     request.send(json); // отправили FormData

  //     request.addEventListener("load", () => {
  //       // на запрос навесили обработчик load отправка
  //       if (request.status === 200) {
  //         // если запрос успешно отправлен
  //         statusMessage.textContent = message.succes; // выводим в div из обьекта message собщение succes
  //         form.reset(); // очищаем form input
  //         setTimeout(() => {
  //           statusMessage.remove(); // Удаляем div через 2 секунды
  //         }, 2000);
  //       } else {
  //         statusMessage.textContent = message.failure; // выводим в div из обьекта message собщение failure
  //       }
  //     });
  //   });
  // }

  // // ||||||||||| Красивое обовощение пользователя |||||||||||

  // const forms = document.querySelectorAll("form");

  // const message = {
  //   // создали обьект уведомление клиента
  //   loading: "img/form/spinner.svg",
  //   succes: "Успешно отправлено!",
  //   failure: "Что-то пошло не так",
  // };

  // forms.forEach((item) => {
  //   // достали все form и вызваем функцию postData в аргумент передали все form
  //   postData(item);
  // });

  // function postData(form) {
  //   // создали функцию
  //   form.addEventListener("submit", (e) => {
  //     // навесили обработчик событий
  //     e.preventDefault(); // убираем по умолчание, без перезагрузки страницы

  //     const statusMessage = document.createElement("img"); // создаем img
  //     statusMessage.src = message.loading; // img добавляем из обьекта message key  - loading spinner.svg
  //     statusMessage.style.cssText = "display: block; margin: 0 auto;";
  //     form.insertAdjacentElement("afterend", statusMessage); // поставили img spinner.svg после form
  //     // form.append(statusMessage); // поставили img spinner.svg внутрь form

  //     const request = new XMLHttpRequest(); // создаем новый обьект
  //     request.open("POST", "server.php"); // request.open он обьязателен чтобы настроить нужные данные // открываем запрос 1. Какой запрос "POST" 2. URL куда путь

  //     request.setRequestHeader("Content-type", "application/json"); // json формат отправки на сервер
  //     // request.setRequestHeader("Content-type", "multipart/form-data"); // говорим серверу что приходит || какой тип отправки запроса

  //     const formData = new FormData(form); // new FormData конструктор формируеть ключ значение //  FormData внутрь нашу форму

  //     const object = {}; // создали Обьект
  //     formData.forEach(function (value, key) {
  //       // callBack function || передаем в аргумент value, key
  //       object[key] = value; // в пустой обьект положили аргумент key: value
  //     });

  //     const json = JSON.stringify(object); // object конвертировали в строку

  //     request.send(json); // отправили FormData

  //     request.addEventListener("load", () => {
  //       // на запрос навесили обработчик load отправка
  //       if (request.status === 200) {
  //         // если запрос успешно отправлен
  //         showThanksModal(message.succes); // вызоваем функ, передаем в аргумент из обьекта собщение в верстку
  //         form.reset(); // очищаем form input
  //         statusMessage.remove(); // Удаляем div
  //       } else {
  //         showThanksModal(message.failure); // вызоваем функ, передаем в аргумент из обьекта собщение в верстку
  //       }
  //     });
  //   });
  // }

  // function showThanksModal(message) {
  //   const prevModalDialog = document.querySelector(".modal__dialog"); // достали модальное окно

  //   prevModalDialog.classList.add("hide"); // добавили на модальное окно класс hide
  //   openModal(); // вызволи функция openModal()

  //   const thanksModal = document.createElement("div");
  //   thanksModal.classList.add(".modal__dialog");
  //   thanksModal.innerHTML = ` // внутрь div добавили верстку и агрумент message из обьекта
  //   <div class="modal__content">
  //     <div class="modal__close" data-close>x</div>
  //     <div class="modal__title">${message}</div>
  //   </div>
  //   `;

  //   document.querySelector(".modal").append(thanksModal); // получили обвертку модал и положили внутрь div c версткой с собщением обьекта
  //   setTimeout(() => {
  //     thanksModal.remove(); // удаляем div с обьектом собщений через 4 секунды
  //     prevModalDialog.classList.add("show");
  //     prevModalDialog.classList.remove("hide");
  //     closeModal(); // вызволи функцию closeModal()
  //   }, 4000);
  // }

  // console.log("Запрос данных...");

  // const req = new Promise((resolve, reject) => {
  //   // Promise обещание
  //   // если внутри все правильно завершилось то выполняется resolve а если ошибка то reject
  //   setTimeout(() => {
  //     console.log("Подготовка данных...");

  //     const product = {
  //       name: "TV",
  //       price: 2000,
  //     };

  //     resolve(product);
  //   }, 2000);
  // }); // создали перменную и положили внутрь с конструктором Promise

  // req
  //   .then((product) => {
  //     // then это медот выполняется когда resolve тоесть успешно

  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         // если будет resolve выполниться вот этот timeout
  //         product.status = "order";
  //         resolve(product);
  //       }, 2000);
  //     });
  //   })
  //   .then((data) => {
  //     data.modify = true;
  //     return data;
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch(() => {
  //     // catch выполняется при reject тоесть если будет ошибка
  //     console.log("Error");
  //   })
  //   .finally(() => {
  //     // input.value = '';
  //     // product.reset(); || modal
  //   });

  // const test = (time) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => resolve(), time);
  //   });
  // };

  // // test(1000).then(()=> console.log('1000ms'))
  // // test(2000).then(()=> console.log('2000ms'))

  // Promise.all([test(1000), test(2000)]).then(() => { // выводится последний
  //   console.log("All");
  // });

  // Promise.race([test(1000), test(2000)]).then(() => { // выводится правильный если 1 правильны то выоводиться
  //   console.log("All");

  // ||||||||||| Fetch API |||||||||||

  const forms = document.querySelectorAll("form");

  const message = {
    // создали обьект уведомление клиента
    loading: "img/form/spinner.svg",
    succes: "Успешно отправлено!",
    failure: "Что-то пошло не так",
  };

  forms.forEach((item) => {
    // достали все form и вызваем функцию postData в аргумент передали все form
    postData(item);
  });

  function postData(form) {
    // создали функцию
    form.addEventListener("submit", (e) => {
      // навесили обработчик событий
      e.preventDefault(); // убираем по умолчание, без перезагрузки страницы

      const statusMessage = document.createElement("img"); // создаем img
      statusMessage.src = message.loading; // img добавляем из обьекта message key  - loading spinner.svg
      statusMessage.style.cssText = "display: block; margin: 0 auto;";
      form.insertAdjacentElement("afterend", statusMessage); // поставили img spinner.svg после form // new FormData конструктор формируеть ключ значение //  FormData внутрь нашу форму
      // form.append(statusMessage); // поставили img spinner.svg внутрь form

      // const request = new XMLHttpRequest(); // создаем новый обьект
      // request.open("POST", "server.php"); // request.open он обьязателен чтобы настроить нужные данные // открываем запрос 1. Какой запрос "POST" 2. URL куда путь

      // request.setRequestHeader("Content-type", "application/json"); // json формат отправки на сервер
      // request.setRequestHeader("Content-type", "multipart/form-data"); // говорим серверу что приходит || какой тип отправки запроса
      const formData = new FormData(form);

      const object = {}; // создали Обьект
      formData.forEach(function (value, key) {
        // callBack function || передаем в аргумент value, key
        object[key] = value; // в пустой обьект положили аргумент key: value
      });

      // request.send(json); // отправили FormData

      fetch("server.php", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(object),
      })
        .then((data) => data.text())
        .then((data) => {
          showThanksModal(message.succes); // вызоваем функ, передаем в аргумент из обьекта собщение в верстку
          statusMessage.remove(); // Удаляем div
        })
        .catch(() => {
          showThanksModal(message.failure); // вызоваем функ, передаем в аргумент из обьекта собщение в верстку
        })
        .finally(() => {
          form.reset(); // очищаем form input
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog"); // достали модальное окно

    prevModalDialog.classList.add("hide"); // добавили на модальное окно класс hide
    openModal(); // вызволи функция openModal()

    const thanksModal = document.createElement("div");
    thanksModal.classList.add(".modal__dialog");
    thanksModal.innerHTML = ` // внутрь div добавили верстку и агрумент message из обьекта
    <div class="modal__content">
      <div class="modal__close" data-close>x</div>
      <div class="modal__title">${message}</div>
    </div>
    `;

    document.querySelector(".modal").append(thanksModal); // получили обвертку модал и положили внутрь div c версткой с собщением обьекта
    setTimeout(() => {
      thanksModal.remove(); // удаляем div с обьектом собщений через 4 секунды
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal(); // вызволи функцию closeModal()
    }, 4000);
  }
});




