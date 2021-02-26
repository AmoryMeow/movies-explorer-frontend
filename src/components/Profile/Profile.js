import React from 'react';
import './Profile.css';

function Profile() {

  const [viewMode, setViewMode] = React.useState(true);
  
  function handleEditClick(evt) {
    evt.preventDefault();
    setViewMode(false) 
  }

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form className="profile__form" action="post" name="profile" noValidate>
        <article className="profile__field">
          <label class="profile__label">Имя
            <input class="profile__input profile__input_type_name" id="name-input" type="text" name="name" 
              placeholder="Имя" required minlength="2" maxlength="30" disabled={viewMode}/>
          </label>
        </article>
        <article className="profile__field">
          <label class="profile__label">Почта
            <input class="profile__input profile__input_type_email" id="email-input" type="text" name="email" 
              placeholder="Почта" required minlength="2" maxlength="30" disabled={viewMode}/>
          </label>
        </article>
        <div className="profile__buttons">
          {viewMode ? (
            <>
              <button className="profile__button profile__button_type_edit" onClick={handleEditClick}>Редактировать</button>
              <button className="profile__button profile__button_type_exit">Выйти из аккаунта</button>
            </>
          ) :(
            <>
              <span class="profile__error" id="name-input-error">ошибка</span>
              <button className="profile__button profile__button_type_save">Сохранить</button>
            </>
          )}
        </div>     
      </form>
    </section>
  );
}

export default Profile;