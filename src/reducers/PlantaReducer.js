import update from 'immutability-helper';
const plantaReducer = (state, action)=>{
    let id;
    let value;

    switch (action.type) {
        case 'HANDLE_PLANTA':
            id = action.payload.id;
            value = action.payload.value;
            return {...state,
                initialStatePlanta:{
                    ...state.initialStatePlanta,[id]:value}};

        case 'HANDLE_PLANTA_FECHAS':
            return {...state,initialStatePlanta:
                    {...state.initialStatePlanta,[action.payload.id]:action.payload.e}};

        case 'HANDLE_PROCESOS':
        //return {...state,
        case 'HANDLE_PROCESOS_GARANTIA':

            return {...state,initialStateReparaciones:{
                    ...state.initialStateReparaciones,[action.payload.name]:action.payload.e.checked
                }};
        case 'HANDLE_PROCESOS_RENOVADOS':
             id = action.payload.name || action.payload.id;
            value = action.payload.value;
            return {...state,initialStateRenovados:{
                ...state.initialStateRenovados,[id]:value
                }};

        case 'HANDLE_PREVENTIVAS':
            id = action.payload.id;
            value = action.payload.value;
            console.log(state);
            return update(state,{
                initialStateReparaciones: {
                    preventiva:{
                        [id]:{$set:value}
                    }
                }
            });

        case 'HANDLE_CORRECTIVA':
            id=action.payload.id;
            value = action.payload.value;
            return update(state,{
                initialStateReparaciones:{
                    reparacionCorrectiva:{
                        [id]:{$set:value}
                    }
                }
            });

        case 'HANDLE_KALULTRA':
            id = action.payload.id;
            value = action.payload.value;

            return update(state,{
                initialStateReparaciones:{
                    reparacionKalUltra: {
                        [id]:{$set:value}
                    }
                }
            });

        default:
            return state;
    }
};

export default plantaReducer;