import React, { useContext, useEffect } from 'react';
import DateItemMobile from './DateItemMobile';
import DateItemWeb from './DateItemWeb';
import CssContext from '../../context/css/cssContext';

const Datemenu = () => {
  const cssContext = useContext(CssContext);
  const { dimensions, setDimensions } = cssContext;
  /*  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  }); */
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      /* setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      }); */
      setDimensions();
    }, 1000);

    window.addEventListener('resize', debouncedHandleResize);

    return _ => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  });
  function debounce(fn, ms) {
    let timer;
    return _ => {
      clearTimeout(timer);
      timer = setTimeout(_ => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }
  if (dimensions.width < 700) {
    return <DateItemMobile />;
  } else {
    return <DateItemWeb />;
  }
};

export default Datemenu;
