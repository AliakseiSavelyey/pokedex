import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({ type, color }) => (
  <ReactLoading className='preloader'
    type={'spinningBubbles'}
    color={'#000'}
    height={'30%'}
    width={'30%'}
  />
);

export default Loading;
