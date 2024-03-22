import { SidebarNav } from "../../components/SidebarNav"
import TopBar from "../../components/TopBar"

const NH4PredictionRates = () => {
  return (
    <div className="flex w-full">
         <div className=" min-h-screen"><SidebarNav /> </div>
        <div className="flex flex-col gap-8 w-full">
          <div className="top w-full h-[50px]">
            <TopBar/>
          </div>
          <div className=" w-11/12 h-full flex flex-col  gap-5 mx-auto mb-12 ">
            NH4PredictionRates
          </div>
          
        </div>
    </div>
    
  )
}

export default NH4PredictionRates
