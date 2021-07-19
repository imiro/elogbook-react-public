import React, { useState } from 'react'
import {Redirect, useHistory} from 'react-router-dom'
import { useAuth } from '../providers/auth'
import Sidebar from './NavSidebar'
import Navbar from './Navbar'
import chevronLeft from '../assets/images/profile/chevron_left.png'
import editPhoto from '../assets/images/profile/edit_photo.png'
import editPassword from '../assets/images/profile/edit_password.png'
import error from '../assets/images/profile/error.png'
import message from '../assets/images/profile/message.png'

class Popup extends React.Component {
  render() {
    const hidePopup = () =>{
      document.getElementById("profile-popup").style.display = "none";
      document.getElementById("profile-box").style.display = "block";
      document.getElementById("profile-update-photo").style.display = "none";
      document.getElementById("profile-update-password").style.display = "none";
      document.getElementById("password").value ="";
      document.getElementById("passwordbaru").value ="";
      document.getElementById("passwordkonfirmasi").value ="";
      document.getElementById("error-new").style.display = "none";
      document.getElementById("error-confirm").style.display = "none";
      document.getElementById("passwordbaru").style.borderColor = "#C5C9D7";
      document.getElementById("passwordkonfirmasi").style.borderColor = "#C5C9D7";
    }
    return (
      <div className='popup' onClick={hidePopup}>
        <div className='popup-inner-profile'>
          <img src={message}></img>
          <div className="popup-profile-head">Password Baru Disimpan</div>
          <div className="popup-profile-content">Password baru yang Anda masukkan telah berhasil disimpan</div>
        </div>
      </div>
    );
  }
}

export default function ProfilePage() {
  
    const { user } = useAuth()
    const history = useHistory();
    const updatePhoto = () =>{
      document.getElementById("profile-box").style.display = "none";
      document.getElementById("profile-update-photo").style.display = "block";
      document.getElementById("profile-update-password").style.display = "none";
    }

    const updatePassword = () =>{
      document.getElementById("profile-box").style.display = "none";
      document.getElementById("profile-update-photo").style.display = "none";
      document.getElementById("profile-update-password").style.display = "block";
    }

    const mainProfile = () =>{
      document.getElementById("profile-box").style.display = "block";
      document.getElementById("profile-update-photo").style.display = "none";
      document.getElementById("profile-update-password").style.display = "none";
      document.getElementById("password").value ="";
      document.getElementById("passwordbaru").value ="";
      document.getElementById("passwordkonfirmasi").value ="";
      document.getElementById("error-new").style.display = "none";
      document.getElementById("error-confirm").style.display = "none";
      document.getElementById("passwordbaru").style.borderColor = "#C5C9D7";
      document.getElementById("passwordkonfirmasi").style.borderColor = "#C5C9D7";
    }

    const [isHide, setHide] = useState("false");

    const togglePassword = () => {
      setHide(!isHide);
      const password = document.querySelector('#password');
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
    };

    const [isHideNew, setHideNew] = useState("false");

    const togglePasswordNew = () => {
      setHideNew(!isHideNew);
      const password = document.querySelector('#passwordbaru');
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
    };

    const [isHideConfirm, setHideConfirm] = useState("false");

    const togglePasswordConfirm = () => {
      setHideConfirm(!isHideConfirm);
      const password = document.querySelector('#passwordkonfirmasi');
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
    };

    const [password, setPassword] = useState('')
    const [passwordNew, setPasswordNew] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const onChangePassword = (e) =>{
      setPassword(e.target.value)
    }

    const onChangeNewPassword = (e) =>{
      setPasswordNew(e.target.value);
      // alert(password==passwordNew);
      if(password===passwordNew){
        document.getElementById("passwordbaru").style.borderColor = "red";
        document.getElementById("error-new").style.display = "block";
      }
      else{
        // alert("masukfalse");
        document.getElementById("passwordbaru").style.borderColor = "#C5C9D7";
        document.getElementById("error-new").style.display = "none";
      }
    }

    const onChangeConfirmPassword = (e) =>{
        setPasswordConfirm(e.target.value)
        
        alert(passwordNew + " " + passwordConfirm)
        if(passwordNew!=passwordConfirm){
          document.getElementById("passwordkonfirmasi").style.borderColor = "red";
          document.getElementById("error-confirm").style.display = "block";
        }
        else{
          document.getElementById("passwordkonfirmasi").style.borderColor = "#C5C9D7";
          document.getElementById("error-confirm").style.display = "none";
        }
        
    }

    const showPopup = () => {
      document.getElementById("profile-popup").style.display = "block";
      // history.push('/profile');
    }

    return (
      <div className="container-dashboard">
        <Sidebar />
        <div className="content-dashboard">
          <Navbar page="Profile"/>
          <div id= "profile-popup" className="profile-popup"><Popup/></div>
          <div className="navbar-divider"></div>
          <div className="profile-bar"> <img src={chevronLeft} onClick= {()=> {history.goBack();}}></img>Kembali</div>
          <div className="dashboard-box">
            <div id="profile-box" className="profile-box">
              <div className="profile-avatar">JD<img src={editPhoto} onClick={updatePhoto}></img></div>
              <div className="profile-name">{user.name}</div>
              <div className="profile-id-box">
                <div className="profile-id-label">Nama</div>
                <div className="profile-id-value">{user.name}</div>
                <div className="profile-id-label">Nomor Induk Mahasiswa</div>
                <div className="profile-id-value">{user.npm ? user.npm : ""}</div>
                <div className="profile-id-label">Email UI </div>
                <div className="profile-id-value">{user.email}</div>
                <div className="profile-id-label">Kata sandi<img src={editPassword} onClick={updatePassword}></img></div>
              </div>
            </div>
            <div id="profile-update-photo" className="profile-box">hahahah</div>
            <div id="profile-update-password" className="profile-box">
              <div className="profile-update-password-text">Edit Password</div>
                <div className="profile-update-box">
                <form>
                  <div className="profile-update-label">Password Saat Ini</div>
                  <div className= "profile-password-box"> 
                    <input onChange={onChangePassword} id="password" type="password" name="password" placeholder="Masukkan password saat ini" className="profile-textfield"></input>
                    <div id="toggle-profile" className={isHide ? "hide-password" : "show-password"} onClick={togglePassword}></div>
                  </div>
                  <div className="profile-update-label">Password Baru</div>
                  <div className= "profile-password-box">
                    <input onChange={onChangeNewPassword} id="passwordbaru" type="password" name="password" placeholder="Masukkan password baru" className="profile-textfield"></input>
                    <div id="toggle-profile" className={isHideNew ? "hide-password" : "show-password"} onClick={togglePasswordNew}></div>
                  </div>
                  <div id="error-new" className="error-password"><img src={error}></img>Password baru harus berbeda dengan password saat ini</div>
                  <div className="profile-update-label">Konfirmasi Password Baru </div>
                  <div className= "profile-password-box"> 
                    <input onChange={onChangeConfirmPassword} id="passwordkonfirmasi" type="password" name="passwordkonfirmasi" placeholder="Konfirmasi password baru" className="profile-textfield"></input>
                    <div id="toggle-profile" className={isHideConfirm ? "hide-password" : "show-password"} onClick={togglePasswordConfirm}></div>
                  </div>
                  <div id="error-confirm" className="error-password"><img src={error}></img>Konfirmasi Password baru tidak sesuai</div>
                  <div className = "profile-update-password-button-box">
                    <div onClick={showPopup} className="profile-update-password-save-button">Simpan</div>
                    <div onClick={mainProfile} className="profile-update-password-cancel-button">Batal</div>
                  </div> 
                  </form> 
                  {passwordConfirm}
                </div>
            </div>
          </div>
        </div>
      </div>
    )
}

