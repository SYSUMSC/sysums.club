import '../components/global-styles.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { initializeIcons } from '@fluentui/react';

initializeIcons();

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
