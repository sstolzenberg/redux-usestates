
import { useState, useEffect }        from 'react';
import { shallowEqual, useSelector }  from 'react-redux';
import { get as npget }               from 'nested-property';

// State Redux State:
// read/write Redux State with a useState as proxy (e.g., to work around a bug in MateriaTable)
export const useSRS = ( store, path ) => {
  const selector          = useSelector(s => npget(s, path), shallowEqual);
  //console.log("path", path);
  //console.log("selector", selector);
  const setSelector       = (newstate) => { store.dispatch({ type: "_"+path+"_", payload: newstate })};
  const [state, setState] = useState(selector);
  useEffect(() => {
    setSelector(state);
  }, [state]);
  return [state, setState];
}

// read-only Redux State 
export const useRSr = (path) => {
  return useSelector(s => npget(s, path), shallowEqual);
}

// read/write Redux State that in principle, should behave like useState()
export const useRSwr = (store, path ) => {
  const selector    = useSelector(s => npget(s, path), shallowEqual);
  const setSelector = (newstate) => {
    if (typeof newstate === 'function') {
      dispatch => store.dispatch({ type: _+path+_, payload: newstate(npget(store.getState(), path)) });
    } else {
      dispatch => store.dispatch({ type: _+path+_, payload: newstate });
    }
  }
  return [selector, setSelector];
}


// Nested update for RSReducer
export const deepupdate = (state, prop, payload) => {
  //console.log("STATE0", state, prop, payload);
  const myprop  = prop.shift();
  const mystate = state[myprop];
  //console.log(myprop, mystate)
  //console.log("STATE1", mystate, myprop, prop, payload);
  if (prop.length > 0) {
    return { ...state, [myprop] : deepupdate(mystate, prop, payload) };
  } else if ( myprop == null) {
    return { ...state, ...payload };
  } else {
    return { ...state, [myprop]: payload };
  }
}

export const RSReducer = ( state, reducerref, type, payload ) => {
    // for example: "_reducer.attribute_"
    if ((type[0] === "_") && (type.slice(-1) === "_")) {
      const path = type.slice(1,-1);
      const prop = path.split(".");
      const reduc = prop.shift();
      if (reduc === reducerref) {
        return deepupdate(state, prop, payload);
      }      
    }
}
    /*
    // for example: "_reducer.attribute_"
    if ((type[0] === "_") && (type.slice(-1) === "_")) {
      const prop = type.slice(1,-1).split(".").slice(-1)[0];
      if (typeof payload === 'function') {
        return { ...state, [prop]: payload(state[prop])};
      } else {
        return { ...state, [prop]: payload };
      }
    }
    */

//export { useSRS, useRSr, useRSwr, RSReducer }


