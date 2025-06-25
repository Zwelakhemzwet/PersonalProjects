Настройка адаптивной верстки сайта (https://skillbox.ru/media/code/mediazaprosy-v-css-kak-nastroit-adaptivnuyu-vyerstku-sayta/)

мы научили:

медиазапросы - некие условия, которые определяют когда применить какие-то стили. условия относятся к устройствам пользователя. например: размер экрана или ориентации экрана.

как использовать медиазапросы

```html
@media <условие> {
<стиль>
}
```

```html
<style rel="stylesheet" media="<условие>" href="path/to.css"></style>
```

```html
<style>
@import <url> <условие>;
</style>
```

```html
<source media="<условие>" srcset="paths">
```

