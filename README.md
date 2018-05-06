# fbf

## Установка требуемых пакетов

Для начала скачиваем и устанавливаем самый свежий [node.js](https://nodejs.org/uk/). Он же поставит `npm`. После этого устанавливаем пакеты, необходимые для создания сборки.

### Начальная установка

Создаем файл `package.json`. Для этого в основном каталоге вводим команду:

	npm init -y

Она создаст файл с параметрами по умолчанию. В самом начале в файле отсутствует раздел `devDependencies`.

#### Установка typescript

В каталоге программы выполняем команду:

	npm install -g typescript tslint
	npm install --save-dev gulp-typescript

#### Установка babel

В каталоге программы выполняем команду:

	npm install babel-cli babel-core babel-preset-es2015 --save-dev
	npm install --save-dev gulp-babel

Для определения параметров работы `babel` в основном каталоге создаем файл `.babelrc` со следующим содержимым:

```json
{
  "presets": ["es2015"],
  "comments": false
}
```

Типичные команды для **babel**:

	> babel src -d . --minified
	> babel src -d . -w


#### Установка less

В каталоге программы выполняем команду:

	npm install -g less

Типичная команда для **less**:

	> lessc src\fbf.less .\fbf.css

#### Установка gulp

```
npm install gulp-cli -g
npm install gulp -D
touch gulpfile.js
gulp --help
```
Выполняем скрипт с помощью команды `> gulp`.


### Установка на другой компьютер

В каталоге программы выполняем команду (она загрузит все требуемые пакеты):

	npm install

## Запуск задач

Задачи запускаются с помощью команды:

	npm run <command>

## Добавление подписчиков

Помимо парсинга друзей, необходим также парсинг подписчиков.