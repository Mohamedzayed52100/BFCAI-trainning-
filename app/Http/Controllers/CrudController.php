<?php

namespace App\Http\Controllers;

use App\Models\Pinfo;
use Illuminate\Http\Request;
use Response;
use App\Models\Todo;

class CrudController extends Controller
{
    public function index()
    {
        $todo = Pinfo::all();
        return view('home')->with(compact('todo'));
    }
    /**
     * Store a newly created resource in storage.
     *
     */
    public function store(Request $request)
    {
        // $image=$request->file('patientphoto');
        // $imageName=time(). '.' .$image->extension();
        // $image->move(public_path('images'),$imageName);
        $data = $request->validate([
            'name' => 'required|max:255',
            'guardian_name' => 'required' ,
            'dateofbirth' => 'required' ,
            'bloodgroup' => 'required' ,
            'maritalstatus' => 'required' ,
            'address' => 'required' ,
            'phone' => 'required' ,
            'email' => 'email|required' ,


        ]);
        /*

        $student =new Student();
        $student->name = $name;
        $student->profileimage = $imageName;
        $student->save();
        */
        $todo = Pinfo::create($data);

        // return redirect('getpinfo');
        return Response()->json($todo);
    }
}
