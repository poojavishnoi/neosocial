export const authReducer = (state, {type, payload}) => {
  switch(type){
    case "INIT_AUTH":
      return {
        ...state,
        loading: true,
        user:null,
        error: ""
      }
    case "AUTH_SUCCESS": 
      return {
        ...state,
        loading:false,
        user: payload
      }
    case "AUTH_FAIL":
      return {
        ...state,
        loading:false,
        error:payload
      }
    case "UPDATE": 
      return {
        ...state,
        following: payload.following,
        follower: payload.follower
      }

    case "UPDATE_PIC": 
      return {
        ...state,
        pic: payload
      }

      case "LOGOUT":
      return {
        ...state,
        user: null,
        error: ""
      }
    default: 
      throw new Error("Unhandled action type")
    
  }
}