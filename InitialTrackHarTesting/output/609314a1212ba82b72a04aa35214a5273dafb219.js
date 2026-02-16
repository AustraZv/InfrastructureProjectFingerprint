var likedVideosSignUpFlag=!1,loadGSSOLibrary=!0,discordChangeCallbackName="discord_popupChanged";let discordAuthorizationSuccess=!1;var connectionModal={modal:null,config:TOP_BODY,show:(n={})=>{if("undefined"!=typeof event&&event.preventDefault(),navigator.userAgent?.match(/PLAYSTATION/))document.location.assign("http://"+location.hostname+"/login");else if(!connectionModal.modal||"function"!=typeof connectionModal.modal.isOpen||!connectionModal.modal.isOpen()){connectionModal.modal&&"function"==typeof connectionModal.modal.closeModal&&(connectionModal.modal.closeModal(),connectionModal.modal=null,"undefined"!=typeof PURCHASE_PHX)&&PURCHASE_PHX.isPornhubXPurchaseFlowLogin&&(PURCHASE_PHX.isPornhubXPurchaseFlowLogin=!1);var s=document.getElementById("rightMenu"),i=!!s&&s.querySelector(".closeHamMenu"),s=(s&&s.classList.contains("active")&&i&&i.click(),n.hasOwnProperty("step")||(n.step="signIn"),`<v-connection-modal class="signInModalWrapper newModalWrapper"
                options-raw=${JSON.stringify(n)}
            ></v-connection-modal>`);let o="";i={};n.isApt?(o="sfwMode signInAndApt",Object.assign(i,{closeButton:n.config.closeButton??!1,closeDocument:!1,isApt:!0})):"2fa"===n.step?o+="twoFA ":o+=connectionModalData.configs.customConnectionModals?"customModals ":"",connectionModal.modal=new MG_Modal({content:s,className:"loginModal connectionsModal "+o,...i,afterunload:connectionModal.closeModalCallback}),connectionModal.modal.openModal()}},closeModalCallback:(o,n)=>{likedVideosSignUpFlag=!1,"undefined"!=typeof PURCHASE_PHX&&PURCHASE_PHX.isPornhubXPurchaseFlowLogin&&(PURCHASE_PHX.isPornhubXPurchaseFlowLogin=!1)}},signinbox=connectionModal;(()=>{if((async()=>{var o=["v-connection-head","v-login-form","v-create-account-form"].map(o=>customElements.whenDefined(o));Vue.customElement("v-connection-head",{props:{step:{type:String,default:""},twoFactorAuthentication:{type:Boolean,default:!1},logoRaw:{type:String,default:""},head:{type:String,default:""},isApt:{type:Boolean,default:!1}},data:()=>({configs:{},options:{},translations:{}}),computed:{logo:function(){return this.logoRaw?JSON.parse(this.logoRaw):{}},content(){return this.head?connectionModalData.customModalHeads[this.head]:null}},mounted:function(){this.configs=connectionModalData.configs,this.translations=connectionModalData.translations},watch:{},methods:{getImageUrl:function(o){return o?this.configs.imageBaseUrl+o+this.configs.cdnCacheKey:""}},template:`
                <div v-if="configs.customConnectionModals && content" class="customModalHead">
                    <img v-if="configs.onPremiumDomain" class="customModalHead__logo" :src="getImageUrl('pornhub_logo_premium.svg')" :alt="translations.pornhubPremiumLogo"/>
                    <img v-else class="customModalHead__logo" :src="getImageUrl('pornhub_logo_straight.svg')" :alt="translations.pornhubLogo"/>

                    <img class="customModalHead__img" :src="getImageUrl(content.imgSrc)" :alt="translations.pornhubPremiumLogo"/>

                    <span class="customModalHead__title" v-html="content.title"></span>
                </div>
                <div v-else-if="step === 'signIn' && !twoFactorAuthentication" class="mainModalTitle" :class="{'signInTitle': configs.isSfw || isApt}">
                    <noscript>
                        <br>{{ translations.noJsError }}<br><br>
                    </noscript>
                    <span class="logoWrapper">
                        <img v-if="logo" class="logo" :src="logo.src" :alt="logo.label"/>
                        <i v-if="isApt || configs.isSfw" :class="['roundFlagIcon', 'round-flag-gb', {'premium': configs.onPremiumDomain}]"></i>
                    </span>
                    <div v-if="configs.dateAdded" class="signinError">
                        <p class="signinError">{{ translations.maintenanceError }}</p>
                    </div>
                    <span v-else :class="'loginAccessTitle-' + configs.languageUsed">
                        {{ configs.showXSso || configs.isSfw ? translations.memberLogin : translations.memberSignin }}
                        <span class="subtitle">{{ translations.accessPHAccount }}</span>
                    </span>
                </div>
                <div v-else-if="step === 'signUp'" class="signUpLeftWrapper" :class="[configs.segment, configs.region, {'mobile':configs.isMobile, 'pc':!configs.isMobile}]">
                    <div v-if="!configs.customConnectionModals && !configs.isMobile" class="pillsWrapper">
                        <div>
                            <p><span class="pillsValue">140M</span><span class="pillsAction">{{ translations.engaged }}</span><span>{{ translations.dailyUsers }}</span></p>
                        </div>
                        <div>
                            <p><span class="pillsValue">600k</span><span class="pillsAction">{{ translations.active }}</span><span>{{ translations.contentCreators }}</span></p>
                        </div>
                        <div>
                            <p><span class="pillsValue">1M</span><span class="pillsAction">{{ translations.hours }}</span><span>{{ translations.ofFreeContent }}</span></p>
                        </div>
                    </div>
                    <div class="mainModalTitleMobile">
                        <img v-if="logo" class="logo" :src="logo.src" :alt="logo.label"/>

                        <span>{{ configs.onPremiumDomain ? translations.signup : translations.signupForFree }}</span>
                    </div>
                </div>
                `}),await Promise.all(o),Vue.customElement("v-connection-modal",{props:{optionsRaw:{type:String}},data:()=>({configs:{},options:{},translations:{},signupSteps:[],signinSteps:[],showAptContent:!1}),mounted:function(){this.configs=connectionModalData.configs,this.options=JSON.parse(this.optionsRaw),this.translations=connectionModalData.translations,likedVideosSignUpFlag="signUpVideoLikedWatchPage"===this.options.step,this.configs.showXSso&&connectionModal.modal.container.classList.add("centered"),this.signupSteps=["signUp","signUpLikedVideo","signUpVideoLikedWatchPage"],this.signinSteps=["signIn","2fa",""],"undefined"!=typeof showGoogleSso&&showGoogleSso&&loadGSSOLibrary&&this.initGoogleSSO(),this.options.isApt&&(this.showAptContent=!0),this.addEvents()},computed:{parsedStep:function(){let o="";return o=this.signupSteps.includes(this.options.step)?"signUp":this.signinSteps.includes(this.options.step)?"signIn":this.options.step},logo:function(){var o={};return this.configs.onPremiumDomain?(o.src=this.getImageUrl("pornhub_logo_premium.svg"),o.label=this.translations.pornhubPremiumLogo):("gay"===this.configs.segment&&this.signupSteps.includes(this.options.step)?o.src=this.getImageUrl("logos/pornhub_gay_white_color_2x.png"):o.src=this.configs.customConnectionModals||this.signinSteps.includes(this.options.step)?this.getImageUrl("pornhub_logo_straight.svg"):this.getImageUrl("pornhub_logo_straight.png"),o.label=this.translations.pornhubLogo),o}},methods:{addEvents:function(){var o=document.getElementById("mobileContainer");this.container&&this.container.parentElement&&this.container.parentElement.addEventListener(o?"touchstart":"mousedown",this._modalClickHandler)},initGoogleSSO:function(){loadGSSOLibrary=!1;var o=document.getElementsByTagName("head")[0],n=document.createElement("script");n.type="text/javascript",n.src="https://accounts.google.com/gsi/client",o.appendChild(n)},_modalClickHandler:function(o){var o=o.target,n="signUp"===this.options.step?"signup-aborted":"login-aborted";!o||"signup-aborted"!=n&&"login-aborted"!=n||("modalWrapMTubes"===o.getAttribute("id")?(userClogTracking(currentDomain,n,originPart,originUrl,"undefined"!=typeof CLIPS_DATA&&!0===CLIPS_DATA.clipsSignUpTriggered?"clips":"outside_modal_window",newModal),"undefined"!=typeof CLIPS_DATA&&(CLIPS_DATA.clipsSignUpTriggered=void 0)):o.classList.contains("closeMTubes")&&("undefined"!=typeof USER_LOGIN_SHORTIES&&!1===USER_LOGIN_SHORTIES?userClogTracking(currentDomain,n,originPart,originUrl,clickedElement,newModal):(userClogTracking(currentDomain,n,originPart,originUrl,"undefined"!=typeof CLIPS_DATA&&!0===CLIPS_DATA.clipsSignUpTriggered?"clips":"button-close-x",newModal),"undefined"!=typeof CLIPS_DATA&&(CLIPS_DATA.clipsSignUpTriggered=void 0))))},changeStepHandler:function(o){"signUpVideoLikedWatchPage"===o.detail[0]&&(likedVideosSignUpFlag=!0),this.configs.isApt&&(this.showAptContent=!0),this.options.step=o.detail[0]},getImageUrl:function(o){return o?this.configs.imageBaseUrl+o+this.configs.cdnCacheKey:""},toggleAptContent:function(o){this.configs.isMobile&&(this.showAptContent=o.detail[0])}},template:`<div class="js-signUpFormModal signInModalWrapper" :class="{'newModalWrapper':configs.newSignUpModal}">
                    <div :class="{'signInWrap': signinSteps.includes(options.step), 'signUpWrap clearfix': signupSteps.includes(options.step), 'mobileWrap': configs.customConnectionModals || configs.isMobile, 'ssoWrapper': signupSteps.includes(options.step) && configs.showXSso, 'newModal':!options.isApt}">
                        <v-connection-head v-if="!options.isApt || signinSteps.includes(options.step)" :step="parsedStep" :two-factor-authentication="options.step === '2fa' ? true : false" :logo-raw="JSON.stringify(logo)" :head="options.head" :is-apt="options.isApt"></v-connection-head>

                        <div v-if="!configs.xhrRequest && signinSteps.includes(options.step)" class="modal-body clearfix" :class="{'ssoModalBody':configs.showXSso}">
                            <v-login-form
                                @changeStep="changeStepHandler"
                                @toggleAptContent="toggleAptContent"
                                :x-sso-button-html='configs.xSsoButtonHtml'
                                modal="true"
                                :two-factor-authentication="options.step === '2fa' ? true : false"
                                :login-data="options?.loginData ? JSON.stringify(options.loginData) : ''"
                                :notice-url="translations.noticeToUsersUrl"
                                :notice-text="translations.noticeToUsersLabel"
                                :notice-law-url="configs.isSfw ? translations.noticeToLawUrl : ''"
                                :notice-law-text="configs.isSfw ? translations.noticeToLaw : ''"
                            ></v-login-form>
                        </div>

                        <template v-if="signupSteps.includes(options.step)">
                            <div v-if="options.isApt || !configs.customConnectionModals" class="signUpRightWrapper">
                                <div v-if="options.isApt" class="mainModalTitleMobile signUpTitle">
                                    <span class="logoWrapper">
                                        <img v-if="logo" class="logo" :src="logo.src" :alt="logo.label"/>

                                        <i :class="['roundFlagIcon', 'round-flag-gb', {'premium': configs.onPremiumDomain}]"></i>
                                    </span>

                                    <span class="headerWrapper">{{ configs.onPremiumDomain ? translations.signup : translations.signupForFreeVerify }}</span>
                                </div>

                                <template v-else>
                                    <div class="signUpTitle" :class="{'mainModalTitleMobile':configs.isMobile, 'mainModalTitle':!configs.isMobile}">
                                        <img v-if="configs.onPremiumDomain" class="logo" :src="getImageUrl('pornhub_logo_premium.svg')" :alt="translations.pornhubPremiumLogo"/>
                                        <img v-if="!configs.onPremiumDomain && logo" class="logo" :src="logo.src" :alt="logo.label"/>

                                        <span>{{ configs.onPremiumDomain ? translations.signup : translations.signupForFree }}<span class="subtitle">{{ translations.enhanceExperience }}</span></span>
                                    </div>
                                    <div class="signUpBenefitsWrapper" :class="{'displayNone':configs.showXSso}">
                                        <ul>
                                            <li>
                                                <img :src="getImageUrl('signup_playlists.svg')" :alt="translations.playlists">
                                                <p>{{ translations.createOwnPlaylist }}</p>
                                            </li>
                                            <li>
                                                <img :src="getImageUrl('signup_community.svg')" :alt="translations.community">
                                                <p>{{ translations.engageWithCommunity }}</p>
                                            </li>
                                            <li>
                                                <img :src="getImageUrl('signup_tailored.svg')" :alt="translations.tailored">
                                                <p>{{ translations.tailoredVideoSuggestions }}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </template>

                                <div class="modal-body clearfix">
                                    <v-create-account-form
                                        @changeStep="changeStepHandler"
                                        @toggleAptContent="toggleAptContent"
                                        :token="configs.token"
                                        :email-default="configs.defaultEmail"
                                        :password-default="configs.defaultPassword"
                                        :show-captcha="configs.showCaptcha"
                                        :recaptcha-key="configs.captchaKey"
                                        :email-error="translations.emailError"
                                        :password-error="translations.passwordError"
                                        :gcaptcha-error="translations.gcaptchaError"
                                        :post-messages="configs.postMessages"
                                        :is-mandatory-email-verification="configs.mandatoryEmailVerification"
                                        :show-google-sso="configs.showGoogleSso"
                                        :google-sso-button-html='configs.googleSsoButtonHtml'
                                        :show-all-sso='configs.showXSso === "1" ? true : false'
                                        :x-sso-button-html='configs.xSsoButtonHtml'
                                        :translation="JSON.stringify(translations)"
                                        :dataPageAction="configs.dataPageAction"
                                        :modal="true"
                                        :step="options.step"
                                        :simplified-signup="configs.simplifiedSignup"
                                        :notice-url="translations.noticeToUsersUrl"
                                        :notice-text="translations.noticeToUsersLabel"
                                        :notice-law-url="translations.noticeToLawUrl"
                                        :notice-law-text="translations.noticeToLaw"
                                        :username-default="!configs.simplifiedSignup ? configs.defaultUsername : ''"
                                        :username-error="!configs.simplifiedSignup ? translations.usernameError : ''"
                                        :compare-error="!configs.simplifiedSignup ? translations.compareError : ''"
                                    ></v-create-account-form>
                                </div>
                            </div>

                            <div v-else-if="configs.customConnectionModals" class="modal-body clearfix">
                                <v-create-account-form
                                    @changeStep="changeStepHandler"
                                    @toggleAptContent="toggleAptContent"
                                    :token="configs.token"
                                    :email-default="configs.defaultEmail"
                                    :password-default="configs.defaultPassword"
                                    :show-captcha="configs.showCaptcha"
                                    :recaptcha-key="configs.captchaKey"
                                    :email-error="translations.emailError"
                                    :password-error="translations.passwordError"
                                    :gcaptcha-error="translations.gcaptchaError"
                                    :post-messages="configs.postMessages"
                                    :is-mandatory-email-verification="configs.mandatoryEmailVerification"
                                    :show-google-sso="configs.showGoogleSso"
                                    :google-sso-button-html='configs.googleSsoButtonHtml'
                                    :show-all-sso='configs.showXSso === "1" ? true : false'
                                    :x-sso-button-html='configs.xSsoButtonHtml'
                                    :translation="JSON.stringify(translations)"
                                    :dataPageAction="configs.dataPageAction"
                                    :modal="true"
                                    :step="options.step"
                                    :simplified-signup="configs.simplifiedSignup"
                                    :username-default="!configs.simplifiedSignup ? configs.defaultUsername : ''"
                                    :username-error="!configs.simplifiedSignup ? translations.usernameError : ''"
                                    :compare-error="!configs.simplifiedSignup ? translations.compareError : ''"
                                    custom-connection-modals="true"
                                ></v-create-account-form>
                            </div>
                        </template>
                    </div>

                    <div v-if="showAptContent || configs.isSfw" class="bodyText">
                        <p class="footer-notice" v-html="translations.aptFooterText"></p>
                        <div v-if="!configs.isSfw" class="rtaDisclaimerWrapper">
                            <a href="https://www.rtalabel.org" target="_blank" rel="noopener nofollow">
                                <div class="rta">
                                    <img :src="getImageUrl('rta-logo-transparent.png')" :alt="translations.rtaLogo">
                                </div>
                            </a>
                        </div>
                        <ul v-if="!configs.isSfw" class="legalLinks">
                            <li><a :href="translations.termsUrl">{{ translations.termsLabel }}</a></li>
                            <li><a :href="translations.privacyUrl">{{ translations.privacyLabel }}</a></li>
                            <li><a :href="translations.dmcaUrl">{{ translations.dmcaLabel }}</a></li>
                            <li><a :href="translations.dmcaFormUrl">{{ translations.dmcaFormLabel }}</a></li>
                            <li v-if="configs.isForEudsa"><a :href="translations.eudsaUrl">EU DSA</a></li>
                            <li><a :href="translations.supportUrl">{{ translations.supportLabel }}</a></li>
                            <li><a :href="translations.btn2257Url">2257</a></li>
                            <li><a :href="translations.contentRemovalUrl">{{ translations.contentRemovalLabel }}</a></li>
                            <li><a :href="translations.csamUrl" target="_blank" rel="nofollow">{{ translations.csamLabel }}</a></li>
                            <li><a :href="translations.nccUrl" target="_blank" rel="nofollow">{{ translations.nccLabel }}</a></li>
                            <li><a href="https://help.pornhub.com/hc/en-us" target="_blank" rel="nofollow">{{ translations.helpCenter }}</a></li>
                            <li><a href="https://help.pornhub.com/hc/en-us/categories/4419836212499" target="_blank" rel="nofollow">{{ translations.trustAndSafety }}</a></li>
                        </ul>
                    </div>
                </div>`})})(),"complete"===document.readyState||"interactive"===document.readyState){document.location.search.match(/showSigninBox=true/i)&&null!=document.getElementById("headerLoginLink")&&connectionModal.show(),document.addEventListener("click",function(){document.querySelector(".isOpenMTubes")||(likedVideosSignUpFlag=!1)});let o=document.getElementById("headerLoginLink"),s=document.querySelector(".profileOptions");var n;o&&o.addEventListener("click",function(){s&&(s.classList.contains("show")?s.classList.remove("show"):(s.classList.add("show"),userClogTracking(currentDomain,"user-menu",originPart,originUrl,"user-menu-icon",newModal),updateClogTracking("user-menu-icon")))}),document.addEventListener("click",function(o){var n=o.target;o&&n&&"headerLoginLink"!==n.id&&!n.classList.contains("selectMenu")&&s&&s.classList.remove("show"),(n.classList.contains("closeMTubes")||n.classList.contains("isVisibleMTubes"))&&"undefined"!=typeof sessionStorage&&null!==sessionStorage.getItem("notLoggedIn")&&sessionStorage.removeItem("notLoggedIn")}),"undefined"!=typeof openSigninModal&&"undefined"!=typeof signinModalMessage&&openSigninModal&&(connectionModal.show({step:"signIn"}),n=connectionModal.container.querySelector(".signinError"))&&(n.style.display="block",n.innerHTML=signinModalMessage??"")}})();