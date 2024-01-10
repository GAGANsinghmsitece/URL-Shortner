let endpoints = {
    SignUp: `${process.env.REACT_APP_API_URL}/users/signup`,
    Login: `${process.env.REACT_APP_API_URL}/users/login`,
    ShortURL: `${process.env.REACT_APP_API_URL}/urls/short`,
    HistoryURL: `${process.env.REACT_APP_API_URL}/urls/list`,
    ResolveURL: `${process.env.REACT_APP_API_URL}/urls/original?hash=`
};
export default endpoints;