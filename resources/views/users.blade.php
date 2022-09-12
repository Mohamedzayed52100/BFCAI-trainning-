<!DOCTYPE html>
<html>
<head>
    <title>Laravel 8 Datatables Tutorial - ItSolutionStuff.com</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css" />
    <link href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.js"></script>
    <script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap4.min.js"></script>
    <link rel="stylesheet" href="css/normalize.css"></link>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/all.min.css"> </link>


    <style>
        /* .btn-primary{
            position:fixed;
            top: 10px;
            right: 10px;

        } */
        .container{
            margin-top: 90px;
        }
        a{
            position:fixed;
            top: 10px;
        }
        .btn-primary{
            right: 10px;

        }
        .btn-secondary{
            right: 140px;
        }
        .btn-success{
            right: 300px;
        }
        .btn-danger{
            right: 450px;
        }
        .btn-warning{
            right: 570px
        }


    </style>
</head>
<body>

    {{-- <i class="fa-brands fa-twitter"></i> --}}

<a   class="btn btn-primary" href="/patientmedical">Add Patient</a>
<a  class="btn btn-secondary"  href="/downloadex">Download Excel</a>
<a class="btn btn-success"  href="/pdfview" >Download Pdf</a>
<a  class="btn btn-danger"  href="/read">read Excel</a>
<a  id ="print" class="btn btn-warning" >Print</a>
 <div class="container">


    {{--            <th>Guardian Name</th>
                <th>Date Of Birth</th>
                <th>Phone</th>
                <th>Email</th>
                {data: 'guardian_name', name: 'guardian_name'},
                {data: 'dateofbirth', name: 'dateofbirth'},
                {data: 'phone', name: 'phone'},
                {data: 'email', name: 'email'}, --}}

    <table class="table table-bordered data-table">
        <thead>
            <tr>
                <th>No</th>
                <th>Name</th>
                <th>Guardian Name</th>
                <th>Date Of Birth</th>
                <th>Phone</th>
                <th>Email</th>
                {{-- <th width="100px">Action</th> --}}
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>

</body>

<script type="text/javascript">
  $(function () {

    var table = $('.data-table').DataTable({
        processing: true,
        serverSide: true,
        ajax: "{{ route('users.index') }}",
        columns: [
            {data: 'id', name: 'id'},
            {data: 'name', name: 'name'},
            {data: 'guardian_name', name: 'guardian_name'},
                {data: 'dateofbirth', name: 'dateofbirth'},
                {data: 'phone', name: 'phone'},
                {data: 'email', name: 'email'},
            // {data: 'action', name: 'action', orderable: false, searchable: false},
        ]
    });

  });
  var btn =document.getElementById('print');
  btn.onclick= function (){
    window.print();
  }
</script>
</html>
