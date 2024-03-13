import React, { useState } from 'react';;
import OrganizationLogin from './OrganizationLogin';   
import MemberLogin from './MemberLogin';
import ToggleSwitch from './ToggleSwith';

const Login = () => {

  return (
    <div className="max-w-md mx-auto">
      <ToggleSwitch
        component1={<OrganizationLogin />}
        component2={<MemberLogin />}
      />
    </div>
  );
};

export default Login;