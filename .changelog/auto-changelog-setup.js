const config = require('./config.js');

const { repositoryUrl, commitsPath, trackerUrl, section, releaseCompareUrl } = config;
const repositoryCommitsPath = `${repositoryUrl}${commitsPath}`;

const registerHelpers = (Handlebars) => {
    Handlebars.registerHelper('generateCompareLink', (link) => {
        const segmentsUrl = link.split('/');
        return `${releaseCompareUrl}/${segmentsUrl[segmentsUrl.length - 1]}`;
    });

    Handlebars.registerHelper('generateReleaseContent', (data) => {
        let template = '';
        // eslint-disable-next-line
        for (const type of Object.keys(section)) {
            const items = data.filter((item) => item.subject.replace(/\(.*?\)/g, '').split(':')[0] === type);
            if (items.length) {
                template += `\n### ${section[type]}`;

                const content = items.reduce((a, v) => {
                    const scope = v.subject.match(/\((.*)\)/);
                    const description = v.subject.split(':')[1];
                    const messageSegments = v.message.split('\n').filter(Boolean);
                    const extendedDescription = /^#[0-9]+$/.test(messageSegments[1]) ? null : messageSegments[1];
                    const issue = messageSegments[messageSegments.length - 1].split('#').filter(Number)[0];
                    const commit = `[commit](${repositoryCommitsPath}${v.hash})`;
                    const workItem = issue ? ` [#${issue}](${trackerUrl}${issue})` : '';
                    const meta = workItem ? `(${commit}, ${workItem})` : `(${commit})`;

                    return `${a}\n - ${description} ${scope ? `**[${scope[1]}]**` : ''} ${meta} \n${
                        extendedDescription ?? ''
                    }`;
                }, '');

                template += content;
            }
        }

        return template;
    });

    Handlebars.registerHelper('formatDate', (date) => {
        return new Intl.DateTimeFormat('ru').format(new Date(date));
    });
};

// eslint-disable-next-line
module.exports = registerHelpers;
