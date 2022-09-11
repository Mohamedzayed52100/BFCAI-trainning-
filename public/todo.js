Home» Laravel» Laravel 9 Ajax Example Tutorial: How to Use Ajax in Laravel
Laravel 9 Ajax Example Tutorial: How to Use Ajax in Laravel
Last updated on: August 22, 2022 by Digamber



In this Laravel AJAX tutorial, we will learn how to create a Laravel CRUD app using AJAX.The central idea of this tutorial is to create a simple app that can create and fetch todo items in sync with MySQL database.
Laravel 9 AJAX Example
AJAX is primarily used to make flawless HTTP requests to read, write, update, and delete the data from the server.AJAX is a tool that makes the consensus between the client and the server.

The usage of AJAX is from the primordial time, obviously from the web development perspective.

AJAX is used through jQuery, and a simple jQuery link can propel it.The jQuery offers excellent features, and AJAX is one of them.

Laravel has always been the best PHP framework, possibly you may have a different opinion, but current data of the sites built with this framework interprets a lot about itself.


PHP drives laravel, and it has been assimilated in Laravel, making its entire mechanism simple yet powerful.From the PHP Web application development perspective, You may also say that it makes it robust.

AJAX in Programming
We can also denote it by Asynchronous JavaScript and XML.It is a powerful tool ultimately used in web development on the client - side to build asynchronous web applications.With it, web applications can make HTTP requests and used
for sending and retrieving the data to a web server asynchronously(mainly a background process).The exclusivity lies in its core.It doesn’ t interfere with the existing web page, and that what it stands out to do .


    AJAX in Programming

Table of Contents
Install Laravel Project
Make Database Connection
Model and Migration
Create Controller
Create Routes
Create Layout
Make Ajax Request
Define AJAX Logic
Test Laravel AJAX App
Conclusion
Install Laravel Project
We have to run the given below command to install a fresh Laravel application, this app will be the sacred canon
for Laravel Ajax example.

composer create - project laravel / laravel laravel - ajax - crud--prefer - dist
Bash
Head over to project directory, or you can simultaneously execute following command with above command followed by double && symbol.


cd laravel - ajax - crud
Bash
Make Database Connection
Ultimately, we have to define the database details in the.env file, make the consensus between laravel app and MySQL database.

DB_CONNECTION = mysql
DB_HOST = 127.0 .0 .1
DB_PORT = 3306
DB_DATABASE = laravel
DB_USERNAME = root
DB_PASSWORD =
    .properties
If you are using MAMP, then you might possibly get the following migration error.

SQLSTATE[HY000][2002] No such file or directory(SQL: select * from information_schema.tables where table_schema = laravel_db and table_name = migrations and table_type = ‘BASE TABLE’)
Paste the following line right after the database configuration inside the.env.

DB_HOST = localhost;
unix_socket = /Applications/MAMP / tmp / mysql / mysql.sock
Bash
Create & Configure Model and Migration
We are creating a simple to - do application, this allows user to insert, read, update or delete the data from the database using AJAX requests.

    In the model, we define the schema that communicates with the database.Whereas, migration set out to generate tables with values that interact with the model.

php artisan make: model Todo - m
Bash
The above command simultaneously created both Model and Migration file.

Add Values in Model
To set up the data values to the database, open app / Models / Todo.php and place the following code.

<<
?
php
namespace App\ Models;
use Illuminate\ Database\ Eloquent\ Factories\ HasFactory;
use Illuminate\ Database\ Eloquent\ Model;
class Todo extends Model {
    use HasFactory;
    protected $fillable = ['title', 'description'];
}
PHP
Configure and Run Migration
To set up the data values to the database, open migrations / xxxx_xx_xx_xxxxxx_create_todos_table.php and place the following code.

<<
?
php
use Illuminate\ Database\ Migrations\ Migration;
use Illuminate\ Database\ Schema\ Blueprint;
use Illuminate\ Support\ Facades\ Schema;
class CreateTodosTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public

    function up() {
        Schema::create('todos', function(Blueprint $table) {
            $table - > id();
            $table - > string('title');
            $table - > string('description');
            $table - > timestamps();
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public

    function down() {
        Schema::dropIfExists('todos');
    }
}
PHP
Run Migration
We have added name and description values respectively and consecutively.Now, we have to define the todo app values within the up()

function, so when we run the migration, then all the set values can be seen in the database.

php artisan migrate
Bash
Create Controller
Execute the following command to create the controller
for handling CRUD logic.

php artisan make: controller CrudController
Bash
Paste the following code in the newly created controller in app / Http / Controllers / CrudController.php file.

<<
?
php
namespace App\ Http\ Controllers;
use Illuminate\ Http\ Request;
use Response;
use App\ Models\ Todo;

class CrudController extends Controller {
    /**
     * Display a listing of the resource.
     *
     */
    public

    function index() {
        $todo = Todo::all();
        return view('home') - > with(compact('todo'));
    }
    /**
     * Store a newly created resource in storage.
     *
     */
    public

    function store(Request $request) {
        $data = $request - > validate([
            'title' => 'required|max:255',
            'description' => 'required'
        ]);
        $todo = Todo::create($data);
        return Response::json($todo);
    }
}
PHP
Generically, create two functions here, and these functions propel the Laravel AJAX example.The index

function renders all the records from the database, and preferably store method saves the data record in the database.

Create Routes
Define route;
it is one of the foundational steps that directly communicates with the controller that we created earlier, open routes / web.php, and paste the following code.

<<
?
php
use Illuminate\ Support\ Facades\ Route;
use App\ Http\ Controllers\ CrudController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', [CrudController::class, 'index']);
Route::resource('todo', CrudController::class);
PHP
Create Layout
Let us create the view
for showing you how to use AJAX in the Laravel application precisely.Head over to resources / views folder and create home.blade.php file.

After creating the recommended file, also create views / layouts / app.blade.php file and folder.Add the following code inside the app.blade.php file.

<
!DOCTYPE html >
    <
    html lang = "en" >
    <
    head >
    <
    meta charset = "utf-8" >
    <
    meta http - equiv = "x-ua-compatible"
content = "ie=edge" >
    <
    meta name = "viewport"
content = "width=device-width, initial-scale=1" / >
    <
    meta name = "csrf-token"
content = "{{ csrf_token() }}" >
    <
    title > Laravel AJAX CRUD Example < /title> <
link rel = "stylesheet"
href = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" >
    <
    /head> <
body class = "container mt-5" >
    @yield('content') <
    script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js" > < /script> <
script src = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" > < /script> <
script src = "{{ asset('js/todo.js') }}"
defer > < /script> < /
body > <
    /html>
PHP
Make Ajax request in Laravel
First, we have to create the table layout and modal popup with form using Bootstrap.These two foundational elements are useful in propelling the AJAX request in Laravel to render or store the data in the database.

Insert the following code in views / home.blade.php file.

@extends('layouts.app')
@section('content') <
    div class = "container" >
    <
    div class = "d-flex bd-highlight mb-4" >
    <
    div class = "p-2 w-100 bd-highlight" >
    <
    h2 > Laravel AJAX Example < /h2> < /
div > <
    div class = "p-2 flex-shrink-0 bd-highlight" >
    <
    button class = "btn btn-success"
id = "btn-add" >
    Add Todo <
    /button> < /
div > <
    /div> <
div >
    <
    table class = "table table-inverse" >
    <
    thead >
    <
    tr >
    <
    th > ID < /th> <
th > Title < /th> <
th > Description < /th> < /
tr > <
    /thead> <
tbody id = "todos-list"
name = "todos-list" >
    @foreach($todo as $data) <
    tr id = "todo{{$data->id}}" >
    <
    td > {
        { $data - > id }
    } < /td> <
td > {
    { $data - > title }
} < /td> <
td > {
    { $data - > description }
} < /td> < /
tr >
    @endforeach <
    /tbody> < /
table > <
    div class = "modal fade"
id = "formModal"
aria - hidden = "true" >
    <
    div class = "modal-dialog" >
    <
    div class = "modal-content" >
    <
    div class = "modal-header" >
    <
    h4 class = "modal-title"
id = "formModalLabel" > Create Todo < /h4> < /
div > <
    div class = "modal-body" >
    <
    form id = "myForm"
name = "myForm"
class = "form-horizontal"
novalidate = "" >
    <
    div class = "form-group" >
    <
    label > Title < /label> <
input type = "text"
class = "form-control"
id = "title"
name = "title"
placeholder = "Enter title"
value = "" >
    <
    /div> <
div class = "form-group" >
    <
    label > Description < /label> <
input type = "text"
class = "form-control"
id = "description"
name = "description"
placeholder = "Enter Description"
value = "" >
    <
    /div> < /
form > <
    /div> <
div class = "modal-footer" >
    <
    button type = "button"
class = "btn btn-primary"
id = "btn-save"
value = "add" > Save changes <
    /button> <
input type = "hidden"
id = "todo_id"
name = "todo_id"
value = "0" >
    <
    /div> < /
div > <
    /div> < /
div > <
    /div> < /
div >
    @endsection
PHP
AJAX Logic in Laravel
Now, we need to create a todo.js file inside the public / js folder.Place the entire code in it.

jQuery(document).ready(function($) {
    //----- Open model CREATE -----//
    jQuery('#btn-add').click(function() {
        jQuery('#btn-save').val("add");
        jQuery('#myForm').trigger("reset");
        jQuery('#formModal').modal('show');
    });
    // CREATE
    $("#btn-save").click(function(e) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
            }
        });
        e.preventDefault();
        var formData = {
            title: jQuery('#title').val(),
            description: jQuery('#description').val(),
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
                var todo = '<tr id="todo' + data.id + '"><td>' + data.id + '</td><td>' + data.title + '</td><td>' + data.description + '</td>';
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
Home» Laravel» Laravel 9 Ajax Example Tutorial: How to Use Ajax in Laravel
Laravel 9 Ajax Example Tutorial: How to Use Ajax in Laravel
Last updated on: August 22, 2022 by Digamber



In this Laravel AJAX tutorial, we will learn how to create a Laravel CRUD app using AJAX.The central idea of this tutorial is to create a simple app that can create and fetch todo items in sync with MySQL database.
Laravel 9 AJAX Example
AJAX is primarily used to make flawless HTTP requests to read, write, update, and delete the data from the server.AJAX is a tool that makes the consensus between the client and the server.

The usage of AJAX is from the primordial time, obviously from the web development perspective.

AJAX is used through jQuery, and a simple jQuery link can propel it.The jQuery offers excellent features, and AJAX is one of them.

Laravel has always been the best PHP framework, possibly you may have a different opinion, but current data of the sites built with this framework interprets a lot about itself.


PHP drives laravel, and it has been assimilated in Laravel, making its entire mechanism simple yet powerful.From the PHP Web application development perspective, You may also say that it makes it robust.

AJAX in Programming
We can also denote it by Asynchronous JavaScript and XML.It is a powerful tool ultimately used in web development on the client - side to build asynchronous web applications.With it, web applications can make HTTP requests and used
for sending and retrieving the data to a web server asynchronously(mainly a background process).The exclusivity lies in its core.It doesn’ t interfere with the existing web page, and that what it stands out to do .


    AJAX in Programming

Table of Contents
Install Laravel Project
Make Database Connection
Model and Migration
Create Controller
Create Routes
Create Layout
Make Ajax Request
Define AJAX Logic
Test Laravel AJAX App
Conclusion
Install Laravel Project
We have to run the given below command to install a fresh Laravel application, this app will be the sacred canon
for Laravel Ajax example.

composer create - project laravel / laravel laravel - ajax - crud--prefer - dist
Bash
Head over to project directory, or you can simultaneously execute following command with above command followed by double && symbol.


cd laravel - ajax - crud
Bash
Make Database Connection
Ultimately, we have to define the database details in the.env file, make the consensus between laravel app and MySQL database.

DB_CONNECTION = mysql
DB_HOST = 127.0 .0 .1
DB_PORT = 3306
DB_DATABASE = laravel
DB_USERNAME = root
DB_PASSWORD =
    .properties
If you are using MAMP, then you might possibly get the following migration error.

SQLSTATE[HY000][2002] No such file or directory(SQL: select * from information_schema.tables where table_schema = laravel_db and table_name = migrations and table_type = ‘BASE TABLE’)
Paste the following line right after the database configuration inside the.env.

DB_HOST = localhost;
unix_socket = /Applications/MAMP / tmp / mysql / mysql.sock
Bash
Create & Configure Model and Migration
We are creating a simple to - do application, this allows user to insert, read, update or delete the data from the database using AJAX requests.

    In the model, we define the schema that communicates with the database.Whereas, migration set out to generate tables with values that interact with the model.

php artisan make: model Todo - m
Bash
The above command simultaneously created both Model and Migration file.

Add Values in Model
To set up the data values to the database, open app / Models / Todo.php and place the following code.

<<
?
php
namespace App\ Models;
use Illuminate\ Database\ Eloquent\ Factories\ HasFactory;
use Illuminate\ Database\ Eloquent\ Model;
class Todo extends Model {
    use HasFactory;
    protected $fillable = ['title', 'description'];
}
PHP
Configure and Run Migration
To set up the data values to the database, open migrations / xxxx_xx_xx_xxxxxx_create_todos_table.php and place the following code.

<<
?
php
use Illuminate\ Database\ Migrations\ Migration;
use Illuminate\ Database\ Schema\ Blueprint;
use Illuminate\ Support\ Facades\ Schema;
class CreateTodosTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public

    function up() {
        Schema::create('todos', function(Blueprint $table) {
            $table - > id();
            $table - > string('title');
            $table - > string('description');
            $table - > timestamps();
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public

    function down() {
        Schema::dropIfExists('todos');
    }
}
PHP
Run Migration
We have added name and description values respectively and consecutively.Now, we have to define the todo app values within the up()

function, so when we run the migration, then all the set values can be seen in the database.

php artisan migrate
Bash
Create Controller
Execute the following command to create the controller
for handling CRUD logic.

php artisan make: controller CrudController
Bash
Paste the following code in the newly created controller in app / Http / Controllers / CrudController.php file.

<<
?
php
namespace App\ Http\ Controllers;
use Illuminate\ Http\ Request;
use Response;
use App\ Models\ Todo;

class CrudController extends Controller {
    /**
     * Display a listing of the resource.
     *
     */
    public

    function index() {
        $todo = Todo::all();
        return view('home') - > with(compact('todo'));
    }
    /**
     * Store a newly created resource in storage.
     *
     */
    public

    function store(Request $request) {
        $data = $request - > validate([
            'title' => 'required|max:255',
            'description' => 'required'
        ]);
        $todo = Todo::create($data);
        return Response::json($todo);
    }
}
PHP
Generically, create two functions here, and these functions propel the Laravel AJAX example.The index

function renders all the records from the database, and preferably store method saves the data record in the database.

Create Routes
Define route;
it is one of the foundational steps that directly communicates with the controller that we created earlier, open routes / web.php, and paste the following code.

<<
?
php
use Illuminate\ Support\ Facades\ Route;
use App\ Http\ Controllers\ CrudController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', [CrudController::class, 'index']);
Route::resource('todo', CrudController::class);
PHP
Create Layout
Let us create the view
for showing you how to use AJAX in the Laravel application precisely.Head over to resources / views folder and create home.blade.php file.

After creating the recommended file, also create views / layouts / app.blade.php file and folder.Add the following code inside the app.blade.php file.

<
!DOCTYPE html >
    <
    html lang = "en" >
    <
    head >
    <
    meta charset = "utf-8" >
    <
    meta http - equiv = "x-ua-compatible"
content = "ie=edge" >
    <
    meta name = "viewport"
content = "width=device-width, initial-scale=1" / >
    <
    meta name = "csrf-token"
content = "{{ csrf_token() }}" >
    <
    title > Laravel AJAX CRUD Example < /title> <
link rel = "stylesheet"
href = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" >
    <
    /head> <
body class = "container mt-5" >
    @yield('content') <
    script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js" > < /script> <
script src = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" > < /script> <
script src = "{{ asset('js/todo.js') }}"
defer > < /script> < /
body > <
    /html>
PHP
Make Ajax request in Laravel
First, we have to create the table layout and modal popup with form using Bootstrap.These two foundational elements are useful in propelling the AJAX request in Laravel to render or store the data in the database.

Insert the following code in views / home.blade.php file.

@extends('layouts.app')
@section('content') <
    div class = "container" >
    <
    div class = "d-flex bd-highlight mb-4" >
    <
    div class = "p-2 w-100 bd-highlight" >
    <
    h2 > Laravel AJAX Example < /h2> < /
div > <
    div class = "p-2 flex-shrink-0 bd-highlight" >
    <
    button class = "btn btn-success"
id = "btn-add" >
    Add Todo <
    /button> < /
div > <
    /div> <
div >
    <
    table class = "table table-inverse" >
    <
    thead >
    <
    tr >
    <
    th > ID < /th> <
th > Title < /th> <
th > Description < /th> < /
tr > <
    /thead> <
tbody id = "todos-list"
name = "todos-list" >
    @foreach($todo as $data) <
    tr id = "todo{{$data->id}}" >
    <
    td > {
        { $data - > id }
    } < /td> <
td > {
    { $data - > title }
} < /td> <
td > {
    { $data - > description }
} < /td> < /
tr >
    @endforeach <
    /tbody> < /
table > <
    div class = "modal fade"
id = "formModal"
aria - hidden = "true" >
    <
    div class = "modal-dialog" >
    <
    div class = "modal-content" >
    <
    div class = "modal-header" >
    <
    h4 class = "modal-title"
id = "formModalLabel" > Create Todo < /h4> < /
div > <
    div class = "modal-body" >
    <
    form id = "myForm"
name = "myForm"
class = "form-horizontal"
novalidate = "" >
    <
    div class = "form-group" >
    <
    label > Title < /label> <
input type = "text"
class = "form-control"
id = "title"
name = "title"
placeholder = "Enter title"
value = "" >
    <
    /div> <
div class = "form-group" >
    <
    label > Description < /label> <
input type = "text"
class = "form-control"
id = "description"
name = "description"
placeholder = "Enter Description"
value = "" >
    <
    /div> < /
form > <
    /div> <
div class = "modal-footer" >
    <
    button type = "button"
class = "btn btn-primary"
id = "btn-save"
value = "add" > Save changes <
    /button> <
input type = "hidden"
id = "todo_id"
name = "todo_id"
value = "0" >
    <
    /div> < /
div > <
    /div> < /
div > <
    /div> < /
div >
    @endsection
PHP
AJAX Logic in Laravel
Now, we need to create a todo.js file inside the public / js folder.Place the entire code in it.

jQuery(document).ready(function($) {
    //----- Open model CREATE -----//
    jQuery('#btn-add').click(function() {
        jQuery('#btn-save').val("add");
        jQuery('#myForm').trigger("reset");
        jQuery('#formModal').modal('show');
    });
    // CREATE
    $("#btn-save").click(function(e) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
            }
        });
        e.preventDefault();
        var formData = {
            title: jQuery('#title').val(),
            description: jQuery('#description').val(),
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
                var todo = '<tr id="todo' + data.id + '"><td>' + data.id + '</td><td>' + data.title + '</td><td>' + data.description + '</td>';
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
Home» Laravel» Laravel 9 Ajax Example Tutorial: How to Use Ajax in Laravel
Laravel 9 Ajax Example Tutorial: How to Use Ajax in Laravel
Last updated on: August 22, 2022 by Digamber



In this Laravel AJAX tutorial, we will learn how to create a Laravel CRUD app using AJAX.The central idea of this tutorial is to create a simple app that can create and fetch todo items in sync with MySQL database.
Laravel 9 AJAX Example
AJAX is primarily used to make flawless HTTP requests to read, write, update, and delete the data from the server.AJAX is a tool that makes the consensus between the client and the server.

The usage of AJAX is from the primordial time, obviously from the web development perspective.

AJAX is used through jQuery, and a simple jQuery link can propel it.The jQuery offers excellent features, and AJAX is one of them.

Laravel has always been the best PHP framework, possibly you may have a different opinion, but current data of the sites built with this framework interprets a lot about itself.


PHP drives laravel, and it has been assimilated in Laravel, making its entire mechanism simple yet powerful.From the PHP Web application development perspective, You may also say that it makes it robust.

AJAX in Programming
We can also denote it by Asynchronous JavaScript and XML.It is a powerful tool ultimately used in web development on the client - side to build asynchronous web applications.With it, web applications can make HTTP requests and used
for sending and retrieving the data to a web server asynchronously(mainly a background process).The exclusivity lies in its core.It doesn’ t interfere with the existing web page, and that what it stands out to do .


    AJAX in Programming

Table of Contents
Install Laravel Project
Make Database Connection
Model and Migration
Create Controller
Create Routes
Create Layout
Make Ajax Request
Define AJAX Logic
Test Laravel AJAX App
Conclusion
Install Laravel Project
We have to run the given below command to install a fresh Laravel application, this app will be the sacred canon
for Laravel Ajax example.

composer create - project laravel / laravel laravel - ajax - crud--prefer - dist
Bash
Head over to project directory, or you can simultaneously execute following command with above command followed by double && symbol.


cd laravel - ajax - crud
Bash
Make Database Connection
Ultimately, we have to define the database details in the.env file, make the consensus between laravel app and MySQL database.

DB_CONNECTION = mysql
DB_HOST = 127.0 .0 .1
DB_PORT = 3306
DB_DATABASE = laravel
DB_USERNAME = root
DB_PASSWORD =
    .properties
If you are using MAMP, then you might possibly get the following migration error.

SQLSTATE[HY000][2002] No such file or directory(SQL: select * from information_schema.tables where table_schema = laravel_db and table_name = migrations and table_type = ‘BASE TABLE’)
Paste the following line right after the database configuration inside the.env.

DB_HOST = localhost;
unix_socket = /Applications/MAMP / tmp / mysql / mysql.sock
Bash
Create & Configure Model and Migration
We are creating a simple to - do application, this allows user to insert, read, update or delete the data from the database using AJAX requests.

    In the model, we define the schema that communicates with the database.Whereas, migration set out to generate tables with values that interact with the model.

php artisan make: model Todo - m
Bash
The above command simultaneously created both Model and Migration file.

Add Values in Model
To set up the data values to the database, open app / Models / Todo.php and place the following code.

<<
?
php
namespace App\ Models;
use Illuminate\ Database\ Eloquent\ Factories\ HasFactory;
use Illuminate\ Database\ Eloquent\ Model;
class Todo extends Model {
    use HasFactory;
    protected $fillable = ['title', 'description'];
}
PHP
Configure and Run Migration
To set up the data values to the database, open migrations / xxxx_xx_xx_xxxxxx_create_todos_table.php and place the following code.

<<
?
php
use Illuminate\ Database\ Migrations\ Migration;
use Illuminate\ Database\ Schema\ Blueprint;
use Illuminate\ Support\ Facades\ Schema;
class CreateTodosTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public

    function up() {
        Schema::create('todos', function(Blueprint $table) {
            $table - > id();
            $table - > string('title');
            $table - > string('description');
            $table - > timestamps();
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public

    function down() {
        Schema::dropIfExists('todos');
    }
}
PHP
Run Migration
We have added name and description values respectively and consecutively.Now, we have to define the todo app values within the up()

function, so when we run the migration, then all the set values can be seen in the database.

php artisan migrate
Bash
Create Controller
Execute the following command to create the controller
for handling CRUD logic.

php artisan make: controller CrudController
Bash
Paste the following code in the newly created controller in app / Http / Controllers / CrudController.php file.

<<
?
php
namespace App\ Http\ Controllers;
use Illuminate\ Http\ Request;
use Response;
use App\ Models\ Todo;

class CrudController extends Controller {
    /**
     * Display a listing of the resource.
     *
     */
    public

    function index() {
        $todo = Todo::all();
        return view('home') - > with(compact('todo'));
    }
    /**
     * Store a newly created resource in storage.
     *
     */
    public

    function store(Request $request) {
        $data = $request - > validate([
            'title' => 'required|max:255',
            'description' => 'required'
        ]);
        $todo = Todo::create($data);
        return Response::json($todo);
    }
}
PHP
Generically, create two functions here, and these functions propel the Laravel AJAX example.The index

function renders all the records from the database, and preferably store method saves the data record in the database.

Create Routes
Define route;
it is one of the foundational steps that directly communicates with the controller that we created earlier, open routes / web.php, and paste the following code.

<<
?
php
use Illuminate\ Support\ Facades\ Route;
use App\ Http\ Controllers\ CrudController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', [CrudController::class, 'index']);
Route::resource('todo', CrudController::class);
PHP
Create Layout
Let us create the view
for showing you how to use AJAX in the Laravel application precisely.Head over to resources / views folder and create home.blade.php file.

After creating the recommended file, also create views / layouts / app.blade.php file and folder.Add the following code inside the app.blade.php file.

<
!DOCTYPE html >
    <
    html lang = "en" >
    <
    head >
    <
    meta charset = "utf-8" >
    <
    meta http - equiv = "x-ua-compatible"
content = "ie=edge" >
    <
    meta name = "viewport"
content = "width=device-width, initial-scale=1" / >
    <
    meta name = "csrf-token"
content = "{{ csrf_token() }}" >
    <
    title > Laravel AJAX CRUD Example < /title> <
link rel = "stylesheet"
href = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" >
    <
    /head> <
body class = "container mt-5" >
    @yield('content') <
    script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js" > < /script> <
script src = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" > < /script> <
script src = "{{ asset('js/todo.js') }}"
defer > < /script> < /
body > <
    /html>
PHP
Make Ajax request in Laravel
First, we have to create the table layout and modal popup with form using Bootstrap.These two foundational elements are useful in propelling the AJAX request in Laravel to render or store the data in the database.

Insert the following code in views / home.blade.php file.

@extends('layouts.app')
@section('content') <
    div class = "container" >
    <
    div class = "d-flex bd-highlight mb-4" >
    <
    div class = "p-2 w-100 bd-highlight" >
    <
    h2 > Laravel AJAX Example < /h2> < /
div > <
    div class = "p-2 flex-shrink-0 bd-highlight" >
    <
    button class = "btn btn-success"
id = "btn-add" >
    Add Todo <
    /button> < /
div > <
    /div> <
div >
    <
    table class = "table table-inverse" >
    <
    thead >
    <
    tr >
    <
    th > ID < /th> <
th > Title < /th> <
th > Description < /th> < /
tr > <
    /thead> <
tbody id = "todos-list"
name = "todos-list" >
    @foreach($todo as $data) <
    tr id = "todo{{$data->id}}" >
    <
    td > {
        { $data - > id }
    } < /td> <
td > {
    { $data - > title }
} < /td> <
td > {
    { $data - > description }
} < /td> < /
tr >
    @endforeach <
    /tbody> < /
table > <
    div class = "modal fade"
id = "formModal"
aria - hidden = "true" >
    <
    div class = "modal-dialog" >
    <
    div class = "modal-content" >
    <
    div class = "modal-header" >
    <
    h4 class = "modal-title"
id = "formModalLabel" > Create Todo < /h4> < /
div > <
    div class = "modal-body" >
    <
    form id = "myForm"
name = "myForm"
class = "form-horizontal"
novalidate = "" >
    <
    div class = "form-group" >
    <
    label > Title < /label> <
input type = "text"
class = "form-control"
id = "title"
name = "title"
placeholder = "Enter title"
value = "" >
    <
    /div> <
div class = "form-group" >
    <
    label > Description < /label> <
input type = "text"
class = "form-control"
id = "description"
name = "description"
placeholder = "Enter Description"
value = "" >
    <
    /div> < /
form > <
    /div> <
div class = "modal-footer" >
    <
    button type = "button"
class = "btn btn-primary"
id = "btn-save"
value = "add" > Save changes <
    /button> <
input type = "hidden"
id = "todo_id"
name = "todo_id"
value = "0" >
    <
    /div> < /
div > <
    /div> < /
div > <
    /div> < /
div >
    @endsection
PHP
AJAX Logic in Laravel
Now, we need to create a todo.js file inside the public / js folder.Place the entire code in it.

jQuery(document).ready(function($) {
    //----- Open model CREATE -----//
    jQuery('#btn-add').click(function() {
        jQuery('#btn-save').val("add");
        jQuery('#myForm').trigger("reset");
        jQuery('#formModal').modal('show');
    });
    // CREATE
    $("#btn-save").click(function(e) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
            }
        });
        e.preventDefault();
        var formData = {
            title: jQuery('#title').val(),
            description: jQuery('#description').val(),
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
                var todo = '<tr id="todo' + data.id + '"><td>' + data.id + '</td><td>' + data.title + '</td><td>' + data.description + '</td>';
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
Home» Laravel» Laravel 9 Ajax Example Tutorial: How to Use Ajax in Laravel
Laravel 9 Ajax Example Tutorial: How to Use Ajax in Laravel
Last updated on: August 22, 2022 by Digamber



In this Laravel AJAX tutorial, we will learn how to create a Laravel CRUD app using AJAX.The central idea of this tutorial is to create a simple app that can create and fetch todo items in sync with MySQL database.
Laravel 9 AJAX Example
AJAX is primarily used to make flawless HTTP requests to read, write, update, and delete the data from the server.AJAX is a tool that makes the consensus between the client and the server.

The usage of AJAX is from the primordial time, obviously from the web development perspective.

AJAX is used through jQuery, and a simple jQuery link can propel it.The jQuery offers excellent features, and AJAX is one of them.

Laravel has always been the best PHP framework, possibly you may have a different opinion, but current data of the sites built with this framework interprets a lot about itself.


PHP drives laravel, and it has been assimilated in Laravel, making its entire mechanism simple yet powerful.From the PHP Web application development perspective, You may also say that it makes it robust.

AJAX in Programming
We can also denote it by Asynchronous JavaScript and XML.It is a powerful tool ultimately used in web development on the client - side to build asynchronous web applications.With it, web applications can make HTTP requests and used
for sending and retrieving the data to a web server asynchronously(mainly a background process).The exclusivity lies in its core.It doesn’ t interfere with the existing web page, and that what it stands out to do .


    AJAX in Programming

Table of Contents
Install Laravel Project
Make Database Connection
Model and Migration
Create Controller
Create Routes
Create Layout
Make Ajax Request
Define AJAX Logic
Test Laravel AJAX App
Conclusion
Install Laravel Project
We have to run the given below command to install a fresh Laravel application, this app will be the sacred canon
for Laravel Ajax example.

composer create - project laravel / laravel laravel - ajax - crud--prefer - dist
Bash
Head over to project directory, or you can simultaneously execute following command with above command followed by double && symbol.


cd laravel - ajax - crud
Bash
Make Database Connection
Ultimately, we have to define the database details in the.env file, make the consensus between laravel app and MySQL database.

DB_CONNECTION = mysql
DB_HOST = 127.0 .0 .1
DB_PORT = 3306
DB_DATABASE = laravel
DB_USERNAME = root
DB_PASSWORD =
    .properties
If you are using MAMP, then you might possibly get the following migration error.

SQLSTATE[HY000][2002] No such file or directory(SQL: select * from information_schema.tables where table_schema = laravel_db and table_name = migrations and table_type = ‘BASE TABLE’)
Paste the following line right after the database configuration inside the.env.

DB_HOST = localhost;
unix_socket = /Applications/MAMP / tmp / mysql / mysql.sock
Bash
Create & Configure Model and Migration
We are creating a simple to - do application, this allows user to insert, read, update or delete the data from the database using AJAX requests.

    In the model, we define the schema that communicates with the database.Whereas, migration set out to generate tables with values that interact with the model.

php artisan make: model Todo - m
Bash
The above command simultaneously created both Model and Migration file.

Add Values in Model
To set up the data values to the database, open app / Models / Todo.php and place the following code.

<<
?
php
namespace App\ Models;
use Illuminate\ Database\ Eloquent\ Factories\ HasFactory;
use Illuminate\ Database\ Eloquent\ Model;
class Todo extends Model {
    use HasFactory;
    protected $fillable = ['title', 'description'];
}
PHP
Configure and Run Migration
To set up the data values to the database, open migrations / xxxx_xx_xx_xxxxxx_create_todos_table.php and place the following code.

<<
?
php
use Illuminate\ Database\ Migrations\ Migration;
use Illuminate\ Database\ Schema\ Blueprint;
use Illuminate\ Support\ Facades\ Schema;
class CreateTodosTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public

    function up() {
        Schema::create('todos', function(Blueprint $table) {
            $table - > id();
            $table - > string('title');
            $table - > string('description');
            $table - > timestamps();
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public

    function down() {
        Schema::dropIfExists('todos');
    }
}
PHP
Run Migration
We have added name and description values respectively and consecutively.Now, we have to define the todo app values within the up()

function, so when we run the migration, then all the set values can be seen in the database.

php artisan migrate
Bash
Create Controller
Execute the following command to create the controller
for handling CRUD logic.

php artisan make: controller CrudController
Bash
Paste the following code in the newly created controller in app / Http / Controllers / CrudController.php file.

<<
?
php
namespace App\ Http\ Controllers;
use Illuminate\ Http\ Request;
use Response;
use App\ Models\ Todo;

class CrudController extends Controller {
    /**
     * Display a listing of the resource.
     *
     */
    public

    function index() {
        $todo = Todo::all();
        return view('home') - > with(compact('todo'));
    }
    /**
     * Store a newly created resource in storage.
     *
     */
    public

    function store(Request $request) {
        $data = $request - > validate([
            'title' => 'required|max:255',
            'description' => 'required'
        ]);
        $todo = Todo::create($data);
        return Response::json($todo);
    }
}
PHP
Generically, create two functions here, and these functions propel the Laravel AJAX example.The index

function renders all the records from the database, and preferably store method saves the data record in the database.

Create Routes
Define route;
it is one of the foundational steps that directly communicates with the controller that we created earlier, open routes / web.php, and paste the following code.

<<
?
php
use Illuminate\ Support\ Facades\ Route;
use App\ Http\ Controllers\ CrudController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', [CrudController::class, 'index']);
Route::resource('todo', CrudController::class);
PHP
Create Layout
Let us create the view
for showing you how to use AJAX in the Laravel application precisely.Head over to resources / views folder and create home.blade.php file.

After creating the recommended file, also create views / layouts / app.blade.php file and folder.Add the following code inside the app.blade.php file.

<
!DOCTYPE html >
    <
    html lang = "en" >
    <
    head >
    <
    meta charset = "utf-8" >
    <
    meta http - equiv = "x-ua-compatible"
content = "ie=edge" >
    <
    meta name = "viewport"
content = "width=device-width, initial-scale=1" / >
    <
    meta name = "csrf-token"
content = "{{ csrf_token() }}" >
    <
    title > Laravel AJAX CRUD Example < /title> <
link rel = "stylesheet"
href = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" >
    <
    /head> <
body class = "container mt-5" >
    @yield('content') <
    script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js" > < /script> <
script src = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" > < /script> <
script src = "{{ asset('js/todo.js') }}"
defer > < /script> < /
body > <
    /html>
PHP
Make Ajax request in Laravel
First, we have to create the table layout and modal popup with form using Bootstrap.These two foundational elements are useful in propelling the AJAX request in Laravel to render or store the data in the database.

Insert the following code in views / home.blade.php file.

@extends('layouts.app')
@section('content') <
    div class = "container" >
    <
    div class = "d-flex bd-highlight mb-4" >
    <
    div class = "p-2 w-100 bd-highlight" >
    <
    h2 > Laravel AJAX Example < /h2> < /
div > <
    div class = "p-2 flex-shrink-0 bd-highlight" >
    <
    button class = "btn btn-success"
id = "btn-add" >
    Add Todo <
    /button> < /
div > <
    /div> <
div >
    <
    table class = "table table-inverse" >
    <
    thead >
    <
    tr >
    <
    th > ID < /th> <
th > Title < /th> <
th > Description < /th> < /
tr > <
    /thead> <
tbody id = "todos-list"
name = "todos-list" >
    @foreach($todo as $data) <
    tr id = "todo{{$data->id}}" >
    <
    td > {
        { $data - > id }
    } < /td> <
td > {
    { $data - > title }
} < /td> <
td > {
    { $data - > description }
} < /td> < /
tr >
    @endforeach <
    /tbody> < /
table > <
    div class = "modal fade"
id = "formModal"
aria - hidden = "true" >
    <
    div class = "modal-dialog" >
    <
    div class = "modal-content" >
    <
    div class = "modal-header" >
    <
    h4 class = "modal-title"
id = "formModalLabel" > Create Todo < /h4> < /
div > <
    div class = "modal-body" >
    <
    form id = "myForm"
name = "myForm"
class = "form-horizontal"
novalidate = "" >
    <
    div class = "form-group" >
    <
    label > Title < /label> <
input type = "text"
class = "form-control"
id = "title"
name = "title"
placeholder = "Enter title"
value = "" >
    <
    /div> <
div class = "form-group" >
    <
    label > Description < /label> <
input type = "text"
class = "form-control"
id = "description"
name = "description"
placeholder = "Enter Description"
value = "" >
    <
    /div> < /
form > <
    /div> <
div class = "modal-footer" >
    <
    button type = "button"
class = "btn btn-primary"
id = "btn-save"
value = "add" > Save changes <
    /button> <
input type = "hidden"
id = "todo_id"
name = "todo_id"
value = "0" >
    <
    /div> < /
div > <
    /div> < /
div > <
    /div> < /
div >
    @endsection
PHP
AJAX Logic in Laravel
Now, we need to create a todo.js file inside the public / js folder.Place the entire code in it.

jQuery(document).ready(function($) {
    //----- Open model CREATE -----//
    jQuery('#btn-add').click(function() {
        jQuery('#btn-save').val("add");
        jQuery('#myForm').trigger("reset");
        jQuery('#formModal').modal('show');
    });
    // CREATE
    $("#btn-save").click(function(e) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
            }
        });
        e.preventDefault();
        var formData = {
            title: jQuery('#title').val(),
            description: jQuery('#description').val(),
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
                var todo = '<tr id="todo' + data.id + '"><td>' + data.id + '</td><td>' + data.title + '</td><td>' + data.description + '</td>';
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
Home» Laravel» Laravel 9 Ajax Example Tutorial: How to Use Ajax in Laravel
Laravel 9 Ajax Example Tutorial: How to Use Ajax in Laravel
Last updated on: August 22, 2022 by Digamber



In this Laravel AJAX tutorial, we will learn how to create a Laravel CRUD app using AJAX.The central idea of this tutorial is to create a simple app that can create and fetch todo items in sync with MySQL database.
Laravel 9 AJAX Example
AJAX is primarily used to make flawless HTTP requests to read, write, update, and delete the data from the server.AJAX is a tool that makes the consensus between the client and the server.

The usage of AJAX is from the primordial time, obviously from the web development perspective.

AJAX is used through jQuery, and a simple jQuery link can propel it.The jQuery offers excellent features, and AJAX is one of them.

Laravel has always been the best PHP framework, possibly you may have a different opinion, but current data of the sites built with this framework interprets a lot about itself.


PHP drives laravel, and it has been assimilated in Laravel, making its entire mechanism simple yet powerful.From the PHP Web application development perspective, You may also say that it makes it robust.

AJAX in Programming
We can also denote it by Asynchronous JavaScript and XML.It is a powerful tool ultimately used in web development on the client - side to build asynchronous web applications.With it, web applications can make HTTP requests and used
for sending and retrieving the data to a web server asynchronously(mainly a background process).The exclusivity lies in its core.It doesn’ t interfere with the existing web page, and that what it stands out to do .


    AJAX in Programming

Table of Contents
Install Laravel Project
Make Database Connection
Model and Migration
Create Controller
Create Routes
Create Layout
Make Ajax Request
Define AJAX Logic
Test Laravel AJAX App
Conclusion
Install Laravel Project
We have to run the given below command to install a fresh Laravel application, this app will be the sacred canon
for Laravel Ajax example.

composer create - project laravel / laravel laravel - ajax - crud--prefer - dist
Bash
Head over to project directory, or you can simultaneously execute following command with above command followed by double && symbol.


cd laravel - ajax - crud
Bash
Make Database Connection
Ultimately, we have to define the database details in the.env file, make the consensus between laravel app and MySQL database.

DB_CONNECTION = mysql
DB_HOST = 127.0 .0 .1
DB_PORT = 3306
DB_DATABASE = laravel
DB_USERNAME = root
DB_PASSWORD =
    .properties
If you are using MAMP, then you might possibly get the following migration error.

SQLSTATE[HY000][2002] No such file or directory(SQL: select * from information_schema.tables where table_schema = laravel_db and table_name = migrations and table_type = ‘BASE TABLE’)
Paste the following line right after the database configuration inside the.env.

DB_HOST = localhost;
unix_socket = /Applications/MAMP / tmp / mysql / mysql.sock
Bash
Create & Configure Model and Migration
We are creating a simple to - do application, this allows user to insert, read, update or delete the data from the database using AJAX requests.

    In the model, we define the schema that communicates with the database.Whereas, migration set out to generate tables with values that interact with the model.

php artisan make: model Todo - m
Bash
The above command simultaneously created both Model and Migration file.

Add Values in Model
To set up the data values to the database, open app / Models / Todo.php and place the following code.

<<
?
php
namespace App\ Models;
use Illuminate\ Database\ Eloquent\ Factories\ HasFactory;
use Illuminate\ Database\ Eloquent\ Model;
class Todo extends Model {
    use HasFactory;
    protected $fillable = ['title', 'description'];
}
PHP
Configure and Run Migration
To set up the data values to the database, open migrations / xxxx_xx_xx_xxxxxx_create_todos_table.php and place the following code.

<<
?
php
use Illuminate\ Database\ Migrations\ Migration;
use Illuminate\ Database\ Schema\ Blueprint;
use Illuminate\ Support\ Facades\ Schema;
class CreateTodosTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public

    function up() {
        Schema::create('todos', function(Blueprint $table) {
            $table - > id();
            $table - > string('title');
            $table - > string('description');
            $table - > timestamps();
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public

    function down() {
        Schema::dropIfExists('todos');
    }
}
PHP
Run Migration
We have added name and description values respectively and consecutively.Now, we have to define the todo app values within the up()

function, so when we run the migration, then all the set values can be seen in the database.

php artisan migrate
Bash
Create Controller
Execute the following command to create the controller
for handling CRUD logic.

php artisan make: controller CrudController
Bash
Paste the following code in the newly created controller in app / Http / Controllers / CrudController.php file.

<<
?
php
namespace App\ Http\ Controllers;
use Illuminate\ Http\ Request;
use Response;
use App\ Models\ Todo;

class CrudController extends Controller {
    /**
     * Display a listing of the resource.
     *
     */
    public

    function index() {
        $todo = Todo::all();
        return view('home') - > with(compact('todo'));
    }
    /**
     * Store a newly created resource in storage.
     *
     */
    public

    function store(Request $request) {
        $data = $request - > validate([
            'title' => 'required|max:255',
            'description' => 'required'
        ]);
        $todo = Todo::create($data);
        return Response::json($todo);
    }
}
PHP
Generically, create two functions here, and these functions propel the Laravel AJAX example.The index

function renders all the records from the database, and preferably store method saves the data record in the database.

Create Routes
Define route;
it is one of the foundational steps that directly communicates with the controller that we created earlier, open routes / web.php, and paste the following code.

<<
?
php
use Illuminate\ Support\ Facades\ Route;
use App\ Http\ Controllers\ CrudController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', [CrudController::class, 'index']);
Route::resource('todo', CrudController::class);
PHP
Create Layout
Let us create the view
for showing you how to use AJAX in the Laravel application precisely.Head over to resources / views folder and create home.blade.php file.

After creating the recommended file, also create views / layouts / app.blade.php file and folder.Add the following code inside the app.blade.php file.

<
!DOCTYPE html >
    <
    html lang = "en" >
    <
    head >
    <
    meta charset = "utf-8" >
    <
    meta http - equiv = "x-ua-compatible"
content = "ie=edge" >
    <
    meta name = "viewport"
content = "width=device-width, initial-scale=1" / >
    <
    meta name = "csrf-token"
content = "{{ csrf_token() }}" >
    <
    title > Laravel AJAX CRUD Example < /title> <
link rel = "stylesheet"
href = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" >
    <
    /head> <
body class = "container mt-5" >
    @yield('content') <
    script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js" > < /script> <
script src = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" > < /script> <
script src = "{{ asset('js/todo.js') }}"
defer > < /script> < /
body > <
    /html>
PHP
Make Ajax request in Laravel
First, we have to create the table layout and modal popup with form using Bootstrap.These two foundational elements are useful in propelling the AJAX request in Laravel to render or store the data in the database.

Insert the following code in views / home.blade.php file.

@extends('layouts.app')
@section('content') <
    div class = "container" >
    <
    div class = "d-flex bd-highlight mb-4" >
    <
    div class = "p-2 w-100 bd-highlight" >
    <
    h2 > Laravel AJAX Example < /h2> < /
div > <
    div class = "p-2 flex-shrink-0 bd-highlight" >
    <
    button class = "btn btn-success"
id = "btn-add" >
    Add Todo <
    /button> < /
div > <
    /div> <
div >
    <
    table class = "table table-inverse" >
    <
    thead >
    <
    tr >
    <
    th > ID < /th> <
th > Title < /th> <
th > Description < /th> < /
tr > <
    /thead> <
tbody id = "todos-list"
name = "todos-list" >
    @foreach($todo as $data) <
    tr id = "todo{{$data->id}}" >
    <
    td > {
        { $data - > id }
    } < /td> <
td > {
    { $data - > title }
} < /td> <
td > {
    { $data - > description }
} < /td> < /
tr >
    @endforeach <
    /tbody> < /
table > <
    div class = "modal fade"
id = "formModal"
aria - hidden = "true" >
    <
    div class = "modal-dialog" >
    <
    div class = "modal-content" >
    <
    div class = "modal-header" >
    <
    h4 class = "modal-title"
id = "formModalLabel" > Create Todo < /h4> < /
div > <
    div class = "modal-body" >
    <
    form id = "myForm"
name = "myForm"
class = "form-horizontal"
novalidate = "" >
    <
    div class = "form-group" >
    <
    label > Title < /label> <
input type = "text"
class = "form-control"
id = "title"
name = "title"
placeholder = "Enter title"
value = "" >
    <
    /div> <
div class = "form-group" >
    <
    label > Description < /label> <
input type = "text"
class = "form-control"
id = "description"
name = "description"
placeholder = "Enter Description"
value = "" >
    <
    /div> < /
form > <
    /div> <
div class = "modal-footer" >
    <
    button type = "button"
class = "btn btn-primary"
id = "btn-save"
value = "add" > Save changes <
    /button> <
input type = "hidden"
id = "todo_id"
name = "todo_id"
value = "0" >
    <
    /div> < /
div > <
    /div> < /
div > <
    /div> < /
div >
    @endsection
PHP
AJAX Logic in Laravel
Now, we need to create a todo.js file inside the public / js folder.Place the entire code in it.

jQuery(document).ready(function($) {
    //----- Open model CREATE -----//
    jQuery('#btn-add').click(function() {
        jQuery('#btn-save').val("add");
        jQuery('#myForm').trigger("reset");
        jQuery('#formModal').modal('show');
    });
    // CREATE
    $("#btn-save").click(function(e) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
            }
        });
        e.preventDefault();
        var formData = {
            title: jQuery('#title').val(),
            description: jQuery('#description').val(),
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
                var todo = '<tr id="todo' + data.id + '"><td>' + data.id + '</td><td>' + data.title + '</td><td>' + data.description + '</td>';
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
Home» Laravel» Laravel 9 Ajax Example Tutorial: How to Use Ajax in Laravel
Laravel 9 Ajax Example Tutorial: How to Use Ajax in Laravel
Last updated on: August 22, 2022 by Digamber



In this Laravel AJAX tutorial, we will learn how to create a Laravel CRUD app using AJAX.The central idea of this tutorial is to create a simple app that can create and fetch todo items in sync with MySQL database.
Laravel 9 AJAX Example
AJAX is primarily used to make flawless HTTP requests to read, write, update, and delete the data from the server.AJAX is a tool that makes the consensus between the client and the server.

The usage of AJAX is from the primordial time, obviously from the web development perspective.

AJAX is used through jQuery, and a simple jQuery link can propel it.The jQuery offers excellent features, and AJAX is one of them.

Laravel has always been the best PHP framework, possibly you may have a different opinion, but current data of the sites built with this framework interprets a lot about itself.


PHP drives laravel, and it has been assimilated in Laravel, making its entire mechanism simple yet powerful.From the PHP Web application development perspective, You may also say that it makes it robust.

AJAX in Programming
We can also denote it by Asynchronous JavaScript and XML.It is a powerful tool ultimately used in web development on the client - side to build asynchronous web applications.With it, web applications can make HTTP requests and used
for sending and retrieving the data to a web server asynchronously(mainly a background process).The exclusivity lies in its core.It doesn’ t interfere with the existing web page, and that what it stands out to do .


    AJAX in Programming

Table of Contents
Install Laravel Project
Make Database Connection
Model and Migration
Create Controller
Create Routes
Create Layout
Make Ajax Request
Define AJAX Logic
Test Laravel AJAX App
Conclusion
Install Laravel Project
We have to run the given below command to install a fresh Laravel application, this app will be the sacred canon
for Laravel Ajax example.

composer create - project laravel / laravel laravel - ajax - crud--prefer - dist
Bash
Head over to project directory, or you can simultaneously execute following command with above command followed by double && symbol.


cd laravel - ajax - crud
Bash
Make Database Connection
Ultimately, we have to define the database details in the.env file, make the consensus between laravel app and MySQL database.

DB_CONNECTION = mysql
DB_HOST = 127.0 .0 .1
DB_PORT = 3306
DB_DATABASE = laravel
DB_USERNAME = root
DB_PASSWORD =
    .properties
If you are using MAMP, then you might possibly get the following migration error.

SQLSTATE[HY000][2002] No such file or directory(SQL: select * from information_schema.tables where table_schema = laravel_db and table_name = migrations and table_type = ‘BASE TABLE’)
Paste the following line right after the database configuration inside the.env.

DB_HOST = localhost;
unix_socket = /Applications/MAMP / tmp / mysql / mysql.sock
Bash
Create & Configure Model and Migration
We are creating a simple to - do application, this allows user to insert, read, update or delete the data from the database using AJAX requests.

    In the model, we define the schema that communicates with the database.Whereas, migration set out to generate tables with values that interact with the model.

php artisan make: model Todo - m
Bash
The above command simultaneously created both Model and Migration file.

Add Values in Model
To set up the data values to the database, open app / Models / Todo.php and place the following code.

<<
?
php
namespace App\ Models;
use Illuminate\ Database\ Eloquent\ Factories\ HasFactory;
use Illuminate\ Database\ Eloquent\ Model;
class Todo extends Model {
    use HasFactory;
    protected $fillable = ['title', 'description'];
}
PHP
Configure and Run Migration
To set up the data values to the database, open migrations / xxxx_xx_xx_xxxxxx_create_todos_table.php and place the following code.

<<
?
php
use Illuminate\ Database\ Migrations\ Migration;
use Illuminate\ Database\ Schema\ Blueprint;
use Illuminate\ Support\ Facades\ Schema;
class CreateTodosTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public

    function up() {
        Schema::create('todos', function(Blueprint $table) {
            $table - > id();
            $table - > string('title');
            $table - > string('description');
            $table - > timestamps();
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public

    function down() {
        Schema::dropIfExists('todos');
    }
}
PHP
Run Migration
We have added name and description values respectively and consecutively.Now, we have to define the todo app values within the up()

function, so when we run the migration, then all the set values can be seen in the database.

php artisan migrate
Bash
Create Controller
Execute the following command to create the controller
for handling CRUD logic.

php artisan make: controller CrudController
Bash
Paste the following code in the newly created controller in app / Http / Controllers / CrudController.php file.

<<
?
php
namespace App\ Http\ Controllers;
use Illuminate\ Http\ Request;
use Response;
use App\ Models\ Todo;

class CrudController extends Controller {
    /**
     * Display a listing of the resource.
     *
     */
    public

    function index() {
        $todo = Todo::all();
        return view('home') - > with(compact('todo'));
    }
    /**
     * Store a newly created resource in storage.
     *
     */
    public

    function store(Request $request) {
        $data = $request - > validate([
            'title' => 'required|max:255',
            'description' => 'required'
        ]);
        $todo = Todo::create($data);
        return Response::json($todo);
    }
}
PHP
Generically, create two functions here, and these functions propel the Laravel AJAX example.The index

function renders all the records from the database, and preferably store method saves the data record in the database.

Create Routes
Define route;
it is one of the foundational steps that directly communicates with the controller that we created earlier, open routes / web.php, and paste the following code.

<<
?
php
use Illuminate\ Support\ Facades\ Route;
use App\ Http\ Controllers\ CrudController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', [CrudController::class, 'index']);
Route::resource('todo', CrudController::class);
PHP
Create Layout
Let us create the view
for showing you how to use AJAX in the Laravel application precisely.Head over to resources / views folder and create home.blade.php file.

After creating the recommended file, also create views / layouts / app.blade.php file and folder.Add the following code inside the app.blade.php file.

<
!DOCTYPE html >
    <
    html lang = "en" >
    <
    head >
    <
    meta charset = "utf-8" >
    <
    meta http - equiv = "x-ua-compatible"
content = "ie=edge" >
    <
    meta name = "viewport"
content = "width=device-width, initial-scale=1" / >
    <
    meta name = "csrf-token"
content = "{{ csrf_token() }}" >
    <
    title > Laravel AJAX CRUD Example < /title> <
link rel = "stylesheet"
href = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" >
    <
    /head> <
body class = "container mt-5" >
    @yield('content') <
    script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js" > < /script> <
script src = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" > < /script> <
script src = "{{ asset('js/todo.js') }}"
defer > < /script> < /
body > <
    /html>
PHP
Make Ajax request in Laravel
First, we have to create the table layout and modal popup with form using Bootstrap.These two foundational elements are useful in propelling the AJAX request in Laravel to render or store the data in the database.

Insert the following code in views / home.blade.php file.

@extends('layouts.app')
@section('content') <
    div class = "container" >
    <
    div class = "d-flex bd-highlight mb-4" >
    <
    div class = "p-2 w-100 bd-highlight" >
    <
    h2 > Laravel AJAX Example < /h2> < /
div > <
    div class = "p-2 flex-shrink-0 bd-highlight" >
    <
    button class = "btn btn-success"
id = "btn-add" >
    Add Todo <
    /button> < /
div > <
    /div> <
div >
    <
    table class = "table table-inverse" >
    <
    thead >
    <
    tr >
    <
    th > ID < /th> <
th > Title < /th> <
th > Description < /th> < /
tr > <
    /thead> <
tbody id = "todos-list"
name = "todos-list" >
    @foreach($todo as $data) <
    tr id = "todo{{$data->id}}" >
    <
    td > {
        { $data - > id }
    } < /td> <
td > {
    { $data - > title }
} < /td> <
td > {
    { $data - > description }
} < /td> < /
tr >
    @endforeach <
    /tbody> < /
table > <
    div class = "modal fade"
id = "formModal"
aria - hidden = "true" >
    <
    div class = "modal-dialog" >
    <
    div class = "modal-content" >
    <
    div class = "modal-header" >
    <
    h4 class = "modal-title"
id = "formModalLabel" > Create Todo < /h4> < /
div > <
    div class = "modal-body" >
    <
    form id = "myForm"
name = "myForm"
class = "form-horizontal"
novalidate = "" >
    <
    div class = "form-group" >
    <
    label > Title < /label> <
input type = "text"
class = "form-control"
id = "title"
name = "title"
placeholder = "Enter title"
value = "" >
    <
    /div> <
div class = "form-group" >
    <
    label > Description < /label> <
input type = "text"
class = "form-control"
id = "description"
name = "description"
placeholder = "Enter Description"
value = "" >
    <
    /div> < /
form > <
    /div> <
div class = "modal-footer" >
    <
    button type = "button"
class = "btn btn-primary"
id = "btn-save"
value = "add" > Save changes <
    /button> <
input type = "hidden"
id = "todo_id"
name = "todo_id"
value = "0" >
    <
    /div> < /
div > <
    /div> < /
div > <
    /div> < /
div >
    @endsection
PHP
AJAX Logic in Laravel
Now, we need to create a todo.js file inside the public / js folder.Place the entire code in it.

jQuery(document).ready(function($) {
    //----- Open model CREATE -----//
    jQuery('#btn-add').click(function() {
        jQuery('#btn-save').val("add");
        jQuery('#myForm').trigger("reset");
        jQuery('#formModal').modal('show');
    });
    // CREATE
    $("#btn-save").click(function(e) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
            }
        });
        e.preventDefault();
        var formData = {
            title: jQuery('#title').val(),
            description: jQuery('#description').val(),
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
                var todo = '<tr id="todo' + data.id + '"><td>' + data.id + '</td><td>' + data.title + '</td><td>' + data.description + '</td>';
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
Home» Laravel» Laravel 9 Ajax Example Tutorial: How to Use Ajax in Laravel
Laravel 9 Ajax Example Tutorial: How to Use Ajax in Laravel
Last updated on: August 22, 2022 by Digamber



In this Laravel AJAX tutorial, we will learn how to create a Laravel CRUD app using AJAX.The central idea of this tutorial is to create a simple app that can create and fetch todo items in sync with MySQL database.
Laravel 9 AJAX Example
AJAX is primarily used to make flawless HTTP requests to read, write, update, and delete the data from the server.AJAX is a tool that makes the consensus between the client and the server.

The usage of AJAX is from the primordial time, obviously from the web development perspective.

AJAX is used through jQuery, and a simple jQuery link can propel it.The jQuery offers excellent features, and AJAX is one of them.

Laravel has always been the best PHP framework, possibly you may have a different opinion, but current data of the sites built with this framework interprets a lot about itself.


PHP drives laravel, and it has been assimilated in Laravel, making its entire mechanism simple yet powerful.From the PHP Web application development perspective, You may also say that it makes it robust.

AJAX in Programming
We can also denote it by Asynchronous JavaScript and XML.It is a powerful tool ultimately used in web development on the client - side to build asynchronous web applications.With it, web applications can make HTTP requests and used
for sending and retrieving the data to a web server asynchronously(mainly a background process).The exclusivity lies in its core.It doesn’ t interfere with the existing web page, and that what it stands out to do .


    AJAX in Programming

Table of Contents
Install Laravel Project
Make Database Connection
Model and Migration
Create Controller
Create Routes
Create Layout
Make Ajax Request
Define AJAX Logic
Test Laravel AJAX App
Conclusion
Install Laravel Project
We have to run the given below command to install a fresh Laravel application, this app will be the sacred canon
for Laravel Ajax example.

composer create - project laravel / laravel laravel - ajax - crud--prefer - dist
Bash
Head over to project directory, or you can simultaneously execute following command with above command followed by double && symbol.


cd laravel - ajax - crud
Bash
Make Database Connection
Ultimately, we have to define the database details in the.env file, make the consensus between laravel app and MySQL database.

DB_CONNECTION = mysql
DB_HOST = 127.0 .0 .1
DB_PORT = 3306
DB_DATABASE = laravel
DB_USERNAME = root
DB_PASSWORD =
    .properties
If you are using MAMP, then you might possibly get the following migration error.

SQLSTATE[HY000][2002] No such file or directory(SQL: select * from information_schema.tables where table_schema = laravel_db and table_name = migrations and table_type = ‘BASE TABLE’)
Paste the following line right after the database configuration inside the.env.

DB_HOST = localhost;
unix_socket = /Applications/MAMP / tmp / mysql / mysql.sock
Bash
Create & Configure Model and Migration
We are creating a simple to - do application, this allows user to insert, read, update or delete the data from the database using AJAX requests.

    In the model, we define the schema that communicates with the database.Whereas, migration set out to generate tables with values that interact with the model.

php artisan make: model Todo - m
Bash
The above command simultaneously created both Model and Migration file.

Add Values in Model
To set up the data values to the database, open app / Models / Todo.php and place the following code.

<<
?
php
namespace App\ Models;
use Illuminate\ Database\ Eloquent\ Factories\ HasFactory;
use Illuminate\ Database\ Eloquent\ Model;
class Todo extends Model {
    use HasFactory;
    protected $fillable = ['title', 'description'];
}
PHP
Configure and Run Migration
To set up the data values to the database, open migrations / xxxx_xx_xx_xxxxxx_create_todos_table.php and place the following code.

<<
?
php
use Illuminate\ Database\ Migrations\ Migration;
use Illuminate\ Database\ Schema\ Blueprint;
use Illuminate\ Support\ Facades\ Schema;
class CreateTodosTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public

    function up() {
        Schema::create('todos', function(Blueprint $table) {
            $table - > id();
            $table - > string('title');
            $table - > string('description');
            $table - > timestamps();
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public

    function down() {
        Schema::dropIfExists('todos');
    }
}
PHP
Run Migration
We have added name and description values respectively and consecutively.Now, we have to define the todo app values within the up()

function, so when we run the migration, then all the set values can be seen in the database.

php artisan migrate
Bash
Create Controller
Execute the following command to create the controller
for handling CRUD logic.

php artisan make: controller CrudController
Bash
Paste the following code in the newly created controller in app / Http / Controllers / CrudController.php file.

<<
?
php
namespace App\ Http\ Controllers;
use Illuminate\ Http\ Request;
use Response;
use App\ Models\ Todo;

class CrudController extends Controller {
    /**
     * Display a listing of the resource.
     *
     */
    public

    function index() {
        $todo = Todo::all();
        return view('home') - > with(compact('todo'));
    }
    /**
     * Store a newly created resource in storage.
     *
     */
    public

    function store(Request $request) {
        $data = $request - > validate([
            'title' => 'required|max:255',
            'description' => 'required'
        ]);
        $todo = Todo::create($data);
        return Response::json($todo);
    }
}
PHP
Generically, create two functions here, and these functions propel the Laravel AJAX example.The index

function renders all the records from the database, and preferably store method saves the data record in the database.

Create Routes
Define route;
it is one of the foundational steps that directly communicates with the controller that we created earlier, open routes / web.php, and paste the following code.

<<
?
php
use Illuminate\ Support\ Facades\ Route;
use App\ Http\ Controllers\ CrudController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', [CrudController::class, 'index']);
Route::resource('todo', CrudController::class);
PHP
Create Layout
Let us create the view
for showing you how to use AJAX in the Laravel application precisely.Head over to resources / views folder and create home.blade.php file.

After creating the recommended file, also create views / layouts / app.blade.php file and folder.Add the following code inside the app.blade.php file.

<
!DOCTYPE html >
    <
    html lang = "en" >
    <
    head >
    <
    meta charset = "utf-8" >
    <
    meta http - equiv = "x-ua-compatible"
content = "ie=edge" >
    <
    meta name = "viewport"
content = "width=device-width, initial-scale=1" / >
    <
    meta name = "csrf-token"
content = "{{ csrf_token() }}" >
    <
    title > Laravel AJAX CRUD Example < /title> <
link rel = "stylesheet"
href = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" >
    <
    /head> <
body class = "container mt-5" >
    @yield('content') <
    script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js" > < /script> <
script src = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" > < /script> <
script src = "{{ asset('js/todo.js') }}"
defer > < /script> < /
body > <
    /html>
PHP
Make Ajax request in Laravel
First, we have to create the table layout and modal popup with form using Bootstrap.These two foundational elements are useful in propelling the AJAX request in Laravel to render or store the data in the database.

Insert the following code in views / home.blade.php file.

@extends('layouts.app')
@section('content') <
    div class = "container" >
    <
    div class = "d-flex bd-highlight mb-4" >
    <
    div class = "p-2 w-100 bd-highlight" >
    <
    h2 > Laravel AJAX Example < /h2> < /
div > <
    div class = "p-2 flex-shrink-0 bd-highlight" >
    <
    button class = "btn btn-success"
id = "btn-add" >
    Add Todo <
    /button> < /
div > <
    /div> <
div >
    <
    table class = "table table-inverse" >
    <
    thead >
    <
    tr >
    <
    th > ID < /th> <
th > Title < /th> <
th > Description < /th> < /
tr > <
    /thead> <
tbody id = "todos-list"
name = "todos-list" >
    @foreach($todo as $data) <
    tr id = "todo{{$data->id}}" >
    <
    td > {
        { $data - > id }
    } < /td> <
td > {
    { $data - > title }
} < /td> <
td > {
    { $data - > description }
} < /td> < /
tr >
    @endforeach <
    /tbody> < /
table > <
    div class = "modal fade"
id = "formModal"
aria - hidden = "true" >
    <
    div class = "modal-dialog" >
    <
    div class = "modal-content" >
    <
    div class = "modal-header" >
    <
    h4 class = "modal-title"
id = "formModalLabel" > Create Todo < /h4> < /
div > <
    div class = "modal-body" >
    <
    form id = "myForm"
name = "myForm"
class = "form-horizontal"
novalidate = "" >
    <
    div class = "form-group" >
    <
    label > Title < /label> <
input type = "text"
class = "form-control"
id = "title"
name = "title"
placeholder = "Enter title"
value = "" >
    <
    /div> <
div class = "form-group" >
    <
    label > Description < /label> <
input type = "text"
class = "form-control"
id = "description"
name = "description"
placeholder = "Enter Description"
value = "" >
    <
    /div> < /
form > <
    /div> <
div class = "modal-footer" >
    <
    button type = "button"
class = "btn btn-primary"
id = "btn-save"
value = "add" > Save changes <
    /button> <
input type = "hidden"
id = "todo_id"
name = "todo_id"
value = "0" >
    <
    /div> < /
div > <
    /div> < /
div > <
    /div> < /
div >
    @endsection
PHP
AJAX Logic in Laravel
Now, we need to create a todo.js file inside the public / js folder.Place the entire code in it.

jQuery(document).ready(function($) {
    //----- Open model CREATE -----//
    jQuery('#btn-add').click(function() {
        jQuery('#btn-save').val("add");
        jQuery('#myForm').trigger("reset");
        jQuery('#formModal').modal('show');
    });
    // CREATE
    $("#btn-save").click(function(e) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
            }
        });
        e.preventDefault();
        var formData = {
            title: jQuery('#title').val(),
            description: jQuery('#description').val(),
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
                var todo = '<tr id="todo' + data.id + '"><td>' + data.id + '</td><td>' + data.title + '</td><td>' + data.description + '</td>';
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
Home» Laravel» Laravel 9 Ajax Example Tutorial: How to Use Ajax in Laravel
Laravel 9 Ajax Example Tutorial: How to Use Ajax in Laravel
Last updated on: August 22, 2022 by Digamber



In this Laravel AJAX tutorial, we will learn how to create a Laravel CRUD app using AJAX.The central idea of this tutorial is to create a simple app that can create and fetch todo items in sync with MySQL database.
Laravel 9 AJAX Example
AJAX is primarily used to make flawless HTTP requests to read, write, update, and delete the data from the server.AJAX is a tool that makes the consensus between the client and the server.

The usage of AJAX is from the primordial time, obviously from the web development perspective.

AJAX is used through jQuery, and a simple jQuery link can propel it.The jQuery offers excellent features, and AJAX is one of them.

Laravel has always been the best PHP framework, possibly you may have a different opinion, but current data of the sites built with this framework interprets a lot about itself.


PHP drives laravel, and it has been assimilated in Laravel, making its entire mechanism simple yet powerful.From the PHP Web application development perspective, You may also say that it makes it robust.

AJAX in Programming
We can also denote it by Asynchronous JavaScript and XML.It is a powerful tool ultimately used in web development on the client - side to build asynchronous web applications.With it, web applications can make HTTP requests and used
for sending and retrieving the data to a web server asynchronously(mainly a background process).The exclusivity lies in its core.It doesn’ t interfere with the existing web page, and that what it stands out to do .


    AJAX in Programming

Table of Contents
Install Laravel Project
Make Database Connection
Model and Migration
Create Controller
Create Routes
Create Layout
Make Ajax Request
Define AJAX Logic
Test Laravel AJAX App
Conclusion
Install Laravel Project
We have to run the given below command to install a fresh Laravel application, this app will be the sacred canon
for Laravel Ajax example.

composer create - project laravel / laravel laravel - ajax - crud--prefer - dist
Bash
Head over to project directory, or you can simultaneously execute following command with above command followed by double && symbol.


cd laravel - ajax - crud
Bash
Make Database Connection
Ultimately, we have to define the database details in the.env file, make the consensus between laravel app and MySQL database.

DB_CONNECTION = mysql
DB_HOST = 127.0 .0 .1
DB_PORT = 3306
DB_DATABASE = laravel
DB_USERNAME = root
DB_PASSWORD =
    .properties
If you are using MAMP, then you might possibly get the following migration error.

SQLSTATE[HY000][2002] No such file or directory(SQL: select * from information_schema.tables where table_schema = laravel_db and table_name = migrations and table_type = ‘BASE TABLE’)
Paste the following line right after the database configuration inside the.env.

DB_HOST = localhost;
unix_socket = /Applications/MAMP / tmp / mysql / mysql.sock
Bash
Create & Configure Model and Migration
We are creating a simple to - do application, this allows user to insert, read, update or delete the data from the database using AJAX requests.

    In the model, we define the schema that communicates with the database.Whereas, migration set out to generate tables with values that interact with the model.

php artisan make: model Todo - m
Bash
The above command simultaneously created both Model and Migration file.

Add Values in Model
To set up the data values to the database, open app / Models / Todo.php and place the following code.

<<
?
php
namespace App\ Models;
use Illuminate\ Database\ Eloquent\ Factories\ HasFactory;
use Illuminate\ Database\ Eloquent\ Model;
class Todo extends Model {
    use HasFactory;
    protected $fillable = ['title', 'description'];
}
PHP
Configure and Run Migration
To set up the data values to the database, open migrations / xxxx_xx_xx_xxxxxx_create_todos_table.php and place the following code.

<<
?
php
use Illuminate\ Database\ Migrations\ Migration;
use Illuminate\ Database\ Schema\ Blueprint;
use Illuminate\ Support\ Facades\ Schema;
class CreateTodosTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public

    function up() {
        Schema::create('todos', function(Blueprint $table) {
            $table - > id();
            $table - > string('title');
            $table - > string('description');
            $table - > timestamps();
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public

    function down() {
        Schema::dropIfExists('todos');
    }
}
PHP
Run Migration
We have added name and description values respectively and consecutively.Now, we have to define the todo app values within the up()

function, so when we run the migration, then all the set values can be seen in the database.

php artisan migrate
Bash
Create Controller
Execute the following command to create the controller
for handling CRUD logic.

php artisan make: controller CrudController
Bash
Paste the following code in the newly created controller in app / Http / Controllers / CrudController.php file.

<<
?
php
namespace App\ Http\ Controllers;
use Illuminate\ Http\ Request;
use Response;
use App\ Models\ Todo;

class CrudController extends Controller {
    /**
     * Display a listing of the resource.
     *
     */
    public

    function index() {
        $todo = Todo::all();
        return view('home') - > with(compact('todo'));
    }
    /**
     * Store a newly created resource in storage.
     *
     */
    public

    function store(Request $request) {
        $data = $request - > validate([
            'title' => 'required|max:255',
            'description' => 'required'
        ]);
        $todo = Todo::create($data);
        return Response::json($todo);
    }
}
PHP
Generically, create two functions here, and these functions propel the Laravel AJAX example.The index

function renders all the records from the database, and preferably store method saves the data record in the database.

Create Routes
Define route;
it is one of the foundational steps that directly communicates with the controller that we created earlier, open routes / web.php, and paste the following code.

<<
?
php
use Illuminate\ Support\ Facades\ Route;
use App\ Http\ Controllers\ CrudController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', [CrudController::class, 'index']);
Route::resource('todo', CrudController::class);
PHP
Create Layout
Let us create the view
for showing you how to use AJAX in the Laravel application precisely.Head over to resources / views folder and create home.blade.php file.

After creating the recommended file, also create views / layouts / app.blade.php file and folder.Add the following code inside the app.blade.php file.

<
!DOCTYPE html >
    <
    html lang = "en" >
    <
    head >
    <
    meta charset = "utf-8" >
    <
    meta http - equiv = "x-ua-compatible"
content = "ie=edge" >
    <
    meta name = "viewport"
content = "width=device-width, initial-scale=1" / >
    <
    meta name = "csrf-token"
content = "{{ csrf_token() }}" >
    <
    title > Laravel AJAX CRUD Example < /title> <
link rel = "stylesheet"
href = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" >
    <
    /head> <
body class = "container mt-5" >
    @yield('content') <
    script src = "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js" > < /script> <
script src = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" > < /script> <
script src = "{{ asset('js/todo.js') }}"
defer > < /script> < /
body > <
    /html>
PHP
Make Ajax request in Laravel
First, we have to create the table layout and modal popup with form using Bootstrap.These two foundational elements are useful in propelling the AJAX request in Laravel to render or store the data in the database.

Insert the following code in views / home.blade.php file.

@extends('layouts.app')
@section('content') <
    div class = "container" >
    <
    div class = "d-flex bd-highlight mb-4" >
    <
    div class = "p-2 w-100 bd-highlight" >
    <
    h2 > Laravel AJAX Example < /h2> < /
div > <
    div class = "p-2 flex-shrink-0 bd-highlight" >
    <
    button class = "btn btn-success"
id = "btn-add" >
    Add Todo <
    /button> < /
div > <
    /div> <
div >
    <
    table class = "table table-inverse" >
    <
    thead >
    <
    tr >
    <
    th > ID < /th> <
th > Title < /th> <
th > Description < /th> < /
tr > <
    /thead> <
tbody id = "todos-list"
name = "todos-list" >
    @foreach($todo as $data) <
    tr id = "todo{{$data->id}}" >
    <
    td > {
        { $data - > id }
    } < /td> <
td > {
    { $data - > title }
} < /td> <
td > {
    { $data - > description }
} < /td> < /
tr >
    @endforeach <
    /tbody> < /
table > <
    div class = "modal fade"
id = "formModal"
aria - hidden = "true" >
    <
    div class = "modal-dialog" >
    <
    div class = "modal-content" >
    <
    div class = "modal-header" >
    <
    h4 class = "modal-title"
id = "formModalLabel" > Create Todo < /h4> < /
div > <
    div class = "modal-body" >
    <
    form id = "myForm"
name = "myForm"
class = "form-horizontal"
novalidate = "" >
    <
    div class = "form-group" >
    <
    label > Title < /label> <
input type = "text"
class = "form-control"
id = "title"
name = "title"
placeholder = "Enter title"
value = "" >
    <
    /div> <
div class = "form-group" >
    <
    label > Description < /label> <
input type = "text"
class = "form-control"
id = "description"
name = "description"
placeholder = "Enter Description"
value = "" >
    <
    /div> < /
form > <
    /div> <
div class = "modal-footer" >
    <
    button type = "button"
class = "btn btn-primary"
id = "btn-save"
value = "add" > Save changes <
    /button> <
input type = "hidden"
id = "todo_id"
name = "todo_id"
value = "0" >
    <
    /div> < /
div > <
    /div> < /
div > <
    /div> < /
div >
    @endsection
PHP
AJAX Logic in Laravel
Now, we need to create a todo.js file inside the public / js folder.Place the entire code in it.

jQuery(document).ready(function($) {
    //----- Open model CREATE -----//
    jQuery('#btn-add').click(function() {
        jQuery('#btn-save').val("add");
        jQuery('#myForm').trigger("reset");
        jQuery('#formModal').modal('show');
    });
    // CREATE
    $("#btn-save").click(function(e) {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
            }
        });
        e.preventDefault();
        var formData = {
            title: jQuery('#title').val(),
            description: jQuery('#description').val(),
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
                var todo = '<tr id="todo' + data.id + '"><td>' + data.id + '</td><td>' + data.title + '</td><td>' + data.description + '</td>';
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