import {combineReducers} from 'redux'
import belastungsfallNewMetaDataReducer from "./belastungsfallNewMetaData/BelastungsfallNewMetaData.reducer";

const rootReducer = combineReducers({
    belastungsfallNewMetaData: belastungsfallNewMetaDataReducer,
})

export default rootReducer;

