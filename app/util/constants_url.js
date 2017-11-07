/**
 * @author CYF
 * @email 908601756@qq.com
 */

/**
 * 服务器地址
 * @type {string}
 */

// const IPAddress = 'http://118.178.246.192:8733/';    //在线服务器
const IPAddress = 'http://114.67.154.29/';    //测试服务器
// const IPAddress = 'http://114.67.154.29/';    //http://114.67.154.29/custom/test


/** 刷新token */
export const REFRRSHTOKEN    = IPAddress + 'custom/getToken';

/** 获取验证码token */
export const GETCHECKNUM    = IPAddress + 'custom/getYzmToken';

/** 发送短信验证码 */
export const SENDYZM    = IPAddress + 'custom/sendYzm';

/** 登陆请求 */
export const LOGINURL    = IPAddress + 'custom/login';

/** 退出登录 */
export const LOGINURLOUT    = IPAddress + 'custom/loginout';

/** 注册接口 */
export const REGISTER    = IPAddress + 'custom/regist'

/** 找回密码 */
export const FORGETPASS  = IPAddress + 'custom/forgetPass'

/** 获取用户信息 */
export const GETUSERINFO    = IPAddress + 'custom/getCustom';

/** 实名认证 姓名*/
export const CHECKNAME    = IPAddress + 'custom/authByRealName';

/** 实名认证 手机号 */
export const CHECKPHONE    = IPAddress + 'custom/authByPhone';

/** 实名认证 学历认证 */
export const CHECKSCHOOL    = IPAddress + 'custom/educauth';

/** 实名认证 工作认证 */
export const CHECKWORK    = IPAddress + 'custom/workAuth';

/** 实名认证 联系人认证 */
export const CHECKCONTACT    = IPAddress + 'custom/linkAuth';

/** 首页加载产品信息 */
export const HOMEINFO    = IPAddress + 'base/productList';

/** 我的订单 */
export const MYORDER    = IPAddress + 'book/myBookList';

/** 查询订单每期费用信息 */
export const QUERYORDERDETAIL    = IPAddress + 'book/getBill';

/** 生成订单 */
export const CREATEORDER    = IPAddress + 'book/createBook';

/** 我的审核中心 */
export const CHECKCENTER    = IPAddress + 'book/myAuditBook';

/** 我的消息 */
export const MESSAGE    = IPAddress + 'custom/myMessage';






