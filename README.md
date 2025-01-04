<a href="https://aniquest-eta.vercel.app/">
<img src="./src/assets/Logo.png" alt="AniQuest Logo" width="250px">
</a>

# AniQuest - Discover Anime

[AniQuest](https://aniquest-eta.vercel.app/) is a React-based web application designed to help users discover and explore anime. Built with Vite for fast development and optimized performance, AniQuest uses the [Jikan API](https://jikan.moe/) to fetch and display detailed anime data.



## Demo

Visit AniQuest [here](https://aniquest-eta.vercel.app/) :)


## Features

- **Browse Popular, Upcoming, and Trending Anime**: Explore curated lists of trending, upcoming, and popular anime effortlessly.
- **TV Shows and Movies**: Easily browse anime TV shows and movies.
- **Explore by Genres**: Browse anime by different genres to find what matches your mood.
- **Detailed Anime Info**: View in-depth information about each anime, including synopsis, genres, rating, and more.
- **Search Anime**: Quickly find anime using the dynamic search bar.
- **Watchlist**: Save your favorite anime to a watchlist using local storage, so your data is preserved even after a page refresh.
- **Share Anime**: Share your favorite anime with friends using the built-in share feature.
- **Responsive Design**: [AniQuest](https://aniquest-eta.vercel.app/) is fully optimized for all devices, from desktops to mobile screens.


## Tech Stack

- **React.js**: For building an interactive and efficient UI.
- **Vite**: For a fast and optimized development experience.
- **Jikan API**: For fetching real-time anime data.
- **Local Storage**: To persist user watchlist data.
- **CSS Modules**: For styling components with scoped styles.

## Installation

Install [AniQuest](https://aniquest-eta.vercel.app/) with npm.


```bash
  git clone https://github.com/your-username/aniquest.git  

  cd aniquest

  npm install  

  npm run dev  
```
### Access AniQuest in Your Browser:

Once the development server is running, open your browser and navigate to:

```bash
  http://localhost:5173  
```
## API Integration

AniQuest uses the [Jikan API](https://jikan.moe/) to fetch and display real-time anime data.

### Example API Request

```bash
  fetch('https://api.jikan.moe/v4/anime?q=naruto')  
  .then((response) => response.json())  
  .then((data) => console.log(data));
```
## Future Enhancements

- **User Accounts**: Enable users to create accounts and sync watchlists across devices.
- **Recommendations**: Suggest anime based on users' watchlist or search history.
- **Advanced Filters**: Add filters for studios, release years, and airing status.
- **Anime Trailers**: Embed trailers for a richer experience.
## Contributing

Got an idea to make **AniQuest** even better? Or maybe you found a bug that needs squashing? Awesome! We’d love to have you onboard. Here’s how you can help:

- **Fork the Repository**: Click the fork button at the top of this page to get your own copy of AniQuest.
- **Make Your Changes**: Whether you’re fixing a bug, adding a cool new feature, or improving the design, go ahead and do your thing!
- **Submit a Pull Request**: Once you're happy with your changes, submit a pull request so we can check it out and merge it into the project.

We’re all about collaboration, so don’t worry if you’re new to contributing—it’s a great way to learn and grow! And if you’re stuck or have questions, just open an issue, and we’ll be there to help.

Let’s make AniQuest awesome together! 🚀

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

