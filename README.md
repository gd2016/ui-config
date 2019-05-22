## dls-ui

---



### PopBox

| Key             | Default | Description                                   |
|-----------------|---------|-----------------------------------------------|
| formAction      | LOGIN   |   LOGIN 登录 <br/>BIND 绑定  个人中心 -> 账号安全 -> 绑定手机号 <br/>  VERIFY 修改手机号时验证旧手机 <br/> NEWBIND 修改手机号时绑定新手机 <br/> SETPASSWORD 重置密码（找回密码时） <br/> RESET 找回密码时验证手机 <br/> MODIFY 个人中心修改密码时验证手机 <br/> RESETPASSWORD 个人中心修改密码  <br/> |
| INTERVAL        |  60     | 验证码时间间隔                                  |
| APPID           | wxb336aabd177e95d0| 在微信开放平台申请的APPID |
| lang            | zh      | 语言           |
| host            | \_\_ALLHISTORY_HOSTNAME\_\_ | 接口地址host |
| newSendMessageUrl  | /api/auth/w1/n/sms/send | 验证码接口地址 |
| newCheckMessageUrl | /api/auth/w1/n/sms/check | 检查验证码，并登录/注册/绑定手机号/解绑手机号 |
| newResetPasswordWithPhoneUrl | /api/auth/w1/n/setPassword | 找回密码时设置密码 |
| modifyPasswordUrl | /api/auth/w1/y/modifyPassword | 修改密码(通过手机号修改) |
| newLoginWithPasswordUrl | /api/auth/w1/n/login | 用户名密码登录 |
| newCheckCaptchaUrl | /api/auth/w1/n/checkKaptcha | 图片验证码提交 |
| newGetCaptchaUrl | /api/auth/w1/n/getKaptcha | 图片验证码获取 |
| requestConfig | {encrypt:false} |   Superfetch配置  |
| onclose    |  Function     |  关闭窗口时的回调 |

### Method

| name             | params | return   | description |
|-----------------|---------|---------------|--------------------------------|
|  close          |    -      |   -   | 强制关闭窗口  |

### Usage

```javascript
import LoginBox from '@portal//login-box';

new loginbox({
  lang: "zh",
  formAction: "LOGIN",
  host: "__ALLHISTORY_HOSTNAME__"
})
```




