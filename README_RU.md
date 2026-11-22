# SteamDiesel MK-V — Акустический хронограф

Дизельпанк-тема Spotify, вдохновлённая механическими хронометрами, инженерными чертежами и промышленными приборами. Фон построен по графическим референсам проекта: тёплая состаренная бумага, тёмная механическая зона, шестерни, шкалы и гравированные рамки.

## Две схемы оформления

- **Brass** — тёплая латунь, янтарное свечение, чёрное машинное масло и состаренная бумага.
- **RustPatina** — патинированная медь, графит, приглушённая бирюза и холодные приборные метки.

Обе схемы находятся в одном `color.ini`. Выбор схемы в Marketplace → Themes меняет цвета Spotify. Living Phonograph использует те же переменные Spicetify, поэтому его корпус, Nixie-индикатор, кнопки и шкала прогресса следуют выбранной палитре.

## Marketplace

Репозиторий публичный. Оба обязательных GitHub Topics уже добавлены и проверены поиском GitHub:

- `spicetify-themes`
- `spicetify-extensions`

Корневой `manifest.json` содержит две карточки: тему и расширение. Карточка темы дополнительно содержит `include` со ссылкой на расширение, опубликованное через GitHub Pages: при установке темы Marketplace сможет подключить Living Phonograph вместе с ней. Для публикации этого файла добавлен workflow GitHub Actions `.github/workflows/pages.yml`.

**Одноразовая настройка GitHub Pages:** откройте [Settings → Pages](https://github.com/mr-docuforge/SteamDiesel_Theme/settings/pages), в разделе Build and deployment выберите Source: **GitHub Actions**. Затем откройте вкладку Actions и дождитесь успешного выполнения `Publish Living Phonograph for Marketplace include`. Пока Pages не включён и workflow не завершился успешно, ссылка из `include` не будет доступна.

После этого, когда Marketplace проиндексирует репозиторий:

1. Откройте Marketplace → **Themes**.
2. Найдите **SteamDiesel — Acoustic Chronograph** и установите тему.
3. В выборе цветовой схемы установите **Brass** или **RustPatina**. Хронограф подключается через `include` темы. Отдельная карточка Living Phonograph в Extensions остаётся доступна для самостоятельной установки и обновления.

Тема и хронограф публикуются отдельными карточками Marketplace, но используют общие цветовые токены. Сам факт наличия Topics ещё не подтверждает, что карточки уже появились в каталоге: Marketplace должен обновить индекс.

## Ручная установка

Тема находится в корне репозитория:

1. Скопируйте `user.css`, `color.ini` и папку `assets` в папку темы `SteamDiesel`.
2. Выполните:

```powershell
spicetify config current_theme SteamDiesel color_scheme Brass
spicetify apply
```

Для патиновой схемы замените `Brass` на `RustPatina`.

Чтобы установить хронограф вручную, скопируйте `Extensions/steamdiesel-chronograph.js` в каталог Spicetify Extensions и выполните:

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
- `user.css` — оформление Spotify и референсный чертёжно-механический фон.
- `color.ini` — палитры Brass и RustPatina.
- `assets/` — гравированный SVG-фон и предпросмотр.
- `Extensions/` — Living Phonograph и инструкция.
- `docs/` — заметки разработки и чек-лист.

Лицензия: MIT.