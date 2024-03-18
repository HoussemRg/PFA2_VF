import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import {useSelector} from 'react-redux'

const SLineChartPerMonth = () => {
    const {SDataPerMonth}=useSelector(state => state.data);
    const data={
      labels: SDataPerMonth.map(data => new Date(data.date).toISOString().split('T')[0]),
      datasets: [
        {
          label: "S Rates",
          data: SDataPerMonth.map((data) => data?.data.dataRate),
          borderColor: 'rgb(75, 192, 192)',
          
        },
      ],
    }
    
    return (
      <div className="h-[300px] flex justify-center items-center">
         <Line data={data} />
      </div>
    )
}

export default SLineChartPerMonth
