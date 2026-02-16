Vue.customElement("v-login-form",{props:{origin_item_id:{type:String,default:""},shortiesInputVideoId:{type:String,default:""},subscribe:{type:Boolean,default:!1},XSsoButtonHtml:{type:String,default:""},modal:{type:Boolean,default:!0},twoFactorAuthentication:{type:Boolean,default:!1},loginData:{type:String,default:""},noticeUrl:{type:String,default:""},noticeText:{type:String,default:""},noticeLawUrl:{type:String,default:""},noticeLawText:{type:String,default:""}},data:()=>({columnLeftClass:"loginColumnLeft-",config:{},firedOnce:!1,fields:{email:"",password:""},recaptchaCompleted:!1,showSSOBtn:!1,showCaptcha:!1,showPassword:!1,showSuccessMessage:!1,signinError:"",submitDisabled:!0,supportEmail:"mailto:",translations:{}}),computed:{fieldsFilled:function(){return 0<this.fields.email.length&&0<this.fields.password.length}},mounted:function(){this.config=connectionModalData.configs,this.translations=connectionModalData.translations,this.columnLeftClass+=this.config.languageUsed,this.supportEmail+=this.config.onPremiumDomain?this.config.premiumSupportEmail:this.config.freeSupportEmail,this.showSSOBtn=this.config.showXSso,this.modal&&window.connectionModal?this.container=window.connectionModal?.modal?.container:this.container=document.querySelector(".container"),this.origin_item_id&&userClogTracking(currentDomain,"login-open",originPart,originUrl,this.origin_item_id,""),this.twoFactorAuthentication&&this.loginData&&this.setupTwoStepVerification(JSON.parse(this.loginData)),this.init(),this.addEvents()},watch:{},methods:{init:function(){this.container&&this.config?(this.fields.email=this.config.defaultEmail,this.fields.password=this.config.defaultPassword,this.config.showGoogleSso||this.$refs.loginUsername.focus(),this.modal&&connectionModal&&connectionModal?.modal?.container.classList.remove("updatedModal")):console.error("container & config can't be null")},addEvents:function(){window.addEventListener("message",e=>{e.origin!==window.location.origin||"discord_authorization_success"!==e.data.type||"signInModal"!==this.discordSSOActiveForm&&"signInForm"!==this.discordSSOActiveForm||(discordAuthorizationSuccess=!0,mainInterval.unsubscribe(discordChangeCallbackName),this.handleDiscordResponse(e))}),window.onGoogleLibraryLoad=e=>this.initGoogleSsoSignInPrompt(e)},toggleElementDisable:function(e,i,o){e=document.getElementById(e);o?e?.classList.contains("disabled")||e?.classList.add("disabled"):e?.classList.contains("disabled")&&e.classList.remove("disabled")},setupTwoStepVerification:function(u){let e=".default2fa";switch(u.twoStepVerificationType){case"google2fa":e=".google2fa";break;case"email":e=".email2fa"}var g=document.querySelectorAll(e),p=document.querySelector(".js-userVerificationModal");if(p){p.parentElement?.classList.contains("modal-body")&&p.parentElement.classList.add("userVerificationModal");for(let e=0;e<g.length;e++)g[e]?.classList.contains("displayNone")&&g[e].classList.remove("displayNone");p.classList.remove("displayNone");let e=p.querySelector("#userPhoneNumber"),i=p.querySelector("#userEmail"),o=p.querySelector("#enterVerificationCode"),t=p.querySelector("#btnVerifyCode"),n=p.querySelector("#verificationEnabledUsername"),s=p.querySelector("#verificationEnabledEmail"),a=p.querySelector("#verificationEnabledToken"),r=p.querySelector("#resendVerificationCode"),l=p.querySelector("#authyIdHashed"),c=p.querySelector("#authyId"),d=p.querySelector(".contactSupportMail");if(r){if(p.dataset.type=u.twoStepVerificationType||"existingLegacy",e&&(e.innerHTML=u.phoneNumber),i&&(i.innerHTML=u.email),n&&a&&(n.value=u.username,a.value=u.autoLoginParameter),s&&a&&(s.value=u.email,a.value=u.autoLoginParameter),c&&l&&(c.value=u.authyId,l.value=u.authyIdHashed),o&&t&&(o.addEventListener("input",()=>{var e=""!==o.value?"remove":"add";t.classList[e]("disabled"),r.classList[e]("disabled")}),t.addEventListener("click",e=>{e.preventDefault(),t.classList.contains("disabled")||(t.classList.add("disabled"),r.classList.add("disabled"),this.loginTwoStepVerificationSend())}),o.addEventListener("keydown",e=>{var i=e.which||e.keyCode;13===i&&(e.preventDefault(),t.classList.contains("disabled")||(t.classList.add("disabled"),r.classList.add("disabled"),this.loginTwoStepVerificationSend())),69===i&&e.preventDefault()})),d){p=encodeURIComponent("Model Program - Two-Factor Authentication Issue");let e;e="models@pornhub.com"===u.supportEmail?"?subject="+p:"",d.href="mailto:"+u.supportEmail+e}r.addEventListener("click",this._twoStepVerificationResend.bind(this))}}},_twoStepVerificationResend:function(e){e.preventDefault();let i=document.querySelector("#authyIdHashed"),o=document.querySelector("#authyId"),t=document.getElementById("enterVerificationCode"),n=document.querySelector(".twoStepVerificationMessage.verificationError"),s=o.value,a=i.value,r=document.querySelector("#modalWrapMTubes .resendCodeResponse");this.toggleElementDisable("resendVerificationCode","disabled",!0),this.toggleElementDisable("btnVerifyCode","disabled",!0),t&&""!==t.value&&(t.value=""),n&&""!==n.innerHTML&&(n.innerHTML=""),fetch(this.config.urlResendCode,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({authyId:s,authyIdHashed:a,token:this.config.token})}).then(e=>e.json()).then(e=>{r&&(r.classList.remove("displayNone"),this.toggleElementDisable("resendVerificationCode","disabled",!1),"success"!==e.status?(r.classList.add("verificationError"),r.querySelector(".resendCodeMessage").textContent=e.message):(r.classList.remove("verificationError"),r.classList.add("verificationSuccess"),r.querySelector(".resendCodeMessage").textContent=e.message,setTimeout(()=>r.classList.add("displayNone"),3e3)))}).catch(e=>this.loginFailed(e))},loginTwoStepVerificationSend:async function(){try{var e=new FormData(document.querySelector("#modalWrapMTubes .js-userVerificationModal")),i=await(await fetch(this.config.loginUrl,{method:"POST",body:e})).json(),o=document.querySelector("#modalWrapMTubes .twoStepVerificationMessage");o&&o.classList.remove("displayNone"),this.toggleElementDisable("resendVerificationCode","disabled",!1),"0"!==i.success?(o&&o.classList.contains("verificationError")&&o.classList.remove("verificationError"),o.classList.add("verificationSuccess"),o.innerHTML='<span class="greenLoader"></span>'+this.translations.loggingIn,this.callbackSuccess(i)):""!=i.message&&o?(o.classList.add("verificationError"),o.innerHTML=i.message):""==i.message&&(alert(this.translations.ajaxError),document.location.reload())}catch(e){alert(this.translations.ajaxError),document.location.reload()}},initGoogleSsoSignInPrompt:function(){if(!this.config.isSfw){let i=this;google.accounts.id.initialize({client_id:gSSOClientId,context:"signin",callback:e=>{i.loginAjax(e.credential,".loginModal form.js-loginForm",!0)},state_cookie_domain:cbDomainName,use_fedcm_for_prompt:"true",itp_support:"true"}),this.idleCallback(()=>{let i=!1,o=setInterval(()=>{var e=MG_Utils.getCookie("cookieConsent");e&&"1"!==e&&!i&&(i=!0,clearInterval(o),google.accounts.id.prompt())},300)})}},idleCallback:function(e){return(window.requestIdleCallback||(()=>setTimeout(e,400)))(e)},loginAjax:function(o="",t="",n=!1,s=""){if(!("discord"===s||0<o.length)&&this.submitDisabled)return!1;var a=(e,i,o)=>{o&&!this.firedOnce&&"undefined"!=typeof userClogTracking&&(this.firedOnce=!0,userClogTracking(currentDomain,"google-sso-login",originPart,originUrl,clickedElement,"",{source:"google"})),this.submitDisabled=!0;let t={};""!==i?(t=Object.fromEntries(new FormData(document.querySelector(i))),0<e.length&&(t.sso_token=e),o&&(t.sso_prompt=o)):t=Object.fromEntries(new FormData(this.$refs.loginForm)),"undefined"!=typeof PURCHASE_PHX&&PURCHASE_PHX.isPornhubXPurchaseFlowLogin&&(t.isPornhubXPurchaseFlowLogin=!0),("discord"===s||0<e.length)&&(t.email="",t.password=""),fetch(this.config.loginUrl,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded","Cache-Control":"no-cache"},body:new URLSearchParams(t)}).then(e=>e.json()).then(e=>{t.isPornhubXPurchaseFlowLogin&&window.pornhubXPurchase&&"0"!==e.success?(this.closeSignInBoxFunction(),window.pornhubXPurchase.resumePurchaseAfterLogin()):(e.showLiuUnderageCountDownRedirectModal&&(this.modal&&this.modal.closeModal(),"function"==typeof showUnderAgeModal&&showUnderAgeModal(),"undefined"!=typeof MGP)&&MGP.players&&"object"==typeof MGP.players&&Object.values(MGP.players).forEach(e=>{e&&"function"==typeof e.pause&&e.pause()}),this.loginAjaxSuccess(e,o,s))}).catch(e=>this.loginFailed(e))};try{let e=this.container.querySelector(".g-recaptcha"),i=!e||!e.firstChild;null!=typeof CaptachaComponents&&function(){if(i)return!0;{let e=!1;return e=document.querySelectorAll(".g-recaptcha").length?0<CaptachaComponents.getCaptchaResponse(this.getCaptchaInstanceIndex()).length:e}}()&&a(o,t,n)}catch(e){a(o,t,n)}},loginAjaxSuccess:function(e,i,o=""){e.twoStepVerification?this.modal?(this.$refs.loginForm.classList.add("displayNone"),this.setupTwoStepVerification(e)):connectionModal&&connectionModal.show({step:"2fa",loginData:e}):e.requireCaptcha?(this.showCaptcha=!0,this.signinError=e.message,this.setupCaptcha()):this.callbackSuccess(e,i,o)},callbackSuccess:function(e,o,t=""){if("0"==e.premium_redirect_cookie||e.forceRedirect){if(e.showExpiredFreeTrial)return this.premiumModalFromResponse(e);this.redirectFromResponse(e,o,t)}else{e=new Date,e=premiumRedirectCookieURL+(0<premiumRedirectCookieURL.indexOf("?")?"&":"?")+"timestamp="+e.getTime();fetch(e,{method:"GET",credentials:"include"}).then(e=>{if(e.ok)return e.json();throw new Error("Network response was not ok")}).then(e=>{var i=(o?"google-sso-":t?t+"-sso-":"")+(e.redirect?"login-successful":"login-unsuccessful");userClogTracking(currentDomain,i,originPart,originUrl,clickedElement,newModal),e.redirect?(this.showSuccessMessage=!0,this.signinError="",document.location.assign(e.redirect)):(this.signinError=e.message,this.submitDisabled=!1)}).catch(e=>{console.error("Fetch error:",e)})}},redirectFromResponse:function(e,i,o=""){i=(i?"google-sso-":o?o+"-sso-":"")+(e.redirect?"login-successful":"login-unsuccessful");userClogTracking(currentDomain,i,originPart,originUrl,clickedElement,newModal),e.redirect?(this.showSuccessMessage=!0,this.signinError="",void 0!==e.subscribe&&1==e.subscribe?document.querySelector(".subscribeButton button.login").setAttribute("data-login","0"):window.location.href=e.redirect):(this.signinError=e.message,this.submitDisabled=!1)},loginFailed:function(){document.location.reload()},initGoogleSso:function(){var t=this;google.accounts.oauth2.initTokenClient({client_id:gSSOClientId,scope:"https://www.googleapis.com/auth/userinfo.email",ux_mode:"popup",callback:e=>{var i,o;e.error?"access_denied"===e.error||"AbortError"===e.error?"undefined"!=typeof userClogTracking&&userClogTracking(currentDomain,"google-sso-login-aborted",originPart,originUrl,clickedElement,"",{source:"google",reason:e.error}):"undefined"!=typeof userClogTracking&&userClogTracking(currentDomain,"google-sso-login-unsuccessful",originPart,originUrl,clickedElement,"",{source:"google",error:e.error}):(o=[...i=[currentDomain,"google-sso-login",originPart,originUrl],clickedElement,""],"undefined"!=typeof userClogTracking&&userClogTracking(..."undefined"!=typeof originItemId&&""!==originItemId?i:o),t.loginAjax(e.access_token,"form.js-loginForm"))}}).requestAccessToken()},initXSso:function(){"undefined"!=typeof PURCHASE_PHX&&PURCHASE_PHX.isPornhubXPurchaseFlowLogin&&"function"==typeof window.postUserStateInPurchaseFlow&&postUserStateInPurchaseFlow(),"undefined"!=typeof userClogTracking&&userClogTracking(currentDomain,"x-sso-login",originPart,originUrl,clickedElement,"");var e=clickedElement||"";fetch("/sso/xprovider?origin_item_id="+e,{method:"GET",headers:{"Content-Type":"application/json"}}).then(e=>{if(e.ok)return e.json();throw new Error("Handling error")}).then(e=>{window.open(e.authorizationUrl,"_self")}).catch(e=>{console.error(JSON.stringify(e))})},initDiscordSso:function(){let i=window.open("","_blank","popup=true,width=500,height=800");this.discordSSOActiveForm=this.config.modal?"signInModal":"signInForm","undefined"!=typeof userClogTracking&&userClogTracking(currentDomain,"discord-sso-login",originPart,originUrl,clickedElement,""),fetch("/sso/discordprovider",{method:"GET",headers:{"Content-Type":"application/json"}}).then(e=>{if(e.ok)return e.json();throw new Error("Handling error")}).then(e=>{i.location=e.authorizationUrl;mainInterval.subscribe(discordChangeCallbackName,()=>{i.closed&&(mainInterval.unsubscribe(discordChangeCallbackName),discordAuthorizationSuccess||"undefined"==typeof userClogTracking||userClogTracking(currentDomain,"discord-sso-login-aborted",originPart,originUrl,clickedElement,""))})}).catch(e=>{console.error(JSON.stringify(e))})},handleDiscordResponse:function(e){let i,o;var t=document.createElement("input");t.setAttribute("type","hidden"),t.setAttribute("name","sso_discord_code"),t.setAttribute("value",e.data.code),"signInModal"===this.discordSSOActiveForm&&this.modal?(i=this.$refs.loginForm,o=["",".js-loginFormModal",!1,"discord"]):this.modal||(i=this.$refs.loginForm,o=["","",!1,"discord"]),i&&i.appendChild(t),this&&this.loginAjax(...o)},getCaptchaInstanceIndex:function(){let o=this.container.querySelector(".g-recaptcha"),t=0;return document.querySelectorAll(".g-recaptcha").length&&[].forEach.call(document.querySelectorAll(".g-recaptcha"),function(e,i){e===o&&(t=i)}),t},setupCaptcha:function(){var e=this.container.querySelector(".g-recaptcha");e&&null!=typeof CaptachaComponents&&(this.recaptchaCompleted?CaptachaComponents.resetCaptcha(this.getCaptchaInstanceIndex()):CaptachaComponents.registerComponent(e,this.captchaAcknowledgement.bind(this)))},captchaAcknowledgement:function(e){if(e)switch(e){case"verified":this.recaptchaCompleted=!0,this.submitDisabled=!1;break;case"expired":case"error":this.submitDisabled=!0;break;default:return}},toggleLogin:function(){this.showSSOBtn&&(""!==this.fields.email&&this.$refs.loginUsername.dispatchEvent(new Event("input")),""!==this.fields.password)&&this.$refs.loginPassword.dispatchEvent(new Event("input")),this.showSSOBtn=!this.showSSOBtn,this.config.isApt&&this.$emit("toggleAptContent",this.showSSOBtn)},inputFunction:function(){this.submitDisabled=!this.fieldsFilled},premiumModalFromResponse:function(){this.config.modal?.closeModal(),this.submitDisabled=!1},signupClickHandler:function(){userClogTracking(currentDomain,"signup-open",originPart,originUrl,clickedElement,newModal),this.$emit("changeStep","signUp")},getImageUrl:function(e){return e?this.config.imageBaseUrl+e+this.config.cdnCacheKey:""},closeSignInBoxFunction:function(){var e=document.getElementById("modalWrapMTubes");e&&e.style.setProperty("display","none","important")}},template:`<div>
            <form ref="loginForm" autocomplete="off" class="js-loginFormModal js-loginForm" :class="{'displayNone':twoFactorAuthentication}">
                <template v-if="!config.readonlyMaintenance">
                    <input class="js-redirect" type="hidden" name="redirect" :value="config.redirectFieldValue"/>
                    <input class="userId" type="hidden" name="user_id" value=""/>
                    <input class="intendedAction" type="hidden" name="intended_action" value=""/>
                    <input type="hidden" name="token" :value="config.token"/>
                    <input type="hidden" name="from" :value="config.fromValue"/>
                </template>

                <input v-if="subscribe" type="hidden" name="subscribe" value="1"/>
                <input v-if="shortiesInputVideoId" type="hidden" name="videoId" :value="shortiesInputVideoId"/>

                <div class="leftSide" :class="columnLeftClass">
                    <div v-if="config.showXSso" ref="ssoLogin" class="ssoSignWrap ssoLogin js-ssoContentLogin" :class="{'displayNone':!showSSOBtn}">
                        <span v-if="config.customConnectionModals && modal && !config.isApt" class="ssoSignWrap__title">{{ translations.loginWith }}</span>
                        <span class="ssoErrors js-ssoErrors displayNone"></span>
                        <span v-if="signinError && config.isSfw" ref="signinError" class="signinError textCenter">{{ signinError }}</span>
                        <div class="ssoSignBtns">
                            <button v-if="config.showGoogleSso" id="ssoGoogleSigninButton" type="button" @click="initGoogleSso">
                                <img :src="getImageUrl('google-sso-icon.svg')" :alt="translations.googleSSO">
                                <span>{{ translations.googleSSOLogin }}</span>
                            </button>

                            <button v-if="!config.isSfw" id="ssoXSigninButton" type="button" @click="initXSso">
                                <i class="ph-icon-twitterX"></i>
                                <span>{{ translations.xSSOLogin }}</span>
                            </button>

                            <button v-if="config.showDiscordSso && !config.isSfw" id="ssoDiscordSigninButton" type="button" :aria-label="translations.discordSSOLogin" @click="initDiscordSso">
                                <i class="ph-icon-discord"></i>
                            </button>
                        </div>
                        <div class="separator">
                            <span class="separatorLine"></span>
                            <span class="textChoose">{{ translations.or }}</span>
                        </div>
                        <div v-if="modal && config.showRegularForm" class="emailPassSignButton js-toggleLogin" :class="{'aptOrangeButton':config.isApt}" @click="toggleLogin">
                            {{ translations.regularFormLogin }}
                        </div>
                    </div>

                    <div ref="emailPassLogin" class="js-emailPassLogin" :class="{'emailPassSignWrap':config.showXSso || config.isSfw, 'displayNone':modal && showSSOBtn, 'formStepOne':!modal}">
                        <span v-if="signinError" ref="signinError" class="signinError textCenter">{{ signinError }}</span>
                        <span v-if="modal" id="signinLoggingin" class="textCenter" :class="{'displayNone':!showSuccessMessage}">
                            <span class="greenLoader"></span>
                            {{ translations.loggingIn }}
                        </span>
                        <div class="inputWrap">
                            <input
                                ref="loginUsername"
                                id="usernameModal"
                                :placeholder="translations.email"
                                class="js-signinUsername signup_field"
                                :class="{'signin_error':signinError}"
                                name="email"
                                maxlength="254"
                                type="text"
                                tabindex="0"
                                v-model="fields.email"
                                @keydown.prevent.enter="loginAjax"
                                @input="inputFunction"
                            >
                            <span v-if="modal" class="ph-icon-error" :class="{'displayNone':!signinError}"></span>
                        </div>

                        <div class="loginPasswordWrapper inputWrap" :class="{'signUpPasswordWrapper':!modal}">
                            <input
                                ref="loginPassword"
                                id="passwordModal"
                                :placeholder="translations.password"
                                class="js-signinPassword signup_field"
                                :class="{'signin_error':signinError}"
                                name="password"
                                :type="showPassword ? 'text' : 'password'"
                                tabindex="0"
                                v-model="fields.password"
                                @keydown.prevent.enter="loginAjax"
                                @input="inputFunction"
                            >
                            <div class="loginPasswordIconsWrapper">
                                <span ref="showPassword" data-visiblitily="passwordModal" class="passIcon icons" :class="{'ph-icon-view-on':showPassword,'ph-icon-view-off':!showPassword}" @click="showPassword = !showPassword;"></span>
                                <span v-if="modal" class="ph-icon-error" :class="{'displayNone':!signinError}"></span>
                            </div>
                        </div>

                        <div v-if="!config.withoutCaptcha" class="optional captchaLoginBlock">
                            <div class="g-recaptcha" :data-type="config.captchaType" :data-sitekey="config.captchaKey"></div>
                            <div class="clearfix"></div>
                        </div>

                        <div v-if="modal && config.showXSso && !config.readonlyMaintenance || config.isSfw" class="forgetPassWrapper">
                            <ul>
                                <li>
                                    <a id="signinForgotpassword" :href="config.forgotPasswordUrl">{{ translations.forgotPassword }}</a>
                                </li>
                                <template v-if="!config.mandatoryEmailVerification">
                                    <span class="separator">|</span>
                                    <li>
                                        <a id="signinConfirmationEmail" :href="config.resendConfirmationEmailUrl">{{ translations.resendConfirmation }}</a>
                                    </li>
                                </template>
                            </ul>
                        </div>

                        <div v-if="modal" class="backSignBtnWrap textCenter">
                            <div v-if="config.showXSso && modal" ref="toggleLoginBtns" class="js-toggleLogin backToSSOBtn" @click="toggleLogin">{{ translations.back }}</div>
                            <div ref="loginSubmit" id="signinSubmit" class="buttonClass orangeButton buttonBase js-loginSubmit" :class="{'disabled':submitDisabled}" :disabled="submitDisabled" v-html="config.showXSso ? translations.login : translations.signin" @click.prevent="loginAjax"></div>
                        </div>
                        <template v-else>
                            <input id="submit" type="submit" class="buttonBase big orangeButton light js-loginSubmit" :class="{'create_account_button_disabled disabled':submitDisabled}" :disabled="submitDisabled" :value="translations.login" @click.prevent="loginAjax">
                            <span class="loginLink">{{ translations.or }} <a :href="config.createAccountSelectUrl" onclick="signinbox.show({step:'signUp'}); return false;">{{ translations.signup }}</a></span>
                        </template>

                        <button v-if="config.showGoogleSso && !config.showXSso && !config.isSfw" class="gsi-material-button" id="ssoGoogleSigninButton" type="button" v-html="config.googleSsoButtonHtml" @click="initGoogleSso"></button>
                    </div>

                    <div v-if="config.isSfw" class="textCenter createAccount">
                        {{ translations.registrationMessage }}
                    </div> 
                    <div v-else-if="modal" class="textCenter createAccount">
                        {{ translations.noAccount }}
                        <button id="signupButtonId" @click.prevent="signupClickHandler">{{ translations.signup }}</button>
                        {{ translations.here }}
                    </div>
                    <div v-if="this.noticeUrl" class="noticeWrapper">
                        <a :href="this.noticeUrl" class="noticeLink greyButton" rel="noopener nofollow" target="_blank">{{ this.noticeText }}</a>
                        <a v-if="this.noticeLawUrl && config.isSfw" :href="this.noticeLawUrl" class="noticeLink greyButton" rel="noopener nofollow" target="_blank">{{ this.noticeLawText }}</a>
                    </div>
                    <div v-if="!modal" class="forgetPassWrapper options">
                        <ul>
                            <li>
                                <a id="signin_forgotpassword" :href="config.forgotPasswordUrl">{{ translations.forgotPassword }}</a>
                            </li>
                            <template v-if="!config.mandatoryEmailVerification">
                                <span class="separator">|</span>
                                <li>
                                    <a id="signin_confirmationemail" :href="config.resendConfirmationEmailUrl">{{ translations.resendConfirmation }}</a>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
            </form>

            <form v-if="modal" autocomplete="off" data-type class="js-userVerificationModal displayNone" :class="{'userVerificationForm':twoFactorAuthentication}">
                <h2 v-if="twoFactorAuthentication" class="mainTitle">{{ translations.twoFactorAuthentication }}</h2>
                <div class="codeContent" :class="{'onThePage':twoFactorAuthentication && !config.isMobile}">
                    <h5 class="default2fa displayNone">{{ translations.default2fa }}:</h5>
                    <h5 class="email2fa displayNone">{{ translations.email2fa }}:</h5>
                    <h5 class="google2fa displayNone">{{ translations.google2fa }}</h5>
                    <h5 class="default2fa displayNone" id="userPhoneNumber"></h5>
                    <h5 class="email2fa displayNone" id="userEmail"></h5>
                </div>

                <input type="hidden" name="email" id="verificationEnabledEmail" />
                <input type="hidden" name="token2" id="verificationEnabledToken" />
                <input type="hidden" name="verification_modal" value="1" />
                <input type="hidden" name="authyId" id="authyId" />
                <input type="hidden" name="authyIdHashed" id="authyIdHashed" />
                <input type="hidden" name="token" id="xsrfToken" :value="config.token" />

                <label for="enterVerificationCode">{{ translations.code2fa }}</label>
                <input type="number" name="verification_code" id="enterVerificationCode" class="enterVerificationCode" />
                <p class="twoStepVerificationMessage displayNone"></p>
                <button id="btnVerifyCode" class="orangeButton big buttonBase disabled removeAdLink">
                    {{ translations.verify2fa }}
                </button>

                <div class="resendCodeResponse displayNone">
                    <div class="resendCodeStatus"></div>
                    <div class="resendCodeMessage"></div>
                </div>

                <div class="codeResend default2fa email2fa displayNone">
                    <span>{{ translations.noCodeReceived }}</span> <a href="#" id="resendVerificationCode" class="orangeText removeAdLink">{{ translations.resend }}</a>
                </div>
                <div class="contactSupport">
                    <span>{{ translations.needHelp }}</span> <a :href="supportEmail" class="orangeText contactSupportMail">{{ translations.contactSupport }}</a>
                </div>
            </form>
        </div>`});