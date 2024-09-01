export const mapInit = () => {
  const myMap = document.querySelector('#map');

  if (!myMap) return;

  ymaps.ready(function () {
    var myMap = new ymaps.Map(
        'map',
        {
          center: [55.751574, 37.573856],
          zoom: 9,
        },
        {
          searchControlProvider: 'yandex#search',
        }
      ),
      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
      );

    const myStores = document.querySelectorAll('[data-mark]');
    const myStoresWrapper = document.querySelector('[data-scroll]');

    function clearStores() {
      myStores.forEach((store) => {
        store.classList.remove('active');
      });
    }

    function activateStore(store) {
      clearStores();
      store.classList.add('active');

      const myScroll = store.offsetTop;
      myStoresWrapper.scrollTo(0, myScroll);
    }

    myStores.forEach((myStore) => {
      const myBalloon = `<div class='current-balloon-content'>${myStore.innerHTML}</div>`;
      const myHint = myStore.querySelector('.mark-title').innerText;
      const myCoordsAttr = myStore.getAttribute('data-cord').split(' ');
      const myId = myStore.getAttribute('data-mark');
      const myCoords = [+myCoordsAttr[0], +myCoordsAttr[1]];

      var placemark = new ymaps.Placemark(
        myCoords,
        {
          // Зададим содержимое основной части балуна.
          balloonContentBody: myBalloon,
          // Зададим содержимое всплывающей подсказки.
          hintContent: myHint,
        },
        {
          // Опции.
          // Необходимо указать данный тип макета.
          iconLayout: 'default#imageWithContent',
          // Своё изображение иконки метки.
          iconImageHref: 'images/mark.png',
          // Размеры метки.
          iconImageSize: [48, 48],
          // Смещение левого верхнего угла иконки относительно
          // её "ножки" (точки привязки).
          iconImageOffset: [-24, -24],
          // Смещение слоя с содержимым относительно слоя с картинкой.
          iconContentOffset: [15, 15],
          // Макет содержимого.
          iconContentLayout: MyIconContentLayout,
          markId: myId,
        }
      );

      // Добавим метку на карту.
      myMap.geoObjects.add(placemark);

      //активируем карточку при клике на метку
      placemark.events.add('click', function (e) {
        const myCardId = e.get('target').options._options.markId;
        const myCard = document.querySelector(`[data-mark='${myCardId}']`);
        activateStore(myCard);
      });

      myMap.events.add('click', function (e) {
        clearStores();
        placemark.balloon.close();
      });

      myStore.addEventListener('click', function () {
        if (this.classList.contains('active')) {
          placemark.balloon.close();
          this.classList.remove('active');
        } else {
          activateStore(this);
          placemark.balloon.open();
        }
      });
      myMap.events.add('balloonclose', function (e) {
        clearStores();
      });
    });
  });
};
