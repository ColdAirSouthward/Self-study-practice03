var app = new Vue({
    el: "#app",
    data: {
        sum: 0,
        selectedIndex: -1,
        menu: [{
            name: "",
            ellipsis: [{
                food_name: "",
                price: 0,
                }]
            }],
        selected: {
            name: "",
            ellipsis: []
        },
        buy: []
    },
    mounted: function () {
        let that = this;
        axios.get("../app.json").then(function (response) {
            that.menu = that.get_food_arr(response.data);
        });
    },
    methods: {
        get_food_arr: function (obj_data) {
            arr_food = [];
            for (let key in obj_data) {
                arr_food.push(obj_data[key]);
            }
            return arr_food;
        },
        push_selected: function (item, index) {
            this.selected = item;
            this.selectedIndex = index;
        },
        toggle_selected: function (index) {
            return this.selectedIndex === index;
        },
        push_buy: function (item) {
            let index = this.buy.indexOf(item);
            if (index === -1) {
                this.buy.push(item);
                console.log(this.buy);
                this.get_sum();
            } else {
                //提示不要重复添加食材
            }
        },
        toggle_buy: function (item) {
            return this.buy.indexOf(item) !== -1;
        },
        shift_buy: function (item) {
            let index = this.buy.indexOf(item);
            this.buy.splice(index, 1);
            this.get_sum();

        },
        check: function () {
            return true;
        },
        get_sum: function () {
            let arr = this.buy;
            let sum = 0;
            for (var i = 0; i < arr.length; i++) {
                sum += +arr[i].price;
            }
            this.sum = sum.toFixed(2);
        },
        clear_buy: function () {
            this.buy = [];
        }
    }
})
