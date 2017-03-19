var story = function() {
	var _storyJson;
    var _storyRow;

    function render() {
        _storyRow = $('<div>').addClass('row story');
        var leftcol = $('<div>').addClass('col-xs-2 progresscol').attr('data-column', -1).appendTo(_storyRow);
        var storyDescr = $('<div>').text(_storyJson.name).addClass('story-descr').appendTo(leftcol);
        var addTaskButton = $('<button>').text('Add task').addClass('btn btn-default').appendTo(leftcol);

        addTaskButton.click(addTask);

        var maxColumn = 4;
        $('<div>').addClass('progress-0 col-xs-4 progresscol').attr('data-column', 0).appendTo(_storyRow);
        $('<div>').addClass('progress-1 col-xs-2 progresscol').attr('data-column', 1).appendTo(_storyRow);
        $('<div>').addClass('progress-2 col-xs-2 progresscol').attr('data-column', 2).appendTo(_storyRow);
        $('<div>').addClass('progress-3 col-xs-2 progresscol done-col').attr('data-column', 3).appendTo(_storyRow);

        var allTasks = _storyJson.tasks;
        for(var i = 0; i < allTasks.length; i++) {
            task().initialize(allTasks[i], _storyRow);
        }

        _storyRow.appendTo('#board');



    }

    function addTask() {
        editTaskModal.open(undefined, function(taskJson) {
            $.ajax({
                type: 'POST',
                url: '/addTask',
                data: {
                    teamId: _storyJson.teamId,
                    storyId: _storyJson._id,
                    name: taskJson.name,
                    people: taskJson.people
                },
                dataType: "json",
                contentType: "application/x-www-form-urlencoded"

            })
            .done(function(data) {
                console.log(data);
                if(data.type == 'success'){
                    task().initialize(data.task, _storyRow);
                }
                else {
                    alert(data.error);
                }

            })
            .fail(function(data) {
                alert("Internal Server Error");
                console.log(data);
            });
        });
    }

    return {
    	initialize: function(storyJson) {
    		_storyJson = storyJson;
    		render();
    	},
    	addTask: function(name) {
            var newTask = {};
            //send request to get back id to assign
            //newTask.id = 
            //_storyJson.task.push(newTask);
            //task.initialize(newTask, _storyRow);
    		
    	}

    }
}