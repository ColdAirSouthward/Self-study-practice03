let fs = require("fs");
let express = require("express");
let app = express();
let data_str = fs.readFileSync('data.json');
app.get('/app.json', function (req, res) {
    res.send(data_json);
});
app.use('/static', express.static('public'));
app.listen(3000);

let data_obj = JSON.parse(data_str);
let arr_list = data_obj.list;

function converter(x) {
    let arr_food = [];
    let arr_ellipsis_name = x.ellipsis;
    let food_name = x.name;
    for (let i = 0; i < arr_ellipsis_name.length; i++) {
        let obj_inside = {
            food_name: arr_ellipsis_name[i],
            price: (Math.random() * 10 + 3).toFixed(2)
        };
        arr_food.push(obj_inside);
    }

    let obj_food = {
        name: food_name,
        ellipsis: arr_food
    };
    return obj_food;
}

function new_data_maker(x) {
    let arr_new_data = [];
    for (let i = 0; i < x.length; i++) {;
        arr_new_data.push(converter(x[i]));
    }
    return arr_new_data;
}
let new_data = new_data_maker(arr_list);

function arr_to_json(x) {
    var json = {};
    for (var i = 0; i < x.length; i++) {
        json[i] = x[i];
    }
    return json;
}

let data_json = arr_to_json(new_data);
