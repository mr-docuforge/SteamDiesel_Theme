# SteamDiesel MK-V — Акустический хронограф

Дизельпанк-тема Spotify, вдохновлённая механическими хронометрами, чертёжными листами и промышленными приборами.

## Две схемы оформления

- **Brass** — тёплая латунь, янтарное свечение, чёрное машинное масло и состаренная бумага.
- **RustPatina** — патинированная медь, графит, приглушённая бирюза и холодные приборные метки.

Переключение цветовой схемы в Marketplace → Themes меняет палитру Spotify. Расширение Living Phonograph использует те же переменные Spicetify, поэтому его корпус, Nixie-индикатор, кнопки и шкала прогресса синхронизируются с активной схемой.

## Установка через Marketplace

После индексации репозитория Marketplace:
1. Откройте Marketplace → Themes.
2. Найдите **SteamDiesel — Acoustic Chronograph** и установите.
3. В настройках установленной темы выберите **Brass** или **RustPatina**.
4. В Marketplace → Extensions установите **SteamDiesel Living Phonograph**.

Для обнаружения Marketplace репозиторий должен быть публичным и иметь GitHub topics `spicetify-themes` и `spicetify-extensions`. Эти темы нужно добавить в GitHub Settings → Topics (см. [инструкцию публикации](https://github.com/spicetify/marketplace/wiki/Publishing-to-Marketplace)).

## Ручная установка

Тема находится в корне репозитория:
1. Скопируйте `user.css`, `color.ini`, `manifest.json` и папку `assets` в папку темы `SteamDiesel`.
2. Выполните:

```powershell
spicetify config current_theme SteamDiesel color_scheme Brass
spicetify apply
```

Для патиновой схемы замените `Brass` на `RustPatina`.

Чтобы установить хронограф, скопируйте `Extensions/steamdiesel-chronograph.js` в каталог Spicetify Extensions и выполните:

```powershell
spicetify config extensions steamdiesel-chronograph.js
spicetify apply
```

## Совместимость и безопасность

- Расширение использует `Spicetify.Player` и не перехватывает аудиопоток.
- Premium- и системные элементы Spotify не скрываются.
- Учитываются keyboard focus и prefers-reduced-motion.
- DOM Spotify и API Spicetify могут меняться; реальный runtime-тест требуется на целевой версии клиента.

## Структура

- `manifest.json` — карточки темы и расширения для Marketplace.
- `user.css` — оформление Spotify и чертёжный фон.
- `color.ini` — палитры Brass и RustPatina.
- `assets/` — гравированный SVG-слой и предпросмотр.
- `Extensions/` — Living Phonograph и инструкция.
- `docs/` — заметки разработки и чек-лист.

Лицензия: MIT.