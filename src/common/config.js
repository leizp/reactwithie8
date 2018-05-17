let baseURL = '';
let loginUrl = '';
let domain = '';
if (process.env.NODE_ENV === 'production') {
    if (process.env.EWT_ENV === '235') {
        domain = 'http://my.233.mistong.com'


        baseURL = 'http://10.0.11.86:8769/api/evaluation';
        loginUrl = 'http://my.235.mistong.com/sso?sid=14'
        // loginUrl = 'http://xinli.ewt360.com/Login?fromurl=http%3a%2f%2fxinli.ewt360.com%2f'
    } else {
        domain = 'http://passport.ewt360.com'
        // 线上接口
        // baseURL = 'http://10.0.11.86:8769/api/evaluation';
        loginUrl = 'http://passport.ewt360.com/sso?sid=16'

    }


} else {
    // 开发环境自己随意配置
    domain = 'http://my.233.mistong.com';
    // baseURL = '';
    baseURL = 'http://10.0.11.86:8769/api/evaluation';

    loginUrl = 'http://my.233.mistong.com/sso?sid=14'
}
export const ajaxbaseurl = baseURL;
export const loginbaseurl = loginUrl;
export const maindomain = domain;
