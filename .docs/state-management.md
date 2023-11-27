# Менеджер состояний

_Nuxt_ использует компануемую компоненту `useState()` для сохранения значений (состояний) после рендеринга на стороне сервера. Данные в `useState()` сериализуются в JSON, поэтому там не могут храниться классы, функции или символы.

Определение состояния:

```typescript
// в любой компоненте
const count = useState<number>('counter', () => Math.round(Math.random() * 1000));
```

Использование:

```typescript
// в любой другой компоненте
const count = useState<number>('counter');

const addCount = () => {
    count += 1;
};
```

Сброс кэша состояния:

```typescript
clearNuxtState('count');
```


## Общие состояния 

Благодаря авто-импорту компонуемых компонент из `/composables` можно предоставить состояние всем компонентам с единой типизацией:

```typescript
// /composables/states.ts

const useCount = () => useState<number>('counter', () => Math.round(Math.random() * 1000));
```

В любой компоненте есть доступ без ручного импорта:

```typescript
// тип count - number
const count = useCount();
```

## Использование вместе с shallowRef()

Если не нужна глубокая реактивность хранимого в _useState_ состояния, можно использовать _shallowRef_:

```typescript
const count = useState<number>('counter', () => shallowRef({ deep: 'not reactive' }));
// isShallow(count) === true
```

## Сторонние библиотеки

_Nuxt_ по умолчанию использует _Vuex_, но можно установить модули: _Pinia_, _Harlem_ или _XState_ для работы с состояниями.
