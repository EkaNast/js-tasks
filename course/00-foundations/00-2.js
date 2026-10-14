
const users = [
  { name: 'Анна', active: true },
  { name: 'Иван', active: false },
  { name: 'Мария', active: true }
]

function getActiveNames(users) {
const nov = users.filter(user => user.active)
.map(user => user.name)
return nov
}

console.log(getActiveNames(users))
