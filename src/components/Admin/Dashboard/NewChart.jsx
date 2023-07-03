import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';



  
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  

  const MyChart = ({orderss}) => {
    const [orderData, setOrderData] = useState([]);
    let dataTotals = [];
    useEffect(()=>{
        console.log("the orders history from chart",orderss);
        if(orderss.length>0){
            setOrderData(orderss);
        }
    });

    useEffect(()=>{
        orderData.map((order)=>{
            dataTotals.push(order.totalAmount);
        })
    }, [orderData]);

    const data = {
        labels: ['11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm','11pm','12am'],
        datasets: [
          {
            label: 'Day wise sales',
            data: dataTotals,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

    const convertTime = (data) => {
        const utcDateTime = new Date(data);
        const istDateTime = utcDateTime.toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        });
        const istDate = utcDateTime.toLocaleDateString("en-US", {
          timeZone: "Asia/Kolkata",
        });
        const istTime = utcDateTime.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata", 
        });
        return istTime;
      };
    return (
      <div>
        <Bar data={data} options={options} />
      </div>
    );
  };
  
  export default MyChart;
  