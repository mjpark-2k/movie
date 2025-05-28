import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import List from '../component/List';
import { store } from '../store/store';
import { detail } from '../api/movies';

const Main = () => {
  let navigator = useNavigate();
  let {data,dataCtrl} = store();
  let {state} = useLocation();
  let [info,setInfo] = useState();

  console.log(state);

  useEffect(()=>{
    (async function(){
        setInfo()
    }())
  },[])

   return (
    <div className="movie">
      <div className='top3'>
        <Swiper 
          autoplay={{delay: 2500, disableOnInteraction: false,}} 
          loop={true} 
          navigation={true} 
          modules={[Autoplay, Navigation]} 
          className="mySwiper"> 
          {
            data.popular.map((obj,k)=>
              (k<3) ? (
                <SwiperSlide key={obj.id}>
                  <div className='top'>
                    <div className='txt'>
                      <h2>{obj.title}</h2>
                      <div><h3 onClick={()=>navigator('/content',{state:{id:obj.id, type:'movie'}})}>WATCH NOW</h3></div>
                    </div>
                    <figure onClick={()=>navigator('/content')}><img src={'https://image.tmdb.org/t/p/original/'+obj.poster_path}/></figure>
                  </div>
                  <div className='bgimg'><img src={'https://image.tmdb.org/t/p/original/'+obj.backdrop_path}/></div>
                </SwiperSlide>
              ) :''
            )
          }
        </Swiper>
      </div>
      <List name="m2" title="MOVIE TOP 20" on="/movie" data={data.movieTop} thumb="title" type='movie' />
      <List name='t2' title="TV SERIES TOP 20" on='/tvseries' data={data.tvTop} thumb="name" type='tv'/>
    </div>
  )
}

export default Main