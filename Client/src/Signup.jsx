


import React, { useState } from 'react';
import axios from 'axios';
import MemberSignupForm from './MemberSignup';
import LoginForm from './MemberLogin';

const SignupForm = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="max-w-md mx-auto">
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Toggle
        </label>
        <input
          type="checkbox"
          checked={toggle}
          onChange={handleToggle}
          className="mr-2"
        />
        {toggle ? (
          <div>
            
            <div>
                <LoginForm />
            </div>
          </div>
        ) : (
          <div>
            <div>
                <MemberSignupForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
