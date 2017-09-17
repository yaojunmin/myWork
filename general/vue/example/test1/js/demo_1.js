//深入响应式原理
Vue.component('example', {
    template: '<span v-on:click="updateMessage">{{message}}</span>',
    data: function(){
        return {
            message: '没有更新'
        }
    },
    methods: {
        updateMessage: function(){
            this.message = "更新完成";
            console.log(this.$el.textContent);
            this.$nextTick(function(){                  //该函数表示更新DOM完成后立即执行
                console.log(this.$el.textContent);
            })
        }
    },
    updated: function(){                                //DOM更新完成后执行，优先于$nextTick()方法
        console.log(1);
    }
});
var vm = new Vue({
   el: '#example'
});

//过度效果
new Vue({
    el: '#demo',
    data: {
        show: true
    }
});


//自定义指令
//注册一个全局自定义指令 v-focus
Vue.directive('focus', {
    //当绑定元素插入到 DOM 中。
    inserted: function(el){
        //聚焦元素
        el.focus();
    }
});
/*注册局部指令，组件中接受一个 directives 的选项：
 directives: {
    focus: {
        //指令的定义
    }
 }
* */
/*指令定义函数的钩子函数
* bind：只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作
* inserted：被绑定元素插入父节点时调用(父节点存在即可调用，不必存在于document中)
* update：被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新
* componentUpdated：被绑定元素所在模板完成一次更新周期时调用
* unbind：只调用一次，指令与元素解绑时调用
* */
/*钩子函数参数
* el：指令所绑定的元素，可以用来直接操作DOM
* binding：包含以下属性：
*       name：指令名，不包括 v- 前缀
*       value：指令的绑定值，例如：v-my-directive='1+1',value的值是2
*       oldValue：指令绑定的前一个值，仅在update和componentUpdated钩子中可用。无论值是否改变都可用
*       expression：绑定值的字符串形式。例如v-my-directive='1+1',expression的值是'1+1'
*       arg：传给指令的参数。例如v-my-directive:foo,arg的值是'foo'
*       modifiers：一个包含修饰符的对象。例如v-my-directive.foo.bar，修饰符对象modifiers的值是{foo:true, bar:true}
* vnode：Vue编译生成的虚拟节点
* oldVnode：上一个虚拟节点，仅在update和componentUpdated钩子中可用
* 注意：除了el之外，其他参数都应该只读的，尽量不要修改他们*/
Vue.directive('demo', {
    bind: function(el, binding, vnode){
        var s = JSON.stringify;
        el.innerHTML =
            'name:'         + s(binding.name) + '<br>' +
            'value:'        + s(binding.value) + '<br>' +
            'expression:'   + s(binding.expression) + '<br>' +
            'argument:'     + s(binding.arg) + '<br>' +
            'modifiers:'    + s(binding.modifiers) + '<br>' +
            'vnode keys:'   + Object.keys(vnode).join(',')
    }
});
new Vue({
    el: '#hook-arguments-example',
    data: {
        message: 'hello!'
    }
});



//混合
var mixin = {
    created: function(){
        console.log('混合对象的钩子被调用');
    }
};
new Vue({
    mixins: [mixin],
    created: function () {
        console.log('组件钩子被调用')
    }
});
//混合对象的钩子将在组件自身钩子之前调用

//mixin方法，添加一些组件选项
var mixin = {
    methods: {
        foo: function(){
            console.log('foo');
        },
        conflicting: function(){
            console.log('from mixin');
        }
    }
};
var vm = new Vue({
    mixins: [mixin],
    methods: {
        bar: function(){
            console.log('bar');
        },
        conflicting: function(){
            console.log('from self');
        }
    }
});
vm.foo();
vm.bar();
vm.conflicting();// from self
//两个对象键名冲突时，取组件对象的键值对。

Vue.mixin({//全局注册混合对象
    created: function(){
        var myOption = this.$options.myOption;
        if(myOption){
            console.log(myOption);
        }
    }
});
new Vue({
    myOption: 'hello!'
});
//注意：一旦使用全局混合对象，将会影响到所以之后创建的Vue实例
//大多数情况，只应当用于自定义选项，如上案例。



//插件
//开发插件：install()方法：参数一：vue构造器；参数二：可选的选项对象；
//开发插件模板
MyPlugin.install = function(Vue, options){
    //1.添加全局方法或属性
    Vue.myGlobalMethod = function(){
        //逻辑
    };

    //2、添加全局资源
    Vue.directive('my-directive', {
        bind: function(el, binding, vnode, oldVnode){
            //逻辑
        }
    });

    //3.注入组件
    Vue.mixin({
        created: function(){
            //逻辑
        }
    });

    //4、添加实例方法
    Vue.prototype.$myMethod = function(options){
        //逻辑
    };
};

//通过全局方法Vue.use()使用插件
Vue.use(MyPlugin);







