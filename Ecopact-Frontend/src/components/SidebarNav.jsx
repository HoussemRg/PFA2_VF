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

import { Link} from "react-router-dom";

import { useSelector } from "react-redux";
export const SidebarNav = () => {
  
  const { collapseSidebar } = useProSidebar();
  const LoggedUser=useSelector(state=>state.auth.user);
  
  return (
    <div id="sidebar" className="h-full" style={({ height: "100vh" }, { display: "flex" })}>
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
          
          <Link to={`/users/edit/${LoggedUser.id}`}><MenuItem  className="text-white bg-blue-900" id="item" icon={<IoSettings className="text-xl"/>} label="Update Profile">Update Profile</MenuItem></Link> 
          <Link to="/Dashboard"><MenuItem  className="text-white " id="item" icon={<FaTableList />} label="Main Dashboard">Main Dashboard</MenuItem></Link> 
          
          <SubMenu id="item" className="text-white " icon={<ImStatsDots />} label="Historical rates">
                  <Link to="/Dashboard/NH4HistoyRates"><MenuItem  className="sub bg-blue-950" icon={<IoAnalyticsOutline/>}>NH4 Historical Rates</MenuItem></Link>
                  <Link to="/Dashboard/PxOyHistoyRates"><MenuItem  className="sub bg-blue-950" icon={<IoAnalyticsOutline/>}>PxOy Historical Rates</MenuItem></Link>
                  <Link to="/Dashboard/NH3HistoyRates"><MenuItem  className="sub bg-blue-950" icon={<IoAnalyticsOutline/>}>NH3 Historical Rates</MenuItem></Link>
                  
          </SubMenu>
          <SubMenu id="item" className="text-white" icon={<ImStatsDots />} label="Prediction rates">
                  <Link to="/Dashboard/NH4PredictionRates"><MenuItem  className="sub bg-blue-950" icon={<IoAnalyticsOutline/>}>NH4 Prediction Rates</MenuItem></Link>
                  <Link to="/Dashboard/PxOyPredictionRates"><MenuItem  className="sub bg-blue-950" icon={<IoAnalyticsOutline/>}>PxOy Prediction Rates</MenuItem></Link>
                  <Link to="/Dashboard/NH3PredictionRates"><MenuItem  className="sub bg-blue-950" icon={<IoAnalyticsOutline/>}>NH3 Prediction Rates</MenuItem></Link>
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
