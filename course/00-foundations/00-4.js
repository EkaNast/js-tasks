const user = {
  name: 'Анна',
  getName() {
    return this.name;
  },
};
// 1. Вызов через объект: this === user

console.log(user.getName());

// значение this определяется не тем, где функция объявлена, а тем, как она вызвана.
//  При user.getName() слева от точки стоит user, он и становится this

// 2. Метод отдельно: контекст потерян

const getName = user.getName;
console.log(getName());

// При getName() объекта слева нет, поэтому this берётся из глобального контекста

// 3. Исправление через bind

const boundGetName = user.getName.bind(user);

console.log(boundGetName());

// bind: он возвращает новую функцию с намертво привязанным this.
// Даже если её передать куда угодно
