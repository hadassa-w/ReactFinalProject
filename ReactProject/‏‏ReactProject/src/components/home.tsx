import { Typography, Box } from '@mui/material';
import "../css/style.css";

function Home() {
  return (
    <Box>
      <div className='fields'>
        <Typography variant="h1" id="title">Welcome to our recipe website!</Typography>
      </div>
      <div className='fields'>
        <Typography variant="body1">We offer you a variety of easy and delicious recipes free of charge! <br />Our recipe website is accessible to you at any time.</Typography>
      </div>
      <div className='fields'>
        <Typography variant="h5" className="text">Good luck and enjoy your meal!</Typography>
      </div>
    </Box>
  );
}

export default Home;