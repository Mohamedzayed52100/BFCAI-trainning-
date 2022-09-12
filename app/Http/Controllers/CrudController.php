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
           /// 'file' => 'required' ,


        ]);
        /*

        $student =new Student();
        $student->name = $name;
        $student->profileimage = $imageName;
        $student->save();
        */
        // $name=$request->name;
        // $image=$request->file('file');
        // $imageName=time(). '.' .$image->extension();
        // $image->move(public_path('images'),$imageName);
        // $p =new Pinfo();
      //  $p->name = $request->name;
       // $p->guardian_name = $request->guardian_name;
        //$p->dateofbirth = $request->dateofbirth;
    ///$p->bloodgroup = $request->bloodgroup;
     //   $p->maritalstatus = $request->maritalstatus;
      //  $p->address = $request->address;
       // $p->phone = $request->phone;
        //$p->email = $request->email;
        // $p->patientphoto = $imageName;
        // $p->save();




        /* */
        $todo = Pinfo::create($data);

        // return redirect('getpinfo');
        return Response()->json($todo);
    }
}
