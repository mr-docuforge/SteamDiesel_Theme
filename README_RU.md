# SteamDiesel MK-V — Living Phonograph

MVP 0.1.0. Исходники темы и расширения Spicetify.

## Состав
- `Extensions/steamdiesel-chronograph.js` — панель хронографа, связанная с `Spicetify.Player`.
- `snippets/SteamDiesel-Brass.css` — латунная редакция.
- `snippets/SteamDiesel-Rust-Patina.css` — редакция с патиной.
- `docs/DEVELOPMENT_MAP.md` — карта разработки.

## Установка
1. Сделайте резервную копию конфигурации.
2. Сохраните Marketplace: `spicetify config current_theme marketplace`.
3. Скопируйте JS в каталог Spicetify Extensions.
4. Выполните `spicetify config extensions steamdiesel-chronograph.js` и `spicetify apply`.
5. В Marketplace → Snippets → Add CSS добавьте один CSS-файл из `snippets/`.
6. Не включайте обе палитры одновременно.

## Проверка
JS проходит статическую проверку синтаксиса. CSS проверен на баланс фигурных скобок. Реальный runtime-тест в Spotify ещё необходим; структура Player.data и DOM Spotify могут меняться.

## Ограничения
Расширение использует Spicetify.Player и не перехватывает аудиопоток через AudioContext. Панель скрывается на окнах уже 850 px. Для отката удалите extension из конфигурации, удалите файл JS, выключите CSS Snippet и выполните `spicetify apply`.
