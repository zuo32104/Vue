/**
 * Created by zuo on 2017/4/27.
 */

let storage = {
    fetch(key){
        return JSON.parse(localStorage.getItem(key)) || [];
    },
    save(key, val){
        return localStorage.setItem(key, JSON.stringify(val));
    }
};


// const list = [
//     {
//         "title": "qq",
//         "isChecked": false
//     },
//     {
//         "title": "mm",
//         "isChecked": false
//     },
//     {
//         "title": "ww",
//         "isChecked": false
//     }
// ];

const list = storage.fetch('tools-tools');


let vm = new Vue({
    el: "#app",
    data: {
        list: list,
        newTodo: '',
        isAllChecked: false,
        editing: '',
        ago: '',
        newHash: 'all'
    },
    watch:{
        list:{
            deep:true,
            handler(){
                storage.save('tools-tools',this.list)
            }
        }
    },
    methods: {
        removeTodo(index){//删除
            this.list.splice(index, 1)
        },
        addTodo(){//添加
            if (this.newTodo.trim() === "") return;
            this.list.push({
                "title": this.newTodo,
                "isChecked": false
            });
            this.newTodo = '';
        },
        changeTodo(value){//编辑

            this.ago = value.title;
            this.editing = value;

        },
        editTodo(){//编辑
            this.editing = '';
        },
        escTodo(value){//还原
            value.title = this.ago;
            this.editing = '';
        },
        filterList(){//过滤list
            console.log(this.newHash)
            if (this.newHash === 'all') {
                return this.list;
            } else if (this.newHash === 'active') {
                return this.list.filter(function (item) {
                    return !item.isChecked
                })
            } else if (this.newHash === 'completed') {
                return this.list.filter(function (item) {
                    return item.isChecked
                })
            } else {
                return this.list;
            }
        },
        clearTodo(){
            this.list = this.list.filter(function (item) {
                return !item.isChecked;
            })
        }
    },
    computed: {
        unSeleckedNum(){//剩余没选中的
            return this.list.filter(function (item) {
                return !item.isChecked
            }).length;
        },
        allSelected: {//判断全选
            get(){
                return this.list.length === this.list.filter(function (item) {
                        return item.isChecked
                    }).length;
            },
            set(newValue){
                this.list.forEach(function (item) {
                    item.isChecked = newValue;
                })

            }
        }
    }

});

hashValue()

window.addEventListener('hashchange', hashValue);

function hashValue() {
    let hash = window.location.hash.slice(1);
    if (hash) {
        console.log(hash)
        vm.newHash = hash;
    } else {
        console.log(hash)
        hash = 'all';
        return hash;
    }
}
