import React from 'react'

export const InputComponent = () => {
  return (
      <div className={styles.input_enabled}>
          <input
              className={styles.header_input}
              maxLength={35}
              placeholder="Поиск статьи по заголовку или тексту..."
          />
          <FontAwesomeIcon
              className={styles.mark_button}
              icon={faXmark}
              onClick={toggleHeader}
          />
      </div>
  );
}
