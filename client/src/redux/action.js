import { service} from "./service";

export const action ={
    login,
    register,
    ListArticle,
    updateProfile,
    getUser,
    saveArticle,
    getBookmarks
}


function login(body, callBack = () => { }) {
  return (dispatch) => {
    service.loginService(body).then(data => {
      dispatch({ type: 'SET_TOKEN', payload: data.token });
      callBack()
    }, error => {
      console.error("Login failed:", error);
    }
    );
  };
}



function register(body, callBack = () => { }) {
  return (dispatch) => {
    service.registerService(body).then(data => {
      dispatch({ type: 'SET_USER', payload: data.user });
      callBack()
    }, error => {
      console.error("Login failed:", error);
    }
    );
  };
}

function ListArticle(body, callBack = () => { }) {
  return (dispatch) => {
    service.ListArticle(body).then(data => {
      dispatch({ type: 'LIST_ARTICLES', payload: data });
      callBack()
    }, error => {
      console.error("Login failed:", error);
    }
    );
  };
}

function updateProfile(body, callBack = () => { }) {
  return (dispatch) => {
    service.updateProfile(body).then(data => {
      dispatch({ type: 'SET_USER', payload: data });
      callBack()
    }, error => {
      console.error("Login failed:", error);
    }
    );
  };
}

function getUser(body, callBack = () => { }) {
  return (dispatch) => {
    service.getUser(body).then(data => {
      dispatch({ type: 'SET_USER', payload: data });
      callBack()
    }, error => {
      console.error("Login failed:", error);
    }
    );
  };
}

function saveArticle(body, callBack = () => { }) {
  return (dispatch) => {
    service.saveArticle(body).then(data => {
      dispatch({ type: 'LIST_ARTICLE', payload: data });
      callBack()
    }, error => {
      console.error("Login failed:", error);
    }
    );
  };
}

function getBookmarks(body, callBack = () => { }) {
  return (dispatch) => {
    service.getBookmarks(body).then(data => {
      dispatch({ type: 'GET_ARTICLES', payload: data });
      callBack()
    }, error => {
      console.error("Login failed:", error);
    }
    );
  };
}
