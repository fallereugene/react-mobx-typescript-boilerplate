const TYPES = [
    ['build', 'build: Сборка проекта или изменения внешних зависимостей'],
    ['ci', 'ci: Изменения в CI/CD процессах'],
    ['feat', 'feat: Добавление нового функционала'],
    ['fix', 'fix: Исправление ошибок'],
    ['docs', 'docs: Изменения в документации'],
    ['style', 'style: Правки кодстайла (табы, отступы, точки, запятые и т.д.)'],
    ['refactor', 'refactor: Правки кода без исправления ошибок или добавления новой функциональности'],
    ['perf', 'perf: Изменения, улучшающие производительность'],
    ['test', 'test: Добавление тестов'],
    ['chore', 'chore: Выпуск новой версии, какая-то небольшая рутинная работа'],
    ['revert', 'revert: Откат к предыдущим коммитам'],
    ['wip', 'wip: Разработка в процессе'],
    ['change', 'change: Изменения, попадающие в релизноты и сделанные в рамках уже существующего функционала'],
];

// Область, которую затронули изменения
const SCOPES = ['components', 'infrastructure'];

module.exports = {
    types: TYPES.map(([value, name]) => ({
        value,
        name,
    })),
    scopes: SCOPES.map((name) => ({ name })),
    allowTicketNumber: false,
    isTicketNumberRequired: false,
    ticketNumberPrefix: 'TICKET-',
    ticketNumberRegExp: '\\d{1,5}',

    // it needs to match the value for field type. Eg.: 'fix'
    /*
    scopeOverrides: {
      fix: [
        {name: 'merge'},
        {name: 'style'},
        {name: 'e2eTest'},
        {name: 'unitTest'}
      ]
    },
    */
    // override the messages, defaults are as follows
    messages: {
        type: 'Выберите тип вносимых изменений:',
        scope: '\nУкажите область, в которой произошли изменения (опционально):',
        // used if allowCustomScopes is true
        customScope: 'Укажите свою ОБЛАСТЬ:',
        subject: 'Напишите короткое сообщение:\n',
        body: 'Напишите ПОДРОБНОЕ описание (опционально). Используйте "|" для новой строки:\n',
        breaking: 'Список BREAKING CHANGES (опционально):\n',
        footer: 'Место для мета данных (тикетов, ссылок и остального). Например: #123456:\n',
        confirmCommit: 'Подтверждаем сообщение коммита?',
    },
    // разрешение собственной области
    allowCustomScopes: true,
    allowBreakingChanges: ['feat', 'fix'],
    // skip any questions you want
    // skipQuestions: ['scope', 'body'],

    // limit subject length
    subjectLimit: 72,
    // breaklineChar: '|', // It is supported for fields body and footer.
    // footerPrefix : 'ISSUES CLOSED:'
    // askForBreakingChangeFirst : true, // default is false
};
