import _find from 'lodash/find';
import _map from 'lodash/map';

export const staticPages = [
  { name: 'about', route: '/about', apiURL: '1' },
  { name: 'contact', route: '/contact', apiURL: '2' },
];

export const getStaticPagesRoutes = () => {
  return _map(staticPages, 'route');
};

export const getStaticPageByRoute = path => {
  return _find(staticPages, ['route', path]);
};

export const getStaticPageByName = name => {
  return _find(staticPages, ['name', name]);
};

export const uiConfig = {
  LOGO_SRC: process.env.PUBLIC_URL + '/logo-invenio-ils.svg',
  ES_DELAY: 3000,
  SUCCESS_AUTO_DISMISS_SECONDS: 10,
};
