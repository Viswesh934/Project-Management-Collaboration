import React from 'react';
import { Link } from 'react-router-dom'; 
// Import Link from react-router-dom
import OrganizationLogin from './OrganizationLogin';
import MemberLogin from './MemberLogin';
import ToggleSwitch from '../ToggleSwith';

const Login = () => {
  return (
    <div className="max-w-md mx-auto">
      <ToggleSwitch
        component1={<OrganizationLogin />}
        component2={<MemberLogin />}
      />
      <p className="text-center mt-4">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default Login;
