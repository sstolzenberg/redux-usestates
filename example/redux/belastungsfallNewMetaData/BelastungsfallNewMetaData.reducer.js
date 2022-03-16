import { RSReducer  } from  '@globalsw/redux-usestates'

const reducername = "belastungsfallNewMetaData";

const initialState = { var1: 1,
                       var2: 2,
}
const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    const myreducer = RSReducer( state, reducername, type, payload );
    if (myreducer != null ) { return myreducer } else { return state } 
}
// link to the rootReducer
export default reducer

