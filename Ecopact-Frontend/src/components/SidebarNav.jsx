import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { IoAnalyticsOutline } from "react-icons/io5";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { IoSettings } from "react-icons/io5";import '../index.css'
import AppLogo from '../../public/assets/logo.jpg'
//imported icons
import { FaTableList } from "react-icons/fa6";
import { ImStatsDots } from "react-icons/im";

import { Link, useNavigate} from "react-router-dom";

import { useSelector } from "react-redux";
export const SidebarNav = ({
  setDashboard,
}) => {
  
  const { collapseSidebar } = useProSidebar();
  const LoggedUser=useSelector(state=>state.auth.user);
  const navigateToUpdatePage = () =>{
    navigate(`/users/edit/${LoggedUser.id}`);
  }
  const navigate=useNavigate();
  const navigateToMainDashboard = () => {
    const nav={
      mainDashboard: true,
      adminDashboard: false,
      NH4HistoryDashboard: false,
      PxOyHistoryDashboard: false,
      NH4PredictionDashboard: false,
      PxOyPredictionDashboard: false,
      SHistoryDashboard:false,
      SPredictionDashboard:false,
    }
    localStorage.setItem("menu",JSON.stringify(nav))
    setDashboard(JSON.parse(localStorage.getItem("menu")));
  };
  const navigateToNH4HistoryDashboard = () => {
    const nav={
      mainDashboard: false,
      adminDashboard: false,
      NH4HistoryDashboard: true,
      PxOyHistoryDashboard: false,
      NH4PredictionDashboard: false,
      PxOyPredictionDashboard: false,
      SHistoryDashboard:false,
      SPredictionDashboard:false,
    }
    localStorage.setItem("menu",JSON.stringify(nav))
    setDashboard(JSON.parse(localStorage.getItem("menu")));
    
  };
  const navigateToPxOyHistoryDashboard = () => {
    const nav={
      mainDashboard: false,
      adminDashboard: false,
      NH4HistoryDashboard: false,
      PxOyHistoryDashboard: true,
      NH4PredictionDashboard: false,
      PxOyPredictionDashboard: false,
      SHistoryDashboard:false,
      SPredictionDashboard:false,
    }
    localStorage.setItem("menu",JSON.stringify(nav))
    setDashboard(JSON.parse(localStorage.getItem("menu")));
  };
  const navigateToNH4PredictionDashboard = () => {
    const nav={
      mainDashboard: false,
      adminDashboard: false,
      NH4HistoryDashboard: false,
      PxOyHistoryDashboard: false,
      NH4PredictionDashboard: true,
      PxOyPredictionDashboard: false,
      SHistoryDashboard:false,
      SPredictionDashboard:false,
    }
    localStorage.setItem("menu",JSON.stringify(nav))
    setDashboard(JSON.parse(localStorage.getItem("menu")));
  };
  const navigateToPxOyPredictionDashboard = () => {
    const nav={
      mainDashboard: false,
      adminDashboard: false,
      NH4HistoryDashboard: false,
      PxOyHistoryDashboard: false,
      NH4PredictionDashboard: false,
      PxOyPredictionDashboard: true,
      SHistoryDashboard:false,
      SPredictionDashboard:false,
    }
    localStorage.setItem("menu",JSON.stringify(nav))
    setDashboard(JSON.parse(localStorage.getItem("menu")));
  };
  const navigateToAdminDashboard = () => {
    const nav={
      mainDashboard: false,
      adminDashboard: true,
      NH4HistoryDashboard: false,
      PxOyHistoryDashboard: false,
      NH4PredictionDashboard: false,
      PxOyPredictionDashboard: false,
      SHistoryDashboard:false,
      SPredictionDashboard:false,
    }
    localStorage.setItem("menu",JSON.stringify(nav))
    setDashboard(JSON.parse(localStorage.getItem("menu")));
  };

  const navigateToSHistoryDashboard = () => {
    const nav={
      mainDashboard: false,
      adminDashboard: false,
      NH4HistoryDashboard: false,
      PxOyHistoryDashboard: false,
      NH4PredictionDashboard: false,
      PxOyPredictionDashboard: false,
      SHistoryDashboard:true,
      SPredictionDashboard:false,
    }
    localStorage.setItem("menu",JSON.stringify(nav))
    setDashboard(JSON.parse(localStorage.getItem("menu")));
  };
  const navigateToSPredictionDashboard = () => {
    const nav={
      mainDashboard: false,
      adminDashboard: false,
      NH4HistoryDashboard: false,
      PxOyHistoryDashboard: false,
      NH4PredictionDashboard: false,
      PxOyPredictionDashboard: false,
      SHistoryDashboard:false,
      SPredictionDashboard:true,
    }
    localStorage.setItem("menu",JSON.stringify(nav))
    setDashboard(JSON.parse(localStorage.getItem("menu")));
  };
  return (
    <div id="sidebar" style={({ height: "100vh" }, { display: "flex" })}>
      <Sidebar backgroundColor="rgb(16 22 36)">
        <Menu>
        <MenuItem className="text-white text-center text-xl font-semibold" id="item" icon={
            <img  className="border rounded-full" src={AppLogo}></img>
          }>ECOPACT</MenuItem>
          <MenuItem id="item" className="text-center"
            icon={<MenuOutlinedIcon className="text-white"/>}
            onClick={() => {
              collapseSidebar();
            }}
            
          >
            {" "}
            
          
          </MenuItem >
          <MenuItem onClick={navigateToUpdatePage} className="text-white bg-blue-900" id="item" icon={<IoSettings className="text-xl"/>}>Update Profile</MenuItem>
            
          {LoggedUser?.isAdmin&&<MenuItem onClick={navigateToAdminDashboard} id="item" className="text-white" icon={<FaTableList />}>Admin Dashboard</MenuItem>}  
          <MenuItem onClick={navigateToMainDashboard} id="item" className="text-white" icon={<FaTableList />}>Main Dashboard</MenuItem>
          <SubMenu id="item" className="text-white" icon={<ImStatsDots />} label="Historical rates">
                  <MenuItem onClick={navigateToNH4HistoryDashboard} className="sub bg-blue-950" icon={<IoAnalyticsOutline/>}>NH4 Historical Rates</MenuItem>
                  <MenuItem onClick={navigateToPxOyHistoryDashboard} className="sub bg-blue-950" icon={<IoAnalyticsOutline />}>PxOy Historical Rates</MenuItem>
                  <MenuItem onClick={navigateToSHistoryDashboard} className="sub bg-blue-950" icon={<IoAnalyticsOutline />}>S Historical Rates</MenuItem>
          </SubMenu>
          <SubMenu id="item" className="text-white" icon={<ImStatsDots />} label="Prediction rates">
                  <MenuItem onClick={navigateToNH4PredictionDashboard} className="sub bg-blue-950" icon={<IoAnalyticsOutline />}>NH4 Prediction Rates</MenuItem>
                  <MenuItem onClick={navigateToPxOyPredictionDashboard} className="sub bg-blue-950" icon={<IoAnalyticsOutline />}>PxOy Prediction Rates</MenuItem>
                  <MenuItem onClick={navigateToSPredictionDashboard} className="sub bg-blue-950" icon={<IoAnalyticsOutline />}>S Prediction Rates</MenuItem>
          </SubMenu>
          
          <div className="absolute bottom-16 w-full">
          <Link to="/"><MenuItem  id="item" className="text-white" icon={<HomeOutlinedIcon />}>Home</MenuItem></Link>
          <Link to="/Contact"><MenuItem id="item" className="text-white" icon={<ContactsOutlinedIcon />}>Contact</MenuItem></Link>
          </div>
        </Menu>
      </Sidebar>
      </div>
  );
};
