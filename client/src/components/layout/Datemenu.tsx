import React, { useContext, useEffect } from "react";
import DateItemMobile from "./DateItemMobile";
import DateItemWeb from "./DateItemWeb";
import CssContext from "../../context/css/cssContext";

const Datemenu = () => {
  const cssContext = useContext(CssContext);
  const { dimensions, setDimensions } = cssContext;

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      // <-- higher order function
      setDimensions(); // <-- this is what is only called every 1000ms
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);

    return (_: void) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });
  function debounce(fn: Function, ms: number) {
    let timer: number | null;
    return (_: any) => {
      timer && clearTimeout(timer);
      timer = setTimeout((_) => {
        timer = null;
        fn.apply(undefined, arguments); // <-- TODO: undefined instead of this works?
      }, ms); // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-2.html
    };
  }
  if (dimensions.width < 800) {
    return <DateItemMobile />;
  } else {
    return <DateItemWeb />;
  }
};

export default Datemenu;
