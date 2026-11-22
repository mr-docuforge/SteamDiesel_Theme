# SteamDiesel MK-V — карта разработки

## Концепция
Living Phonograph — дизельпанк-инструментальная панель Spotify: чертёжная сетка, механическая гравировка, шестерни и дуги шкал, состаренный металл и Nixie-индикатор.

## Архитектура
- Theme: корневые `user.css`, `color.ini`, `manifest.json`.
- Палитры: Brass и RustPatina в одном `color.ini`.
- Extension: `Extensions/steamdiesel-chronograph.js` читает состояние через `Spicetify.Player`.
- Синхронизация: хронограф использует `--spice-button`, `--spice-button-active`, `--spice-text` и `--spice-subtext`, поэтому следует за цветовой схемой темы.

## Проверки
- [x] JS syntax check (Node.js).
- [x] JSON manifest parse.
- [x] CSS syntax parse.
- [x] Marketplace manifest shape checked against official publishing guide.
- [ ] Проверить обнаружение карточек Marketplace после добавления GitHub topics.
- [ ] Runtime test в Spotify/Spicetify на Windows.
- [ ] Проверить расположение хронографа на разных ширинах окна и на разных состояниях плеера.

## Ограничения
Селекторы Spotify DOM и форма Player.data могут меняться между версиями клиента. Статическая проверка не заменяет runtime test.