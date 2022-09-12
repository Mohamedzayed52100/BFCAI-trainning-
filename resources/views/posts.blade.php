<html>
<head>
    <title>All data</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
</head>
    <body>
        <div class="container">
            <h1 class="m-3 text-center">All data</h1>
            <table class="table table-bordered mb-3">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($data as $data)
                        <tr>
                            <td>{{ $data->id }}</td>
                            <td>{{ $data->name }}</td>
                            <td>
                                @if(request()->has('trashed'))
                                    <a href="{{ route('data.restore', $data->id) }}" class="btn btn-success">Restore</a>
                                @else
                                    <form method="POST" action="{{ route('data.destroy', $data->id) }}">
                                        @csrf
                                        <input name="_method" type="hidden" value="DELETE">
                                        <button type="submit" class="btn btn-danger delete" title='Delete'>Delete</button>
                                    </form>
                                @endif
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            <div class="float-end">
                @if(request()->has('trashed'))
                    <a href="{{ route('data.index') }}" class="btn btn-info">View All data</a>
                    <a href="{{ route('data.restoreAll') }}" class="btn btn-success">Restore All</a>
                @else
                    <a href="{{ route('data.index', ['trashed' => 'data']) }}" class="btn btn-primary">View Deleted data</a>
                @endif
            </div>
        </div>
        <script type="text/javascript">
            $(document).ready(function() {
                $('.delete').click(function(e) {
                    if(!confirm('Are you sure you want to delete this data?')) {
                        e.preventDefault();
                    }
                });
            });
        </script>
    </body> 
</html>