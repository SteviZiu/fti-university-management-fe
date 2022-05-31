//this class is done to make us of UseNavigate hook function on class components
//provided on larger > v5 of react-router-dom. 
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    
    return (
      <Component
        navigate={navigate}
        {...props}
        />
    );
  };
  
  return Wrapper;
};