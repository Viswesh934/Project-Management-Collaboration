import React, { useState } from 'react';;
import OrganizationSignup from './OrganizationSignup';
import MemberSignup from './MemberSignup';      
import ToggleSwitch from '../ToggleSwith';

const Signup = () => {

  return (
    <div className="max-w-md mx-auto">
      <ToggleSwitch
        component1={<OrganizationSignup />}
        component2={<MemberSignup/>}
      />
    </div>
  );
};

export default Signup;