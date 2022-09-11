@extends('layouts.app')
@section('content')
    <div class="container">
        <div class="d-flex bd-highlight mb-4">
            <div class="p-2 w-100 bd-highlight">
                {{-- <h2>Laravel AJAX Example</h2> --}}
            </div>
            <div class="p-2 flex-shrink-0 bd-highlight">
                <button class="btn btn-success" id="btn-add">
                    Add  
                </button>
            </div>
        </div>
        <div>
            <table class="table table-inverse">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>name</th>
                        <th>guardian name</th>
                        <th>date of birth</th>
                    </tr>
                </thead>
                <tbody id="todos-list" name="todos-list">
                    @foreach ($todo as $data)
                        <tr id="todo{{ $data->id }}">
                            <td>{{ $data->id }}</td>
                            <td>{{ $data->name }}</td>
                            <td>{{ $data->guardian_name }}</td>
                            <td>{{ $data->dateofbirth }}</td>
                            {{-- <td>{{$data->bloodgroup	}}</td>
                    <td>{{$data->maritalstatus	}}</td>
                    <td>{{$data->patientphoto	}}</td> --}}
                        </tr>
                    @endforeach
                </tbody>
            </table>
            <div class="modal fade" id="formModal" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="formModalLabel">Create </h4>
                        </div>
                        <div class="modal-body">
                            @if ($errors->any())
                                <div class="alert alert-danger">
                                    <ul>
                                        @foreach ($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>
                                </div>
                            @endif
                            <form id="myForm" name="myForm" class="form-horizontal" novalidate="" action="/getpinfo">
                                <div class="form-group">
                                    <label>name</label>
                                    <input type="text" class="form-control" id="name" name="name"
                                        placeholder="Enter name" value="">
                                    @error('name')
                                        <span>{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="form-group">
                                    <label>guardian name </label>
                                    <input type="text" class="form-control" id="guardian_name" name="guardian_name"
                                        placeholder="Enter guardian name" value="">
                                    @error('guardian_name')
                                        <span>{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="form-group">
                                    <label>date of birth </label>
                                    <input type="date" class="form-control" id="dateofbirth" name="dateofbirth"
                                        placeholder="Enter date of birth" value="">
                                    @error('dateofbirth')
                                        <span>{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="form-group">
                                    <label>blood group </label>
                                    <input type="text" class="form-control" id="bloodgroup" name="bloodgroup"
                                        placeholder="Enter blood group" value="">
                                    @error('bloodgroup')
                                        <span>{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="form-group">
                                    <label>marital status </label>
                                    <input type="text" class="form-control" id="maritalstatus" name="maritalstatus"
                                        placeholder="Enter marital status" value="">
                                    @error('maritalstatus')
                                        <span>{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="form-group">
                                    <label>patient address </label>
                                    <input type="text" class="form-control" id="address" name="address"
                                        placeholder="Enter patient address" value="">
                                    @error('address')
                                        <span>{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="form-group">
                                    <label>patient phone </label>
                                    <input type="text" class="form-control" id="phone" name="phone"
                                        placeholder="Enter phone" value="">
                                    @error('phone')
                                        <span>{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="form-group">
                                    <label>patient email </label>
                                    <input type="email" class="form-control" id="email" name="email"
                                        placeholder="Enter email" value="">
                                    @error('email')
                                        <span>{{ $message }}</span>
                                    @enderror
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" id="btn-save" value="add">Save changes
                            </button>
                            <input type="hidden" id="todo_id" name="todo_id" value="0">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
