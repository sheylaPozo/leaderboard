/* eslint-disable linebreak-style */
import './style.css';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/oaP1XqMFPoB60pz4ScpD/scores/';

const submitBtn = document.getElementById('submitBtn');

const displayResult = (user) => {
  const ul = document.getElementById('ulList');

  user.forEach((player) => {
    const li = document.createElement('li');
    li.classList.add('table-row');

    const nameText = document.createElement('p');
    nameText.innerHTML = `${player.user}: ${player.score}`;

    li.appendChild(nameText);
    ul.appendChild(li);
  });
};

const request = new XMLHttpRequest();
async function getUser(url) {
  const promise = new Promise((resolve) => {
    request.open('GET', url);
    request.onload = () => {
      if (request.status === 200) {
        resolve(request.response);
      } else {
        resolve('error');
      }
    };
    request.send();
  });

  const list = JSON.parse(await promise);
  return list.result;
}

getUser(url);

const removeListItems = () => {
  const ul = document.getElementById('ulList');
  let child = ul.lastElementChild;
  while (child) {
    ul.removeChild(child);
    child = ul.lastElementChild;
  }
};

const refreshBtn = document.getElementById('refreshBtn');
refreshBtn.addEventListener('click', async () => {
  removeListItems();
  displayResult(await getUser(url));
});

const sendData = (name, score) => {
  const data = `user=${name}&score=${score}`;
  request.open('POST', url, true);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.send(data);
};

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.getElementById('userName').value;
  const score = document.getElementById('userScore').value;
  if (name.length > 0 && score >= 0) {
    sendData(name, score);
  } else {
    throw new Error('invalid input');
  }
  document.getElementById('userName').value = '';
  document.getElementById('userScore').value = '';
//   }
});

const thisScores = await getUser(url);

displayResult(thisScores);
