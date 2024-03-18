import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import PxOyLineChartPerMonth from "../../components/charts/PxOyLineChartPerMonth";
import PxOyLineChartPerYear from "../../components/charts/PxOyLineChartPerYear";
import {useDispatch,useSelector} from 'react-redux'
import { getDataPerDate, getDataPerMonth, getDataPerYear, getPxOyAverageData } from "../../apiCalls/dataApiCall";
import { useEffect,useState } from "react";
import { dataActions } from "../../slices/dataSlice";
const PxOyHistoryRates = () => {
  const dispatch=useDispatch();
  const {PxOyDataPerDate,PxOyDataPerMonth,PxOyDataPerYear,recentPxOyYear,PxOyAverageRates}=useSelector(state=>state.data)
  const [PxOyAverageRatePerMonth,setPxOyAverageRatePerMonth]=useState(null)
  const [PxOyRatesNumberPerMonth,setPxOyRatesNumberPerMonth]=useState(null)
  const [PxOyAverageRatePerYear,setPxOyAverageRatePerYear]=useState(null)
  const [PxOyRatesNumberPerYear,setPxOyRatesNumberPerYear]=useState(null)

  const specificDateSchema=yup.object().shape({
    date:yup.date().required("Full date is required"),
  });
  const monthSchema=yup.object().shape({
    month:yup.string().required("Month is required"),
  });
  const yearSchema=yup.object().shape({
    year:yup.number().required("Year is required"),
  });
  const {register:registerSpecificDate, handleSubmit:handleSubmitSpecificDate, formState:{errors:errorsSpecificDate}} = useForm({
    resolver: yupResolver(specificDateSchema), 
  });
  const {register:registerMonth, handleSubmit:handleSubmitMonth, formState:{errors:errorsMonth}} = useForm({
    resolver: yupResolver(monthSchema), 
  });
  const {register:registerYear, handleSubmit:handleSubmitYear, formState:{errors:errorsYear}} = useForm({
    resolver: yupResolver(yearSchema), 
  });
  
  const submitSpecificDate=(data)=>{
    const date=new Date(data.date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    dispatch(getDataPerDate('PxOy',year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)));
  }
  const submitMonth=(data)=>{
    const [year,month]=data.month.split("-");
    dispatch(getDataPerMonth('PxOy',month,year))
  }
  const submitYear=(data)=>{
    const year=data.year;
    dispatch(dataActions.setRecentPxOyYear(year))
    dispatch(getDataPerYear('PxOy',year));
  }

  const calculatePxOyAverageRateAndNumberPerMonth=()=>{
    if(PxOyDataPerMonth.length!==0){
      let avg=0;
      for(let i=0;i<PxOyDataPerMonth.length;i++){
        avg+=PxOyDataPerMonth[i].data.dataRate;
      }
      avg=(avg/PxOyDataPerMonth.length).toFixed(2);
      setPxOyAverageRatePerMonth(avg);
      setPxOyRatesNumberPerMonth(PxOyDataPerMonth.length)
    }
  }
  const calculatePxOyAverageRateAndNumberPerYear=()=>{
    if(PxOyDataPerYear.length!==0){
      let avg=0;
      for(let i=0;i<PxOyDataPerYear.length;i++){
        avg+=PxOyDataPerYear[i].data.dataRate;
      }
      avg=(avg/PxOyDataPerYear.length).toFixed(2);
      setPxOyAverageRatePerYear(avg);
      setPxOyRatesNumberPerYear(PxOyDataPerYear.length)
    }
  }
  useEffect(()=>{
    calculatePxOyAverageRateAndNumberPerMonth();
    calculatePxOyAverageRateAndNumberPerYear();
    dispatch(getPxOyAverageData());
  },[PxOyDataPerMonth,PxOyDataPerYear,recentPxOyYear])


  return (
    <div className=" w-full h-full flex flex-col  gap-5 mx-auto ">
    <h1 className=" text-blue-900 text-2xl font-bold py-1">Global Dashboard</h1>
    <div className=" grid grid-cols-3 grid-rows-1  gap-10  ">
      <div className="col-span-2 bg-gray-50 shadow-xl flex border rounded  items-start">
        <div className="flex flex-col h-full border-r-2 border-r-gray-300 w-1/2 ">
          <p className="text-blue-900 px-2 py-4 font-bold">Specific Data</p>
          <form className="flex flex-col w-2/3 gap-1 pl-2 outline-none  " onSubmit={handleSubmitSpecificDate(submitSpecificDate)}>
            <label htmlFor="date" className=" text-xs ">Select date</label>
            <input type="date" name="date" id="date" className="border" {...registerSpecificDate("date")} />
            <p className=' text-sm text-red-700'>{errorsSpecificDate.date?.message}</p>
            <div className="text-center"><input type="submit" value="Get Rate" className="w-1/2 p-2 text-white hover:bg-green-500 cursor-pointer bg-green-600 my-2 rounded-md " /></div>
          </form>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-blue-900 px-2 py-4 font-bold">Result</div>
          { PxOyDataPerDate ? <div className="text-lg font-bold pl-4 ">{PxOyDataPerDate}</div> : <div className="text-lg pl-4">No data found</div> }
        </div>
      </div>
      <div className="flex flex-col gap-1 w-2/3">
        <div className="flex flex-col gap-3 px-2 py-2 border-2 border-gray-300 rounded shadow-xl bg-gray-50   col-span-1 text-blue-950">
          <p className="  font-bold">Global average rate</p>
          <div className="text-2xl font-bold ">{PxOyAverageRates}</div>
        </div>
        <div className="flex flex-col gap-3 px-2 py-2 border-2 rounded border-gray-300 shadow-xl bg-gray-50  col-span-1 text-blue-950">
          <p className="  font-bold">Threshold limit</p>
          <div className="text-2xl font-bold ">4</div>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-3 mt-4">
      <p className="text-xl  text-blue-900 ">Monthly analysis</p>
      <div className="grid grid-cols-3 grid-rows-1 gap-5 h-80">
      <div className="bg-gray-50  col-span-2 shadow-xl border-2">
          <PxOyLineChartPerMonth />
      </div>
      <div className="bg-gray-50 flex flex-col gap-4 items-center w-full shadow-xl border-2">
          <form className="w-2/3  mt-4 flex flex-col  gap-2" onSubmit={handleSubmitMonth(submitMonth)}>
            <label htmlFor="month" className="text-sm font-bold">Select month</label>
            <div className="flex justify-between items-center w-full gap-2">
              <div className="flex flex-col h-full gap-1">
                <input type="month" id="month" name="month" className="outline-none flex w-11/12 h-full border-2 pl-2" {...registerMonth("month")} />
                <p className=' text-sm text-red-700'>{errorsMonth.month?.message}</p>
              </div>
              <div className="bg-green-600 hover:bg-green-400  text-white rounded-md p-1"><input type="submit" value="Get data" className="cursor-pointer text-sm" /></div>
            </div>
          </form>
          <div className="flex w-2/3  flex-col gap-3  py-2 border-2 border-gray-300 rounded  col-span-1 text-blue-950">
            <p className=" pl-2  font-bold"> Average rate</p>
            {PxOyAverageRatePerMonth ? <div className="pl-2 text-2xl font-bold ">{PxOyAverageRatePerMonth}</div>: <div className="pl-2 text-xs font-bold ">No Data Found</div> }
          </div>
          <div className="flex w-2/3  flex-col gap-3  py-2 border-2 rounded border-gray-300 col-span-1 text-blue-950">
            <p className=" pl-2 font-bold">Number of arrangements</p>
            {PxOyRatesNumberPerMonth ? <div className=" pl-2 text-2xl font-bold ">{PxOyRatesNumberPerMonth}</div>: <div className=" pl-2 text-xs font-bold ">No Data Found</div> }
        </div>
      </div>
    </div>
    </div>
    <div className="flex flex-col gap-3 mt-4">
      <p className="text-xl  text-blue-900 ">Yearly analysis</p>
      <div className="grid grid-cols-3 grid-rows-1 gap-5 h-96">
      <div className="bg-gray-50 col-span-2  shadow-xl border-2">
          <PxOyLineChartPerYear year={recentPxOyYear} />
      </div>
      <div className="bg-gray-50 flex flex-col gap-4 items-center w-full shadow-xl border-2">
          <form className="w-2/3  mt-4 flex flex-col  gap-2" onSubmit={handleSubmitYear(submitYear)}>
            <label htmlFor="month" className="text-sm font-bold">Select Year</label>
            <div className="flex justify-between items-center w-full gap-2">
              <div className="flex flex-col h-full gap-1">
                <input type="number" id="month" name="year" min="2022" className="outline-none w-11/12 flex h-full border-2 pl-2" {...registerYear("year")} />
                <p className=' text-sm text-red-700'>{errorsYear.month?.message}</p>
              </div>
              <div className="bg-green-600 hover:bg-green-400  text-white rounded-md p-1"><input type="submit" value="Get data" className="cursor-pointer text-sm" /></div>
            </div>
          </form>
          <div className="flex w-2/3  flex-col gap-3  py-2 border-2 border-gray-300 rounded  col-span-1 text-blue-950">
            <p className=" pl-2  font-bold"> Average rate</p>
            {PxOyAverageRatePerYear ? <div className="pl-2 text-2xl font-bold ">{PxOyAverageRatePerYear}</div> : <div className="pl-2 text-xs font-bold ">No Data Found</div>}
          </div>
          <div className="flex w-2/3  flex-col gap-3  py-2 border-2 rounded border-gray-300 col-span-1 text-blue-950">
            <p className=" pl-2 font-bold">Number of arrangements</p>
            {PxOyRatesNumberPerYear ? <div className=" pl-2 text-2xl font-bold ">{PxOyRatesNumberPerYear}</div> : <div className=" pl-2 text-xs font-bold ">No Data Found</div>}
        </div>
      </div>
    </div>
    </div>
    
  </div>
  )
}

export default PxOyHistoryRates
