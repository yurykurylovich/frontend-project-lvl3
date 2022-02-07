import i18next from 'i18next';
import resources from './locales/index.js';
import initView from './view.js';
import App from './components/App.js';
import RSSFeeder from './libs/RSSFeeder.js';

const run = async () => {
  const config = {
    NODE_ENV: process.env.NODE_ENV,
    RSS_SYNC_PERIOD: 5000,
    RSS_PROXY_URL: 'https://hexlet-allorigins.herokuapp.com',
  };

  const state = {
    app: {
      isProd: (config.NODE_ENV === 'production'),
      lng: 'ru',
    },
    feedsUpdateTimestamp: null,
    uiState: {
      form: {
        state: 'ready',
        errorType: null,
      },
    },
  };

  const i18n = i18next.createInstance();
  const rssFeeder = new RSSFeeder(config);

  return i18n
    .init({ lng: 'ru', debug: !state.app.isProd, resources })
    .then(() => {
      const app = new App({
        i18n,
        rssFeeder,
      });
      const view = initView(state, app);
      app.init(view);
      app.header.form.renderEmpty();

      rssFeeder.addUpdateListener(() => {
        view.feedsUpdateTimestamp = Date.now();
      });
      rssFeeder.enableAutoSync();
    });
};

export default run;
