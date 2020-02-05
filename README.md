# ttk-order-widget V2.0.0
### Описание
Виджет для добавления на web страницах форм оформления заявки на подключение к сети ТТК.

[Demo](https://gate.myttk.ru/test/order_widget_2/)

### Подключение
#### Требования:
Jquery: 3.4.1 (на более ранних версиях тестирование не проводилось)

#### HTML
Подключить файлы Jquery и скрипт виджета
```html
<script src="jquery-3.4.1.min.js"></script>
<script src="order-widget_2.js"></script>
```

В DOM добавить элемент внутри которого будет размещаться форма заявки

```html
<div id="myDiv"></div>
```

#### Javascript
с помощью Jquery на DOM элементе вызвать функцию инициализации виджета
```javascript
$('#myDiv').ttkOrderWidget()
```

### Параметры виджета
Параметры передаются в виде объекта, при вызове функции инициализации виджета на DOM элементе
```javascript
$('#myDiv').ttkOrderWidget({
 clear: false,
 styles: false,
 ...
})
```

| Параметр      | Тип | Описание       | по умолчанию  |
| :--------|:-----:|:-------------|:-----|
| styles | {boolean} | Используются встроеные слили виджета. | true |
| clear | {boolean} | Удаляется содержимое блока при монтировании формы.| true |
| thankyouUrl | {string} | URL страницы благодарности (переход после успешной отправки заявки).| false |
| hideCity | {boolean} | Скрывает поле "город".| false |
| currentCity | {object} | Город по умолчанию.| false |
| coverage | {boolean} | Жесткая проверка техохвата. Блокирует заявки не попадающие под техохват.| true |
| collector | {boolean} | Активирует дополнительный агрегатор для сбора заявок не попадающих под техохват.| false |
| comment | {string} |Комментарий к заявке. | false |
| other | {object} | Обект дополнительных данных.| false |
| readCoockie | {boolean} | Автозаполнение полей из cookie. | true |
| writeCoockie | {boolean} | Запись содержимого полей в cookie (записывается при успешной проверке после клика по кнопке).| true |
| onComplite | {function} |функция выполняющаяся после успешной отправки заявки. | false |

#### Пример
```javascript
$('#myDiv').ttkOrderWidget({
 styles: true,
 clear: true,
 thankyouUrl: 'https://www.youtube.com/watch?v=LBsTaYM0bzc'
 hideCity: false,
 currentCity: {
  'INTERNAL_ID': "0000000005041083",
  'EXTERNAL_ID': "7100150000000001761652",
  'EXTERNAL_NAME': "Новосибирск",
 },
 coverage: true,
 collector: false,
 comment: 'content test',
 other: {
  client_id: '1419116600.1568354452',
  ip:'46.241.21.65',
  ip_city: 'Новосибирск',
 },
 readCoockie: true,
 writeCoockie: true,
 onComplite: function() {
  console.log('Order sended!')
 },
})
```

