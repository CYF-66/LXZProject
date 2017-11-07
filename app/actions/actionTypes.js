/**
 * RenRenDemo
 * @author CYF
 * @date 2017-10-23
 */


'use strict';

/**
 * action 类型
 */

//公用类型
export const ACTIONERROR                       = 'action_error';
export const TOKENERROR                       = 'token_error';
// export const kCommonIsToasting                  = 'kCommonIsToasting';

//刷新token
export const REFRESHTOKEN                  = 'token_refresh';
export const REFRESHTOKENRECEIVED                  = 'token_refresh_received';

//获取验证码token
export const GETCHECKNUM                  = 'yzm_token';
export const GETCHECKNUMRECEIVED                  = 'yzm_token_received';

//发送短信验证码
export const SENDYZM                  = 'yzm_send';
export const SENDYZMRECEIVED                  = 'yzm_send_received';

//登录
export const LOGINURL                  = 'login_in';
export const LOGINURLRECEIVED                  = 'login_in_received';

//退出登录
export const LOGINOUT                  = 'login_out';
export const LOGINOUTRECEIVED                  = 'login_out_received';

//注册
export const REGISTER                  = 'register';
export const REGISTERRECEIVED                  = 'register_received';

//首页数据
export const GETHOMEINFO                  = 'home_info';
export const GETHOMEINFORECEIVED   = 'home_info_received';

//消息
export const GETMESSAGE                  = 'message';
export const GETMESSAGERECEIVED   = 'message_received';

//我的订单
export const MYORDER                  = 'my_order';
export const MYORDERRECEIVED                  = 'my_order_received';

//订单每期费用信息
export const MYORDERDETAIL                  = 'my_order_detail';
export const MYORDERDETAILRECEIVED                  = 'my_order_detail_received';

//生成订单
export const CREATEORDER                  = 'order_create';
export const CREATEORDERRECEIVED                  = 'order_create_received';

//审核中心
export const CHECKCENTER                  = 'check_center';
export const CHECKCENTERRECEIVED                  = 'check_center_received';

//实名认证
export const CHECKNAME                  = 'check_name';
export const CHECKNAMERECEIVED                  = 'check_name_received';

//手机号认证
export const CHECKPHONE                  = 'check_phone';
export const CHECKPHONERECEIVED                  = 'check_phone_received';

//学历认证
export const CHECKSCHOOL                  = 'check_school';
export const CHECKSCHOOLRECEIVED                  = 'check_school_received';

//工作认证
export const CHECKWORK                  = 'check_work';
export const CHECKWORKRECEIVED                  = 'check_work_received';

//工作认证
export const CHECKCONTACT                  = 'check_contact';
export const CHECKCONTACTRECEIVED                  = 'check_contact_received';






