import React, { useState } from 'react';
import axios from 'axios';
import Osignup from './osignup';
import SignupForm from './membersignup';        
import ToggleSwitch from './ToggleSwitch';

const SignUp = () => {

  return (
    <div className="max-w-md mx-auto">
      <ToggleSwitch
        component1={<Osignup />}
        component2={<SignupForm/>}
      />
    </div>
  );
};

export default SignUp;
