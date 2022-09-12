<?php

namespace App\Http\Controllers;

use App\Models\Pinfo;
use App\Models\Pmedical;
use Illuminate\Http\Request;
use App\Models\User;
use DataTables;
use Illuminate\Support\Facades\DB;
//use Barryvdh\DomPDF\Facade\PDF;
use PDF;
use Response;




class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->ajax()) {
            $data = User::select('*');
            return Datatables::of($data)
                ->addIndexColumn()
                ->addColumn('action', function ($row) {

                    $btn = '<a href="javascript:void(0)" class="edit btn btn-primary btn-sm">View</a>';

                    return $btn;
                })
                ->rawColumns(['action'])
                ->make(true);
        }

        return view('users');
    }


    public function pdfview(Request $request)
    {
        $items = User::all();
        view()->share('items', $items);


        if ($request->has('download')) {
            $pdf = PDF::loadView('pdfview');
            return $pdf->download('pdfview.pdf');
        }


        return view('pdfview');
    }

    public function patientmedical()
    {
        $pid = DB::select('select * from pinfos');
        return view('patientmedical', compact('pid'));
    }
    public function patientmedicalsubmit(Request $request)
    {

        ////return $request->all();

        $request->validate([
            'height' => 'required',
            'weight' => 'required',
            'bp' => 'required',
            'pulse' => 'required',
            'temperature' => 'required',
            'respiration' => 'required',
            'symptomstype' => 'required',
            'symptomstitle' => 'required',
            'symptomsdescription' => 'required',
            'casualty' => 'required',
            'oldpatient' => 'required',
            'tpa' => 'required',
            'consultantdoctor' => 'required',
            'paymentmode' => 'required',
            'appointmentdate' => 'required',
            'case' => 'required',
            'reference' => 'required',
            // 'tax'=>'required',
            // 'standardcharge'=>'required',
            'appliedcharge' => 'required',
            'amount' => 'required',
            'paidamount' => 'required',





        ]);
        if (!(is_numeric($request->height)  &&
            is_numeric($request->weight)  &&
            is_numeric($request->bp) &&
            is_numeric($request->pulse) &&
            is_numeric($request->temperature) &&
            is_numeric($request->respiration))) {
            return back()->with('numbermust', 'the height ,  weight , bp , pulse , temperature and respiration  must be number ')->withInput();
        }






        Pmedical::create($request->all());
        //return $request->all();

    }


    // Pinfo

    public function index2()
    {
        $todo = Pinfo::all();
        return view('home')->with(compact('todo'));
    }

    public function store(Request $request)
    {
        // $data = $request->validate([
        //     'title' => 'required|max:255',
        //     'description' => 'required'
        // ]);
        $todo = Pinfo::create($request->all());
        return Response()->json($todo);
    }

    public function join()
    {
        ////  $data = DB::select('select * from pinfos ,  pmedicals ' );////where pmedicals.id = pinfos.patientid');
        $data = DB::table('pinfos')
            ->join('pmedicals', 'pinfos.id', '=', 'pmedicals.patientid')
            /// ->join('orders', 'users.id', '=', 'orders.user_id')
            ->select('pinfos.*', 'pmedicals.*')
            ->get();

        session([
            'data' => $data,

        ]);


        ///$data =DB::select('select * from pinfos join  pmedicals on pinfos.id = pmedicals.patientid ');
        return view('allpatientdata', ['data' => $data]);

        return dd($data);
    }
    public function singlepatient($id)
    {
        // $patient =Pinfo::find($id);
        // $patientt=Pmedical::find($id);
        /// return dd($patient2);

        return view('singlepatient'); ///, compact('patient','patientt'));


        /// return dd($patient);

    }
    public function editpatient($id)
    {
        
        $data =DB::select('select * from  pinfos where id =? ', [$id]);
        $data2 =DB::select('select * from  pmedicals where patientid =? ', [$id]);
        ///return dd($data);
        $data = $data[0];
        $data2=$data2[0];


        return view('editpatient'  , compact('data' , 'data2'));
    }
    public function updatedata(Request $request)
    {
       // return $request->all();

        $data2= DB::table('pinfos')->where('email' , $request->email)->first();

    ////  return dd($data2);
        DB::table('pmedicals')->where('patientid', $data2->id)->update([
            'height'=>$request->height,
            'weight'=>$request->weight,
            'temperature'=>$request->temperature,
            'pulse'=>$request->pulse,
            // 'bp'=>$request->bp,

        ]);


        DB::table('pinfos')->where('email' , $request->email)->update([
            'name'=>$request->name,
            'dateofbirth'=>$request->dateofbirth,
            'bloodgroup'=>$request->bloodgroup,
            'maritalstatus'=>$request->maritalstatus, 
            'phone'=>$request->phone, 
            'address'=>$request->address,

        ]);
        return redirect('join');

        return $request->all();

        $d = DB::table('pinfos')->where('email' , $request->email)->first();


        $data =Pinfo::find($request->patientid);
        return dd($data);

        return dd($d);

        return $request->all();

        
        $data1 = DB::select('select * from pinfos where id = ?',  [$request->patientid]);
         $data2 = DB::select('select * from pmedicals where patientid = ?',  [$request->patientid]);
         return dd($data2);


        $student = Pmedical::find($request->patientid);
        return dd($student);

        $student->name = $request->input('name');
        $student->email = $request->input('email');
        $student->course = $request->input('course');
        $student->section = $request->input('section');
        $student->update();
        return redirect()->back()->with('status','Student Updated Successfully');


        

    /// return $request->all();

        // $data1 = DB::select('select * from pinfos where id = ?',  [$request->patientid]);
        // $data2 = DB::select('select * from pmedicals where patientid = ?',  [$request->patientid]);

        DB::table('pinfos')->where('id' , $request->patientid)->update([
            'email'=>$request->email,
            'name'=>$request->name,
            'dateofbirth'=>$request->dateofbirth,
            'bloodgroup'=>$request->bloodgroup,
            'maritalstatus'=>$request->maritalstatus, 
            'phone'=>$request->phone, 
            'address'=>$request->address,
            'year'=>1, 

 
        ]);
        
        DB::table('pmedicals')->where('patientid' , $request->patientid)->update([
            'height'=>$request->height,
            'weight'=>$request->weight,
            'temperature'=>$request->temperature,
            'pulse'=>$request->pulse,
            // 'maritalstatus'=>$request->maritalstatus, 
            // 'phone'=>$request->phone, 
            // 'address'=>$request->address, 
 
        ]);
        return redirect('join');
        return back()->with('success_update', '  data has been  updated');


      //  return $data2;

        return $request->all();

        //    DB::update('update pinfos set name =? , email=?  , dateofbirth = ? , bloodgroup =?  , maritalstatus =? , birthdate =? ,
        //     phone =? , address = ? where ');




        $patient = Pinfo::find($request->id);
        return $request->id;
        return $patient;
        // $patient2 = Pmedical::find($request->id);
        $patient->email = $request->email;
        $patient->dateofbirth = $request->dateofbirth;
        $patient->bloodgroup = $request->bloodgroup;
        $patient->maritalstatus = $request->maritalstatus;
        $patient->phone = $request->phone;
        $patient->address = $request->address;
        $patient->save();
        // $patient2->height=$request->height;
        // $patient2->weight=$request->weight;
        // $patient2->temperature=$request->temperature;
        // $patient2->pulse=$request->pulse;
        // $patient2->save();

      
        return $request->all();
    }

    public function deletepatient($id){

        DB::delete('delete from  pinfos where id = ?', [$id]);
        DB::delete('delete from  pmedicals where patientid = ?', [$id]);
        return back()->with('success', '  data has been  delete');

        


        $data =DB::select('select * from  pinfos where id =? ', [$id]);
        $data2 =DB::select('select * from  pmedicals where patientid =? ', [$id]);

    }






    public function indexed(Request $request)
    {
        if ($request->has('trashed')) {
            $data = Pinfo::onlyTrashed()
                ->get();
        } else {
          ///  $test = DB::table('pmedicals')->get('patientid');
            $test =DB::select('select patientid from pmedicals ');
            $data =DB::select('select * from pinfos where id not in (select patientid from pmedicals)');

          // $data = Pinfo::get();
        //    $data = DB::table('pmedicals')
        //    ->join('pinfos', 'pinfos.id', '!=', 'pmedicals.patientid')
        //    /// ->join('orders', 'users.id', '=', 'orders.user_id')
        //    ->select('pinfos.*', 'pmedicals.*')
        //    ->get();  
    }

         return view('posts', compact('data'));
    }
  
 
    public function destroy($id)
    {
        Pinfo::find($id)->delete();
  
        return redirect()->back();
    }
  
 
    public function restore($id)
    {
        Pinfo::withTrashed()->find($id)->restore();
  
        return redirect()->back();
    }  
   
    public function restoreAll()
    {
        Pinfo::onlyTrashed()->restore();
  
        return redirect()->back();
    }




}
