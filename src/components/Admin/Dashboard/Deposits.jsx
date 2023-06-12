import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const Deposits = ({orderss}) =>{
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentDate, setCurrentDate] = useState("");



  useEffect(() => {
    setCurrentDate(getFormattedDate());

    const currentDate = new Date(); // Get the current date
    console.log("the order in order details",orderss)
    if (orderss) {
      const calculatedTotalAmount = orderss.reduce((sum, order) => {
        const orderDate = new Date(order.createdAt);
        if (orderDate.toDateString() === currentDate.toDateString()) {
          return sum + order.totalAmount;
        }

        return sum;
      }, 0);
      setTotalAmount(calculatedTotalAmount);
    }
  }, [orderss]);

  const getFormattedDate = () => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date().toLocaleDateString("en-US", options);
    return date;
  };


  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Today's total</Title>
      <Typography component="p" variant="h4">
      &#x20B9; {totalAmount}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {currentDate}
      </Typography>
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}


export default Deposits;