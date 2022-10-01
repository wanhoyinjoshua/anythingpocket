import React  from 'react';
import { useSwiper } from 'swiper/react';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
export  function Slidenext(status: any) {
  const theme = useTheme();
  const swiper = useSwiper();

  return (
    <Button
    size="small"
    onClick={()=>swiper.slideNext()}
    disabled={status.status === 3 - 1}
  >
    
    Next
    {theme.direction === "rtl" ? (
      <KeyboardArrowLeft />
    ) : (
      <KeyboardArrowRight />
    )}
  </Button>
    
  );
}

export function Slideback(status: any) {
    const swiper = useSwiper();
    const theme = useTheme();
  
    return (
      <Button
      size="small"
      onClick={()=>swiper.slidePrev()}
      disabled={status.status === 0}
    >
      Back
      {theme.direction === "rtl" ? (
        <KeyboardArrowLeft />
      ) : (
        <KeyboardArrowRight />
      )}
    </Button>
    );
  }