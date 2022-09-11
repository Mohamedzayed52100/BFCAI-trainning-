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
                    ->addColumn('action', function($row){

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
        view()->share('items',$items);


        if($request->has('download')){
            $pdf = PDF::loadView('pdfview');
            return $pdf->download('pdfview.pdf');
        }


        return view('pdfview');
    }

    public function patientmedical(){
        $pid = DB::select('select * from pinfos');
        return view('patientmedical' , compact('pid'));
    }
    public function patientmedicalsubmit(Request $request){

        ////return $request->all();

        $request->validate([
            'height'=>'required',
            'weight'=>'required',
            'bp'=>'required',
            'pulse'=>'required',
            'temperature'=>'required',
            'respiration'=>'required',
            'symptomstype'=>'required',
            'symptomstitle'=>'required',
            'symptomsdescription'=>'required',
            'casualty'=>'required',
            'oldpatient'=>'required',
            'tpa'=>'required',
            'consultantdoctor'=>'required',
            'paymentmode'=>'required',
            'appointmentdate'=>'required',
            'case'=>'required',
            'reference'=>'required',
            // 'tax'=>'required',
            // 'standardcharge'=>'required',
            'appliedcharge'=>'required',
            'amount'=>'required',
            'paidamount'=>'required',





        ]);
        if ( !(is_numeric($request->height)  &&
         is_numeric($request->weight)  &&
         is_numeric($request->bp) &&
         is_numeric($request->pulse) &&
         is_numeric($request->temperature) &&
         is_numeric($request->respiration) )

          ){
            return back()->with('numbermust' , 'the height ,  weight , bp , pulse , temperature and respiration  must be number ');

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






}
