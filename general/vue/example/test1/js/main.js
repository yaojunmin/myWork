var app = new Vue({
    el: '#app',
    data:{
        message: 'hello vue!'
    }
});
//补充：v-once 执行一次性地插值，当数据改变时，插值处的内容不会更新。注意：这会影响到该节点上所有的数据绑定；
//当组件中包含大量静态内容时，可以考虑使用 v-once 将渲染结果缓存起来；

var app2 = new Vue({
    el: '#app-2',
    data: {
        message: '页面加载于' + new Date(),
        style: 'background: red;',
        isDisabled: true
    }
});
//v-bind 将节点属性和data下的属性绑定
//如果是布尔值的属性，为false的话则该属性会被移除

var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true,
        isShow: false
    }
});
//v-if 控制节点的显示；组件销毁和重建；
//v-show 是简单地切换元素的css属性；组件总是会被渲染，只是简单地基于css进行切换；
//一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。

var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            { text: '学习 javascript' },
            { text: '学习 vue' },
            { text: '整个牛项目' }
        ]
    }
});
//v-for 渲染一个项目列表，通过绑定数组的数据
//v-for 还支持一个可选的第二个参数为当前项的索引：v-for="(item, index) in items"
//------ 以上为数组迭代--------
//对象迭代：v-for="(value, key, index) in object"
//整数迭代：v-for="n in 10"
//如果 v-for 和 v-if 处于同一节点，v-for 的优先级高（即先执行v-for）

var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'hello vue.js!'
    },
    methods: {//在'methods'对象中定义方法;最好的方式，只有纯粹的数据逻辑，而不是去处理DOM事件细节
        reverseMessage: function(){
            this.message = this.message.split('').reverse().join('');
        }
    }
});
//v-on 绑定一个事件监听器(监听什么事件则在html中写了)，通过它调用我们vue实例中定义的方法
//内联处理器方法： v-on:click="say('h1')" ;这样子就可以传参了;
//$event 特殊变量可以访问原生DOM事件：$event.preventDefault();
//事件修饰符：通过由点(.)表示的指令后缀来调用修饰符；.stop，阻止冒泡；.prevent，阻止默认事件；.capture，使用事件捕获模式（默认冒泡）；.selef，事件在当前元素本身时触发；.once，事件触发一次；
/*app5.$watch('message', function(newVal, oldVal){
    console.log(this.message);
    //this 就是 app5 Vue的实例
});*/

var app6 = new Vue({
    el: '#app-6',
    data: {
        message: 'hello vue!'
    }
});
//v-model 实现表单输入和应该状态之间的双向绑定
//.key 是识别节点的一个通用机制 v-bind:key="id"
/* 修饰符
*  .lazy,在change事件中同步（默认input事件触发）<input v-model.lazy="msg">
*  .number 自动将用户的输入值转为Number类型（如果原值的转换结果为NaN则返回原值） v-model.number="age" type="number"
*  .trim 自动过滤用户输入的首尾空格 v-model.trim="msg"
* */

Vue.component('todo-item', {//注册 这里是全局注册
    props: ['todo'],
    template: '<li>{{ todo.text}}</li>'
});
var app7 = new Vue({//创建根实例
    el: '#app-7',
    data: {
        groceryList: [
            { text: '蔬菜' },
            { text: '奶酪' },
            { text: '随便其他什么人吃的东西' }
        ]
    }
});
//组件 props 对应html中的 节点属性
//组件得放在实例之前，为了可以识别粗来。
//is属性 解决某些情况下自定义组件无效的情况：<tr is="my-row"></tr>
var app7_1 = new Vue({
   el: '#app-7-1',
    data: {
        groceryList: [
            { text: '蔬菜' },
            { text: '奶酪' },
            { text: '随便其他什么人吃的东西' }
        ]
    },
    components: {
       'my-component': {//局部注册 <my-component>将只在父模板可用
           props: ['todo'],//属性名定义 短横线隔开式命名：kebab-case
           template: '<li>{{ todo.text + " counter:" + counter}}</li>',
           data: function(){//data 必须是一个函数
                return {//每个组件实例的counter都不是同一个对象
                    counter: 0
                }
           }
       }
    }
});

var app8 = new Vue({
    el: '#app-8',
    data:{
        rawHtml: "<h1>这是html插值</h1>" +
                  "<p>我是<strong>html</strong>插值</p>"
    }
});
//v-html 输出真正的html


var watchExampleVM = new Vue({
    el: '#watch-example',
    data: {
        question: '',
        answer: 'I cannot give you an answer until you ask a question!'
    },
    watch: {
        // 如果 question 发生改变，这个函数就会运行
        question: function (newQuestion) {
            this.answer = 'Waiting for you to stop typing...'
            this.getAnswer()
        }
    },
    computed: {//计算属性
        // _.debounce 是一个通过 lodash 限制操作频率的函数。
        // 在这个例子中，我们希望限制访问yesno.wtf/api的频率
        // ajax请求直到用户输入完毕才会发出
        // 学习更多关于 _.debounce function (and its cousin
        // _.throttle), 参考: https://lodash.com/docs#debounce
        getAnswer: _.debounce(
            function () {
                var vm = this
                if (this.question.indexOf('?') === -1) {
                    vm.answer = 'Questions usually contain a question mark. ;-)'
                    return
                }
                vm.answer = 'Thinking...'
                axios.get('https://yesno.wtf/api')
                    .then(function (response) {
                        vm.answer = _.capitalize(response.data.answer)
                    })
                    .catch(function (error) {
                        vm.answer = 'Error! Could not reach the API. ' + error
                    })
            },
            // 这是我们为用户停止输入等待的毫秒数
            500
        )
    }
})


//子组件监听
Vue.component('button-counter', {
    template: '<button v-on:click="increment">{{ counter }}</button>',
    data: function(){
        return {
            counter: 0
        }
    },
    methods: {
        increment: function(){
            this.counter += 1;
            this.$emit('increment');//触发事件
        }
    }
});
new Vue({
    el: '#counter-event-example',
    data: {
        total: 0
    },
    methods: {
        incrementTotal: function(){
            this.total += 1;
        }
    }
});
//子组件绑定了点击事件和自定义事件；
//流程：子组件触发点击事件，去触发自定义"increment"事件，从而触发父组件的incrementTotal方法；
//$on(eventName)监听事件；$emit(eventName)触发事件；
//.native，可以给组件绑定原生事件；v-on:click.native="doTheThing"；————尝试的结果，无效！！！


/*
* 编写可复用组件
* 1、props 允许外部环境传递数据给组件
* 2、events 允许从外部环境在组件内触发副作用
* 3、slots 允许外部环境奖额外的内容组合在组件中
* */





















