<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>

		</view>

		<view>
			<button @click="navigateToPage">跳转</button>

			<!-- #ifdef WEB -->
			<button @click="weblogin">1.微信公众号网页登录取openid-snsapi_base</button>
			<button @click="weblogin_userinfo">1.1.微信公众号网页登录取openid-snsapi_userinfo</button>
			<button @click="weblogin2">2.通过code换取网页授权access_token</button>
			<button @click="weblogin3">3.拉取用户信息(需要上一步的Access_token和openid)</button>
			<!-- #endif -->
		</view>
		<view style="word-break: break-all;">{{res}}</view>
		<view>
			{{openid}}

		</view>
		<view>
			{{unionid}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				appid: 'wx3306e665383896f2', //公众平台测试号
				appsecret: '8dafe865cf3751c779f45a5f0b91547b',
				title: '',
				openid: '',
				unionid: '',
				code: '',
				res: '',
				access_token: '',
			}
		},
		onLoad() {
			const code = this.getUrlCode('code');
			console.log("code:", code);
			if (code) {
				this.code = code;
				this.res = "取到的CODE:" + code;
			}
		},
		methods: {
			navigateToPage() {
				uni.navigateTo({
					url:"/pages/inquirySheet/index"
				})
			}, 
			//网页的取openid
			weblogin: function() {
				// #ifdef H5

				var url = encodeURIComponent("http://wxweb.niunan.net/index.html");

				// 获取code 
				window.location.href =
					`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=${url}&response_type=code&scope=snsapi_base#wechat_redirect`

				// #endif
			},
			weblogin_userinfo: function() {
				// #ifdef H5

				var url = encodeURIComponent("http://wxweb.niunan.net/index.html");

				// 获取code 
				window.location.href =
					`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo#wechat_redirect`

				// #endif
			},
			weblogin2: function() {
				var that = this;
				if (this.code == '') {
					this.res = "请先通过第一步取得code";
				} else {
					//    var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+this.appid+'&secret='+this.appsecret+'&code='+this.code+'&grant_type=authorization_code';
					//这里应该是到后端来获取上面那个url的内容再返回的，里面就有openid了
					//    location.href = url;
					var url = "http://wxweb.niunan.net/api/wx/getopenid?code=" + this.code;
					uni.request({
						url: url,
						method: 'GET',
						success: (res) => {
							if (res.statusCode == 200) {
								that.res = JSON.stringify(res.data);
								that.openid = res.data.data.openid;
								that.access_token = res.data.data.access_token;
							}
						}
					})
				}
			},
			weblogin3: function() {
				var that = this;
				if (that.openid == '' && that.access_token == '') {
					that.res = "openid或者access_token为空";
				} else {
					var url = "http://wxweb.niunan.net/api/wx/getuserinfo?openid=" + that.openid + "&access_token=" +
						that
						.access_token;
					uni.request({
						url: url,
						method: 'GET',
						success: (res) => {
							if (res.statusCode == 200) {
								that.res = JSON.stringify(res.data);
							}
						}
					})
				}
			},
			// 截取code
			getUrlCode(name) {
				return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) ||
				[,
					''
				])[1].replace(/\+/g, '%20')) || null
			},

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>