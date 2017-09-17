Vue.component('demo-grid', {
   template: '#grid-template',
    props: {
        data: Array,
        columns: Array,
        filterKey: String
    },
    data: function(){console.log('data');//仅初始化的时候
       var sortOrders = {};
       this.columns.forEach(function(key){
           sortOrders[key] = 1;
       });
       return {
           sortKey: '',             //选中状态
           sortOrders: sortOrders   //排序状态
       }
    },
    computed: {
        filteredData: function(){
            var sortKey = this.sortKey;
            var filterKey = this.filterKey && this.filterKey.toLowerCase();
            var order = this.sortOrders[sortKey] || 1;
            var data = this.data;
            if(filterKey){
                data = data.filter(function(row){
                    return Object.keys(row).some(function(key){
                        return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
                    });
                });
            }
            if(sortKey){
                data = data.slice().sort(function(a, b){
                    a = a[sortKey];
                    b = b[sortKey];
                    return (a === b ? 0 : a > b ? 1 : -1) * order;
                });
            }console.log(data);
            return data;
        }
    },
    filters: {//注册全局过滤器
        capitalize: function(str){console.log(str);//返回处理后的值
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    },
    methods: {
        sortBy: function(key){console.log('sortBy');
            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1;
        }
    }
});
var demo = new Vue({
   el: '#demo',
    data: {
        searchQuery: '',
        gridColumns: ['name', 'power'],
        gridData: [
            { name: 'Chuck Norris', power: Infinity },
            { name: 'Bruce Lee', power: 9000 },
            { name: 'Jackie Chan', power: 7000 },
            { name: 'Jet Li', power: 8000 }
        ]
    }
});















