import { boot } from 'quasar/wrappers';
import VueGoogleMaps from '@fawmi/vue-google-maps';

export default boot(({ app }) => {
  app.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyCN2W825t-mN72wUwPJVig-CH0wiXyXayY',
    },
  });
});
