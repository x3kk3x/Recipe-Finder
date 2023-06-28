import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { auth } from '../../services/Firebase/firebase';

const Profile = () => {
  const [cookies] = useCookies(['userToken']);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          setEmail(currentUser.email);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserEmail();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <p>User Email: {email}</p>
    </div>
  );
};

export default Profile;
