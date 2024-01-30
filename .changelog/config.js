module.exports = {
    // адрес репозитория, в котором ведется разработка
    // используется для корректной генерации ссылки на коммит
    repositoryUrl: 'https://github.com/fallereugene/react-mobx-typescript-boilerplate',
    // адрес коммитов. В разных системах url-сегменты могут различаться
    // Например, в github, bitbucket - это /commits/. В tfs - /commit/
    commitsPath: '/commit/',
    // адрес трекера задач
    // используется для корректной генерации ссылки на задачу
    trackerUrl: '',
    // ссылка на diff релизов (ссылка генерируется в процессе создания CHANGELOG-а)
    // ссылка на гитхаб, например, имеет следующий вид: https://github.com/nodejs/node/compare/v19.6.1...v19.7.0
    // В то время, как в TFS ссылка имеет отличный от гитхаба вид
    releaseCompareUrl: 'https://github.com/fallereugene/react-mobx-typescript-boilerplate/compare',
    // секции, отображаемые в CHANGELOG.md. В основе ключей  лежат поддерживаемые
    // типы сообщений (conventional commits). Значения ключей - заголовок отображаемой секции.
    section: {
        feat: 'Features',
        fix: 'Bug Fixes',
        perf: 'Performance',
        refactor: 'Refactoring',
        build: 'Build',
        docs: 'Documentation',
        change: 'Changes',
        test: 'Tests',
        revert: 'Reverts',
    },
};
