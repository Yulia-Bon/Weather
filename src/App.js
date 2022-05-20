import React, { useState } from 'react';

// доступ к API сервиса погоды
// https://openweathermap.org/
const api = {
  key: '7ffa6a584f2f599df7aa28b45620841e',
  base: 'http://api.openweathermap.org/data/2.5/'
}

function App() {

  // действия при изменении города в поле ввода
  const [city, setCity] = useState('');

  // действия с данными погоды
  const [weather, setWeather] = useState({});


  // обработчик, который срабатывает когда нажата клавиша Enter
  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`) // отправляем запрос к api
          .then(res => res.json())  // ответ преобразуем в json
          .then(result => {         // работаем с результатом
            setWeather(result);
            setCity('');
            console.log(result);
          });
    }
  }

  // форматирование даты
  const format_date = (d) => {
    let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  // JSX разметка
  return (
      <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'body_warm' : (weather.main.temp < 1) ? 'body_cold' : 'body') : 'body'}>
        <main>
          <div className='header__search-box'>
            <input
                type='text'
                className='header__search-bar'
                placeholder='Поиск...'
                onChange={e => setCity(e.target.value)}
                value={city}
                onKeyPress={search}
            />
          </div>
          {(typeof weather.main != 'undefined') ? (
              <div>
                <div className='location-box'>
                  <div className='location-box__location'>{weather.name}, {weather.sys.country}</div>
                  <div className='location-box__date'>{format_date(new Date())}</div>
                </div>
                <div className='weather-box'>
                  <div className='weather-box__temp'>
                    {Math.round(weather.main.temp)}°c
                  </div>
                  <div className='weather-box__weather'>{weather.weather[0].main}</div>
                </div>
              </div>
          ) : ('')}
        </main>
      </div>
  );
}

export default App;
