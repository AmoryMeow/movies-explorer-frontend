import React from 'react';
import { NavLink } from 'react-router-dom';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import './Profile.css';

function Profile({onSaveProfile, onSignOut}) {

  const currentUser = React.useContext(CurrentUserContext);

  const [viewMode, setViewMode] = React.useState(true);
  
  function handleEditClick(evt) {
    evt.preventDefault();
    setViewMode(false) 
  }

  function handleSignOut() {
    onSignOut();
  }

  function handleOnSubmit(evt) {
    evt.preventDefault();
    onSaveProfile();
  }

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form className="profile__form" action="post" name="profile" noValidate onSubmit={handleOnSubmit}>
        <article className="profile__field">
          <label className="profile__label">Имя
            <input className="profile__input profile__input_type_name" id="name-input" type="text" name="name" 
              placeholder="Имя" required minLength="2" maxLength="30" 
              disabled={viewMode} value={currentUser.name}/>
          </label>
        </article>
        <article className="profile__field">
          <label className="profile__label">Почта
            <input className="profile__input profile__input_type_email" id="email-input" type="text" name="email" 
              placeholder="Почта" required minLength="5" maxLength="100" 
              disabled={viewMode} value={currentUser.email}/>
          </label>
        </article>
        <div className="profile__buttons">
          {viewMode ? (
            <>
              <button type="button" className="profile__button profile__button_type_edit" onClick={handleEditClick}>Редактировать</button>
              <button type="button" className="profile__button profile__button_type_exit" onClick={handleSignOut}>Выйти из аккаунта</button>
            </>
          ) :(
            <>
              <span className="profile__error" id="name-input-error">ошибка</span>
              <button type="submit" className="profile__button profile__button_type_save">Сохранить</button>
            </>
          )}
        </div>     
      </form>
    </section>
  );
}

export default Profile;