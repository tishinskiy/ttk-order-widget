# ttk-order-widget 2
### Описание 
Виджет для добавления на web страницах форм оформления заявки на подключение к сети ТТК.

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

```javascript
$('#myDiv').ttkOrderWidget()
```

### Параметры виджета
Параметры задаются при вызове виджета на DOM элементе
```javascript
$('#myDiv').ttkOrderWidget({
 clear: false,
 styles: false,
 ...
})
```

| Параметр      | Описание       | по умолчанию  |
| :------------- |:-------------| -----:|
| styles | Используются встроеные слили виджета | true |
| clear | Удаляется содержимое блока при монтировании формы| true |
| thankyouUrl | URL страницы благодарности (переход после успешной отправки заявки)| false |
| hideCity | Скрывает поле "город"| false |
| currentCity | Город по умолчанию { INTERNAL_ID, EXTERNAL_ID, EXTERNAL_NAME } | false |
| coverage | Жесткая проверка техохвата| true |
| collector | URL агрегатора заявок не прошедших проверку техохвата| false |
| comment |Комментарий | false |
| other | Обект дополнительных данных {<имя>: <значение(string)>}| false |
| readCoockie | Автозаполнение полей из cookie | true |
| writeCoockie | Запись содержимого полей в cookie (записывается при успешной проверке после клика по кнопке)| true |
| onComplite |функция выполняющаяся после успешной отправки заявки | false |
