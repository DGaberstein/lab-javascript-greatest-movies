// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    const directors = moviesArray.map(movie => movie.director);
    const uniqueDirectors = [...new Set(directors)];
    return uniqueDirectors;
  }

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    const spielbergDramas = moviesArray.filter(movie => movie.director === "Steven Spielberg" && movie.genre.includes("Drama"));
    return spielbergDramas.length;
  }

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    const totalScore = moviesArray.reduce((acc, movie) => {
      return acc + (movie.score || 0);
    }, 0);
    const averageScore = totalScore / moviesArray.length || 0;
    return parseFloat(averageScore.toFixed(2));
  }

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramas = moviesArray.filter(movie => movie.genre.includes("Drama"));
  const totalScore = dramas.reduce((acc, movie) => {
    return acc + (movie.score || 0);
  }, 0);
  if (dramas.length === 0) return 0;
  const averageScore = totalScore / dramas.length;
  return parseFloat(averageScore.toFixed(2));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    const sortedArray = moviesArray.slice().sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
    return sortedArray;
  }

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    const sortedTitles = moviesArray.map(movie => movie.title).sort();
    return sortedTitles.slice(0, 20);
  }

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    const parseDuration = duration => {
      const hoursIndex = duration.indexOf('h');
      const minutesIndex = duration.indexOf('min');
      let hours = 0;
      let minutes = 0;
      if (hoursIndex !== -1) {
        hours = parseInt(duration.substring(0, hoursIndex));
      }
      if (minutesIndex !== -1) {
        const minutesStr = duration.substring(hoursIndex + 1, minutesIndex);
        minutes = parseInt(minutesStr.trim());
      }
      return hours * 60 + minutes;
    };
    const updatedMovies = moviesArray.map(movie => ({
      ...movie,
      duration: parseDuration(movie.duration)
    }));
    return updatedMovies;
  }
  
// BONUS - Iteration 8: Best yearly score average
function bestYearAvg(moviesArray) {
    if (moviesArray.length === 0) return null;
    if (moviesArray.length === 1) {
      return {
        year: moviesArray[0].year,
        average: moviesArray[0].score || 0
      };
    }
    const yearScores = {};
    moviesArray.forEach(movie => {
      if (yearScores[movie.year]) {
        yearScores[movie.year].totalScore += movie.score || 0;
        yearScores[movie.year].count++;
      } else {
        yearScores[movie.year] = {
          totalScore: movie.score || 0,
          count: 1
        };
      }
    });
    for (const year in yearScores) {
      yearScores[year].averageScore = yearScores[year].totalScore / yearScores[year].count;
    }
    let bestYear = null;
    let highestAverage = -Infinity;
    let oldestYear = Infinity;
    
    for (const year in yearScores) {
      const currentAverage = yearScores[year].averageScore;
      if (currentAverage > highestAverage || (currentAverage === highestAverage && parseInt(year) < oldestYear)) {
        bestYear = year;
        highestAverage = currentAverage;
        oldestYear = parseInt(year);
      }
    }
    return {
      year: oldestYear,
      average: parseFloat(highestAverage.toFixed(2))
    };
  }