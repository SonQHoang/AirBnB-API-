import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../Modals/LoginFormModal'
import SignupFormModal from '../Modals/SignupFormModal';
import CreateSpotForm from '../Forms/CreateSpotForm'
import { useHistory } from 'react-router-dom';
import './profile-button.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const [showCreateSpotForm, setShowCreateSpotForm] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => {
    setShowMenu(false);
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/")
  };

  const goToUserSpots = () => {
    history.push("/spots/current");
    closeMenu()
  }


  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className="profile-button" onClick={openMenu}>
        <i className="fas fa-bars" />
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            {/* <li>{user.username}</li> */}
            <li>Hello {user.firstName}</li>
            <li>{user.email}</li>
            <li>
              <button className="profile-manage-spots" onClick={goToUserSpots}>Manage Spots</button>
            </li>

            <li>
              <button className="profile-log-out" onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
      {showCreateSpotForm && <CreateSpotForm onClose={() => setShowCreateSpotForm(false)} />}
    </>
  );
}

export default ProfileButton;