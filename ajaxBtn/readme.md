### 基于`element-ui`按钮的封装处理

#### 描述
* 利用了`async` `await`特性
* 对有请求行为的按钮的进行统一的`loading` `disabled`处理
* 包含请求的方法在处理业务相关参数判断的时候，需要提前判断并且`return`
* 目前除了`click`参数外，其它参数均和`element-ui`的`button`一样

#### 代码
```
<template>
  <el-button :type="type"
    :size="size"
    :disabled="btnDisabled"
    :loading="ajaxing"
    :plain="plain"
    :round="round"
    :circle="circle"
    :icon="icon"
    :autofocus="autofocus"
    :native-type="nativeType"
    @click="clickHandle"
  >
    <slot/>
  </el-button>
</template>
<script>
  export default {
    props: {
      // 点击执行的方法 必传
      click: {
        type: Function,
        default: null,
        required: true
      },
      // 尺寸 medium / small / mini
      size: {
        type: String,
        default: 'mini'
      },
      // 类型 primary / success / warning / danger / info / text
      type: {
        type: String
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否朴素按钮 默认false
      plain: {
        type: Boolean,
        default: false
      },
      // 是否圆角按钮
      round: {
        type: Boolean,
        default: false
      },
      // 是否圆形按钮
      circle: {
        type: Boolean,
        default: false
      },
      // 图标类名
      icon: {
        type: String,
        default: null
      },
      // 是否默认聚焦
      autofocus: {
        type: Boolean,
        default: false
      },
      // 原生 type 属性 button / submit / reset 默认button
      nativeType: {
        type: String,
        default: 'button'
      }
    },
    data() {
      return {
        ajaxing: false
      }
    },
    methods: {
      async clickHandle() {
        this.ajaxing = true
        try {
          const res = await this.click()
          this.ajaxing = false
        } catch (error) {
          this.ajaxing = false
        }
      }
    },
    computed: {
      btnDisabled() {
        return this.ajaxing || this.disabled
      }
    }
  }
</script>
```

#### 参数介绍

| 参数 | 是否必传 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- | --- |
| click | 是 | 点击按钮触发的事件 | Function | - | -
| size | 否 | 尺寸 | String | medium / small / mini | mini |
| type | 否 | 类型 | String | primary / success / warning / danger / info / text |
| disabled | 否 | 是否禁用状态 | Boolean | true / false | false
| icon | 否 | 图标类名 | String | - | - |
| plain | 否 | 是否朴素按钮 | Boolean | true / false | false
| round | 否 | 是否圆角按钮 | Boolean | true / false | false
| circle | 否 | 是否圆形按钮 | Boolean | true / false | false
| autofocus | 否 | 是否默认聚焦 | Boolean | true / false | false
| nativeType | 否 | 原生 type 属性 | String | button / submit / reset | buton



#### 调用例子
```
<template>
  <AjaxBtn type="success" :click="submitHandel">
  	提交
  </AjaxBtn>
  // 需要传参的话 利用bind
  <AjaxBtn type="success"
    :click="reviewHandle.bind(this, 0)">通过
  </AjaxBtn>
  <AjaxBtn type="warning"
    :click="reviewHandle.bind(this, 1)">退回
  </AjaxBtn>
  <AjaxBtn type="info"
    :click="reviewHandle.bind(this, 2)">拒绝
   </AjaxBtn>
</template>

<script>
  import AjaxBtn from '@/components/ajaxBtn'
  import submitApi '@/api/xxx'
  export default {
  	components: {
  	  AjaxBtn
  	},
  	methods: {
  	  async submitHandel() {
		 // 业务逻辑判断
		 if (xxx) {
		   return
		 }
		 // 通过判断后
		 const res = await submitApi()
		 // 后台有数据返回 进行处理
		 cosnole.log(res)
  	  },
  	  async reviewHandle(type) {
		 // 业务逻辑判断
		 if (xxx) {
		   return
		 }
		 // 通过判断后
		 const res = await submitApi(type)
		 // 后台有数据返回 进行处理
		 cosnole.log(res)
  	  }
  	}
  }
</script>
```

#### 强调
* 必须使用`async` `await` 来写点击事件的方法
* 是`:click="xxx"` 不是 `@click`，不要写`@click`
* 不要使用 `if (xxx) { submitApi() }`
* 必须将错误判断置前

