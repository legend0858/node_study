/**
 * Created by liuyue on 2017/5/12.
 */

var app = new Vue({
	el: '#app',
	data: {
		search:{
			name:"",
			age:"",
			sex:""
		},
		persons: [],
		newPerson:{
			name:"",
			age:0,
			sex:"男"
		}
	},
	methods: {
		doSearch:function(){
			var that = this;
			this.$http.get('/users',{params:that.search}).then(function(data){
				that.persons = data.body;
			});
		},
		add:function(){
			var that = this;
			this.$http.post('/users',that.newPerson).then(function(data){
				console.log(data.body);
				alert("添加成功");
			});
		}
	}
})