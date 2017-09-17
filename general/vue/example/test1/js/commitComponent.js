var apiURL = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha=';

var demo = new Vue({
   el: '#demo',
    data: {
       branches: ['master', 'dev'],
        currentBranch: 'master',
        commits: null
    },
    created: function(){//实例已经创建完成之后被调用。
       this.fetchData();
    },
    watch: {//监听属性，发生变化就会调用
        currentBranch: 'fetchData'      //首次渲染的时候没有调用
    },
    filters: {
        truncate: function(v){
            var newline = v.indexOf('\n');
            return newline > 0 ? v.slice(0, newline) : v;
        },
        formatDate: function(v){
            return v.replace(/T|Z/g, '');
        }
    },
    methods: {
        fetchData: function(){
            var xhr = new XMLHttpRequest();
            var self = this;
            xhr.open('GET', apiURL + self.currentBranch);
            xhr.onload = function(){
                self.commits = JSON.parse(xhr.responseText);
                console.log(self.commits[0].html_url);
            };
            xhr.send();
        }
    }

});
