jQuery(document).ready(function($) {
    //----- Open model CREATE -----//
    jQuery('#btn-add').click(function() {
        jQuery('#btn-save').val("add");
        jQuery('#myForm').trigger("reset");
        jQuery('#formModal').modal('show');
    });
    // CREATE
    $("#btn-save").click(function(e) {
        // location.reload(true);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
            }
        });
        e.preventDefault();

        var formData = {
            name: jQuery('#name').val(),
            guardian_name: jQuery('#guardian_name').val(),
            dateofbirth: jQuery('#dateofbirth').val(),
            bloodgroup: jQuery('#bloodgroup').val(),
            maritalstatus: jQuery('#maritalstatus').val(),
            address: jQuery('#address').val(),
            phone: jQuery('#phone').val(),
            email: jQuery('#email').val(),
        };
        var state = jQuery('#btn-save').val();
        var type = "POST";
        var todo_id = jQuery('#todo_id').val();
        var ajaxurl = 'todo';
        $.ajax({
            type: type,
            url: ajaxurl,
            data: formData,
            dataType: 'json',
            success: function(data) {
                var todo = '<tr id="todo' + data.id + '"><td>' + data.id +
                    '</td><td>' + data.name + '</td><td>' + data.guardian_name +
                    '</td><td>' + data.dateofbirth + '</td><td>' + data.bloodgroup +
                    '</td><td>' + data.maritalstatus + '</td><td>' + data.address + '</td><td>' + data.phone +
                    +'</td><td>' + data.email +
                    '</td>' + '</tr>';
                if (state == "add") {
                    jQuery('#todo-list').append(todo);
                } else {
                    jQuery("#todo" + todo_id).replaceWith(todo);
                }
                jQuery('#myForm').trigger("reset");
                jQuery('#formModal').modal('hide')
            },

            error: function(data) {
                console.log(data);
            }
        });






    });
});