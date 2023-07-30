const jokeCategoryElement = document.getElementById('jokeCategory');
const jokeElement = document.getElementById('joke');

document.getElementById('getJokeButton').addEventListener('click', async () => {
  const selectedCategory = document.getElementById('category').value;
  const jokeData = await fetchJoke(selectedCategory);

  if (jokeData) {
    jokeCategoryElement.textContent = jokeData.category;
    jokeCategoryElement.style.color = getRandomColor(); 
    jokeElement.textContent = jokeData.joke;
    jokeElement.style.color = getRandomColor(); 
  } else {
    jokeCategoryElement.textContent = '';
    jokeElement.textContent = 'Oops! Something went wrong. Please try again later.';
  }
});

async function fetchJoke(category) {
  try {
    const apiUrl = `https://v2.jokeapi.dev/joke/${category}?type=single`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return {
      category: data.category,
      joke: data.joke
    };
  } catch (error) {
    console.log('Error fetching joke:', error);
    return null;
  }
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
