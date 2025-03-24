import { Typography, Box } from '@mui/material';
import "../css/style.css";

function Page() {
  return (
    <Box>
      <div className='fields'>
        <Typography variant="h1" id="title">Hello!</Typography>
      </div>
      <div className='fields'>
        <Typography variant="body1">On this site you will find a variety of easy and delicious recipes for free!
          <br /> Our recipe site is accessible at all times.</Typography>
      </div>
      <div className='fields'>
        <Typography variant="h5" className="text">Don't miss ---</Typography>
      </div>
    </Box>
  );
}

export default Page;