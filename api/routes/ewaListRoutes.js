'use strict';


module.exports = function(app) {
    var todoList = require('../controllers/ewaListController');

    // todoList Routes
    app.route('/sensors')
        .get(todoList.list_all_tasks)
        .post(todoList.create_a_task);

    app.route('/login')
        .post(todoList.login)
        .get(todoList.login);


    app.route('/sensors/:sensorId')
        .get(todoList.read_a_task)
        .put(todoList.update_a_task)
        .delete(todoList.delete_a_task);
};
