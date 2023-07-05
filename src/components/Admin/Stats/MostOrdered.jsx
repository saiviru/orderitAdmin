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


const MostOrdered = ({ orderss }) => {
  const [orderData, setOrderData] = useState([]);
  const [data, setData] = useState();
  let dataTotals = [];
  let todaysOrders = [];
  const currentDate = new Date();
  useEffect(() => {
    if (orderss && orderss.length > 0) {
      orderss.map((order) => {
        const dateObject = new Date(order.createdAt);
        if (dateObject.toDateString() === currentDate.toDateString()) {
          todaysOrders.push(order);
        }
      })
      setOrderData(todaysOrders);
    }
  }, [orderss]);

  useEffect(() => {
    if (orderData && orderData.length > 0) {

      const ordersByHour = orderData.reduce((result, order) => {
        const createdAt = new Date(order.createdAt);
        const hour = createdAt.getHours();
        const hour12 = (hour % 12) || 12; // Convert hour to 12-hour format
        const amPm = hour < 12 ? 'am' : 'pm'; // Determine if it's AM or PM

        const key = `${hour12}${amPm}`; // Create a key combining hour and AM/PM

        if (!result[key]) {
          result[key] = {
            orders: [],
            totalAmount: 0
          };
        }

        result[key].orders.push(order);
        result[key].totalAmount += order.totalAmount;
        return result;
      }, {});

      // Arrange orders based on labels
      const arrangedOrders = Rawdata.labels.map(label => {
        const { orders, totalAmount } = ordersByHour[label] || { orders: [], totalAmount: 0 };

        return {
          label,
          orders,
          totalAmount
        };
      });


      console.log("the orders by hour:", arrangedOrders)
      dataTotals = arrangedOrders.map(order => order.totalAmount);
      Rawdata.datasets[0].data = dataTotals;
      setData(Rawdata);
      console.log("the data is to be sent :", data)
    }
  }, [orderData]);



  let Rawdata = {
    labels: ['11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am'],
    datasets: [
      {
        label: 'Day wise sales',
        data: [],
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

  return (
    <div>
      {data ? <Bar data={data} options={options} /> : <p>No data to show...</p>}
    </div>
  );
};

export default MostOrdered;
