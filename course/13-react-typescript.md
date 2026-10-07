# 13. Перенос курса в React + TypeScript

[Программа](../README.md) · [Исходный дашборд](12-mini-dashboard.md)

Перенеси все 12 интерфейсов, сохранив макеты, доступность, поведение и работу с fetch. Каждый перенос — отдельная практика по исходному заданию; пройти только один компонент недостаточно для завершения этого модуля.

## Подготовка

По [официальному руководству Vite](https://vite.dev/guide/) создай новый каталог решения: `npm create vite@latest react-course -- --template react-ts`. Из него запусти `npm install`, затем `npm run dev`. Требования к Node.js проверь в документации Vite. Начальную vanilla-версию сохрани для сравнения поведения.

Повтори [Доку о функциях](https://doka.guide/js/function/), [массивах через filter](https://doka.guide/js/array-filter/) и [областях видимости](https://doka.guide/js/closures/). Материалы про React ищи в [разделе рецептов Доки](https://doka.guide/recipes/); основную модель изучай по [React Learn](https://react.dev/learn), типы — по [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html).

## Теория React

Компонент возвращает JSX на основе props и state. Props приходят от родителя, state хранится у владельца данных; изменение состояния запускает рендер. Рендер должен быть чистым. Для управляемого input родитель передаёт value и принимает onChange. Не дублируй ту же строку в отдельном локальном состоянии. Общие данные подними к ближайшему общему родителю. [Sharing State](https://react.dev/learn/sharing-state-between-components).

Массивы и объекты состояния обновляй созданием новых структур. `key` идентифицирует элемент между рендерами; индекс плохо подходит для сортируемых и удаляемых записей. Ref хранит ссылку на DOM или значение без перерендера; состояние видимого текста в ref хранить не следует. [React Learn](https://react.dev/learn).

Effect синхронизирует компонент с внешней системой: fetch, document-событие, таймер, нативный dialog. Cleanup отменяет операцию или удаляет подписку. Вычислять отфильтрованный список можно при рендере без отдельного effect. Не скрывай зависимости ради устранения повторных вызовов. Дополнительный цикл setup/cleanup в StrictMode при разработке помогает найти проблемы очистки. [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects).

Мемоизация не обязательна: сначала корректность, затем измерение. Добавляй memo/useMemo/useCallback только с объяснением, какую измеримую лишнюю работу они устраняют.

## Теория TypeScript

`type` описывает алиас, union и другие композиции; `interface` — расширяемую структуру объекта. Optional-свойство может отсутствовать. Union задаёт альтернативы, narrowing сужает их после проверки. Не заменяй неизвестные данные API на `any`: используй `unknown` и проверь структуру на границе. TypeScript не валидирует JSON во время выполнения. [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html), [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html).

Generic связывает тип входа и результата; например `paginate<T>` возвращает элементы того же типа T. `Pick` выбирает поля, `Omit` исключает, `Partial` делает их необязательными, `Record` задаёт отображение ключей в значения. Выбери тип по задаче, а не ради использования всех утилит. [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html).

Пример контракта состояния для самостоятельной реализации:

```ts
type LoadState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: T };
```

Пустой массив в success — успешный пустой результат, а не ошибка. При проверке status TypeScript позволяет обратиться к полям соответствующего варианта.

## Мини-упражнения

1. Перенеси счётчик из модуля 00 через useState; убери querySelector для изменения числа.
2. Опиши тип Product и чистую `paginate<T>`. Докажи на уровне типов, что массив Product не превращается в массив User.
3. Напиши проверку минимальной структуры ответа `{ products: unknown }` и только после неё преобразуй данные в UI-модель.
4. Сделай компонент, который ставит таймер и снимает его при размонтировании; проверь в StrictMode.

## Задания переноса

Макет каждого переноса находится по ссылке на оригинальное задание. Схема устройства итоговой версии:

```text
App — общее состояние и данные
├─ Header → NotificationCenter
├─ ProfileCard + ProfileForm
├─ Tabs → Overview / Catalog / Users
│         ├─ ProductAutocomplete → searchProducts(fetch)
│         ├─ Filters → ProductGrid → ProductCard
│         └─ DataTable → Pagination
├─ Accordion
├─ ConfirmDialog
└─ ToastProvider → ToastViewport
API-функции возвращают данные, компоненты возвращают JSX.
```

| Исходное задание | Что сделать в React + TS | Что проверить |
|---|---|---|
| [01 Profile Card](01-profile-card.md) | Типизированные props профиля, навыки через map и стабильные key | Длинный текст, alt и адаптивность |
| [02 Registration Form](02-registration-form.md) | Управляемые поля, вычисляемые ошибки, submit; типы значений | Enter, совпадение паролей, без логирования секретов |
| [03 Tabs](03-tabs.md) | Union ID вкладок, controlled activeId/onChange; ref для фокуса | Стрелки, aria-selected, roving tabindex |
| [04 Accordion](04-accordion.md) | Сохранить details/summary; согласовать open с React-состоянием | Нативный toggle не создаёт бесконечное обновление |
| [05 Notifications](05-notification-center.md) | Массив записей в state, счётчик вычисляемый; внешняя подписка с cleanup | Внешний клик, Escape, независимые экземпляры |
| [06 Modal](06-modal.md) | Ref на dialog, открытие/закрытие синхронизированы; тип результата | Cancel/close обновляют state, фокус возвращается |
| [07 Toasts](07-toast-manager.md) | Тип Toast, очередь в менеджере/provider; таймеры с cleanup | FIFO, закрытие, StrictMode, destroy/unmount |
| [08 Autocomplete](08-autocomplete.md) | value/onChange/search/onSelect; fetch отдельно, отмена при смене query | Устаревший ответ, очистка таймера, клавиатура |
| [09 Product Grid](09-product-grid.md) | ProductCard и ProductGrid с типизированными props | Тот же макет, без index key |
| [10 Filters](10-filters.md) | Filters в общем состоянии, результат вычислять; URL и storage отдельно | История и отсутствие мутации |
| [11 Data Table](11-data-table.md) | Тип User, сортировка и paginate; состояние загрузки через union | Страницы, loading/error, проверки JSON |
| [12 Dashboard](12-mini-dashboard.md) | Собрать компоненты, поднять общие данные; сохранить API-контракты | Частичный сбой, метрики, скрытие и восстановление |

## 💡 На собеседовании

- Для чего используются анонимные функции? [Дока: рубрика «На собеседовании»](https://doka.guide/js/function/#na-sobesedovanii)
- Что такое область видимости? [Дока: рубрика «На собеседовании»](https://doka.guide/js/closures/#na-sobesedovanii)

Вопросы к переносу: чем props отличаются от state? Когда нужен effect и его cleanup? Почему key по индексу опасен для таблицы? Чем controlled отличается от uncontrolled? Почему тип ответа не заменяет проверку JSON? Объясни их на своём коде; эти вопросы здесь служат самопроверкой.

## Приёмка и ревью

- [ ] Все 12 исходных сценариев сохранены; ссылками или видео сравни vanilla и React.
- [ ] StrictMode не вызывает двойного удаления, лишних тостов и оставшихся таймеров.
- [ ] Нет прямого изменения DOM, который управляется JSX; ref используется для фокуса и нативных API.
- [ ] TypeScript strict включён; нет маскирующих проблему any и безосновательных утверждений типа.
- [ ] `npm run build` и доступная команда lint проходят; сценарии fetch проверены в браузере.
- [ ] Основные функции обработки данных и защита от устаревшего ответа имеют проверки поведения.

Усложнение: выдели повторяемую загрузку в `useAsyncResource<T>` с отменой и состояниями, сохранив отдельные статусы независимых секций. Не создавай универсальный хук, если его контракт сложнее двух понятных вызовов.
