import { useState } from "react"
import { SidebarNav } from "../../components/SidebarNav"
import TopBar from "../../components/TopBar"
import MailBox from "../../components/Boxes/MailBox";
import AlertBox from "../../components/Boxes/AlertBox";
import Main from "../../components/Main";
import NH4HistoryRates from "./NH4HistoryRates";
import PxOyHistoryRates from "./PxOyHistoryRates";
import NH4PredictionRates from "./NH4PredictionRates";
import PxOyPredictionRates from "./PxOyPredictionRates";
import AdminDashboard from "./AdminDashboard";
import SHistoryRates from "./SHistoryRates";
import SPredictionRates from "./SPredictionRates";

const Dashboard = () => {
  const navigationMenu= JSON.parse(localStorage.getItem("menu")) ? JSON.parse(localStorage.getItem("menu")) : {
    mainDashboard:true,
    adminDashboard:false,
    NH4HistoryDashboard:false,
    PxOyHistoryDashboard:false,
    NH4PredictionDashboard:false,
    PxOyPredictionDashboard:false,
    SHistoryDashboard:false,
    SPredictionDashboard:false,
  }
  const [mailToggled,setMailToggled]=useState(false);
  const [alertToggled,setAlertToggled]=useState(false);
  const [dashboard,setDashboard]=useState(navigationMenu)

  return (
    <div className=" w-full flex ">
        <SidebarNav setDashboard={setDashboard} /> 
        <div className="w-full">

        <div className="top w-full h-[50px]">
          <TopBar
            mailToggled={mailToggled}
            setMailToggled={setMailToggled}
            alertToggled={alertToggled}
            setAlertToggled={setAlertToggled}
            />

        </div>
        <div className=" w-full min-h-screen flex-1 bg-slate-100 relative">
          {mailToggled&&<MailBox mailToggled={mailToggled}  />}
          {alertToggled&&<AlertBox alertToggled={alertToggled} />}
          <div className="p-4 h-full">
            {dashboard.mainDashboard && <Main />}
            {dashboard.adminDashboard && <AdminDashboard />}
            {dashboard.NH4HistoryDashboard && <NH4HistoryRates />}
            {dashboard.PxOyHistoryDashboard && <PxOyHistoryRates />}
            {dashboard.NH4PredictionDashboard && <NH4PredictionRates />}
            {dashboard.PxOyPredictionDashboard && <PxOyPredictionRates />}
            {dashboard.SHistoryDashboard && <SHistoryRates />}
            {dashboard.SPredictionDashboard && <SPredictionRates />}
          </div>
        </div>

        </div>
        
    
      </div>
  )
}

export default Dashboard
