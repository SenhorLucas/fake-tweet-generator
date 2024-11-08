const avatar = './assets/avatar.jpg'
const fileName = document.getElementById('file-name');
const fullname = 'Lucas Viiana'
const username = 'ViianaCodes'
const message = `Some inpirational quote here.

And some more.

The end.
`
const retweets = 132
const quotes = 0
const likes = 4258
const themeRadios = 'dark'  // dim, dark, anything else
const verified = true

// Preview's DOM elements
const tweetBox = document.getElementById('tweet_box');
const tweet = document.getElementById('tweet');
const tweetAvatar = document.getElementById('tweet_avatar');
const tweetName = document.getElementById('tweet_name');
const tweetVerified = document.getElementById('tweet_verified');
const tweetUsername = document.getElementById('tweet_username');
const tweetMessage = document.getElementById('tweet_message');
const tweetRetweets = document.getElementById('tweet_retweets');
const tweetQuotes = document.getElementById('tweet_quotes');
const tweetLikes = document.getElementById('tweet_likes');

// Capturing Download button
const download = document.getElementById('download');

// Theme
let themeColor = '#ffffff';

// Number Formatter for Retweets, Quote Tweets and Likes
function numberFormatter(num, fixed) {
  // terminate early
  if (num === null) {
    return null;
  }

  // terminate early
  if (num === 0) {
    return '0';
  }

  fixed = !fixed || fixed < 0 ? 0 : fixed; // number of decimal places to show

  let b = num.toPrecision(2).split('e'), // get power
    k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
    c =
      k < 1
        ? num.toFixed(0 + fixed)
        : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
    d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
    e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power

  return e;
}

// Render Profile Picture in Tweet
function renderProfilePicture() {
  const [file] = './assets/avatar.jpg'
  if (file) {
    tweetAvatar.crossOrigin = "Anonymous"
    tweetAvatar.src = URL.createObjectURL(file);
  }
}

// Render Name in Tweet
function renderName() {
  const nameValue = fullname.trim();

  tweetName.innerText = nameValue;
}

// Render Username in Tweet
function renderUsername() {
  const usernameValue = username.trim();
  tweetUsername.innerText = usernameValue;
}

// Render Message in Tweet
function renderMessage() {
  const messageValue = message.trim();

  if (messageValue === '') {
    tweetMessage.innerText = 'Generate convincing fake tweet images';
  } else {
    tweetMessage.innerText = '';
    messageValue.split(' ').forEach((token) => {
      if (token.match(/^@(\w){1,20}$/)) {
        const spanEl = document.createElement('span');
        spanEl.className = 'highlight';
        spanEl.innerText = token;
        tweetMessage.append(spanEl);
        tweetMessage.append(' ');
      } else if (token.match(/^@(\w){21,}$/)) {
        const spanEl = document.createElement('span');
        spanEl.className = 'highlight';
        spanEl.innerText = token.slice(0, 21);
        tweetMessage.append(spanEl);
        tweetMessage.append(token.slice(21));
        tweetMessage.append(' ');
      } else if (token.match(/^@\w+/)) {
        const spanEl = document.createElement('span');
        spanEl.className = 'highlight';
        spanEl.innerText = token.match(/^@\w+/);
        tweetMessage.append(spanEl);
        tweetMessage.append(token.match(/(?<=\w)\W+/));
        tweetMessage.append(' ');
      } else {
        tweetMessage.append(token);
        tweetMessage.append(' ');
      }
    });

    // To preserve line breaks
    tweetMessage.innerHTML = tweetMessage.innerHTML.replace(/\n/g, '<br>\n');
  }

  let test = `hey there @shashi how are you?`;
}

// Render Retweets in Tweet
function renderRetweets() {
  tweetRetweets.parentElement.classList.remove('hide');
  let retweetsValue = retweets;

  if (retweetsValue === '') {
    tweetRetweets.innerText = '96';
  } else {
    retweetsValue = +retweetsValue;
    if (retweetsValue >= 0) {
      if (retweetsValue === 0) {
        tweetRetweets.parentElement.classList.add('hide');
      } else {
        tweetRetweets.innerText = numberFormatter(retweetsValue);
      }
    } else {
      tweetRetweets.innerText = '96';
    }
  }
}

// Render Quotes in Tweet
function renderQuotes() {
  tweetQuotes.parentElement.classList.remove('hide');
  let quotesValue = quotes;

  if (quotesValue === '') {
    tweetQuotes.innerText = '88';
  } else {
    quotesValue = +quotesValue;
    if (quotesValue >= 0) {
      if (quotesValue === 0) {
        tweetQuotes.parentElement.classList.add('hide');
      } else {
        tweetQuotes.innerText = numberFormatter(quotesValue);
      }
    } else {
      tweetQuotes.innerText = '88';
    }
  }
}

// Render Likes in Tweet
function renderLikes() {
  tweetLikes.parentElement.classList.remove('hide');
  let likesValue = likes;

  if (likesValue === '') {
    tweetLikes.innerText = '153';
  } else {
    likesValue = +likesValue;
    if (likesValue >= 0) {
      if (likesValue === 0) {
        tweetLikes.parentElement.classList.add('hide');
      } else {
        tweetLikes.innerText = numberFormatter(likesValue);
      }
    } else {
      tweetLikes.innerText = '153';
    }
  }
}


// Set Theme
function toggleTheme(ev) {
  let choice = themeRadios;

  if (choice === 'dim') {
    tweet.className = 'tweet dim';
    tweetBox.className = 'tweet_box dim';
    themeColor = '#15202b';
  } else if (choice === 'dark') {
    tweet.className = 'tweet dark';
    tweetBox.className = 'tweet_box dark';
    themeColor = '#000000';
  } else {
    tweet.className = 'tweet';
    tweetBox.className = 'tweet_box';
    themeColor = '#ffffff';
  }
}

// Toggle Verified Badge
function toggleVerified() {
  if (verified) {
    tweetVerified.classList.remove('hide');
  } else {
    tweetVerified.classList.add('hide');
  }
}

// Generate filenames for the image which is to be downloaded
function generateFileName() {
  return `tweet${Math.floor(Math.random() * 90000) + 10000}`;
}

// Download it to the local machine
function saveAs(uri, filename) {
  const link = document.createElement('a');

  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);

    //simulate click
    link.click();

    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

// Take screenshot of the tweet
function takeScreenshot() {
  window.scrollTo(0, 0);
  html2canvas(document.querySelector('.tweet'), {
    allowTaint: true,
    backgroundColor: themeColor,
    useCORS: true,
    scrollX: -window.scrollX,
    scrollY: -window.scrollY,
    windowWidth: document.documentElement.offsetWidth,
    windowHeight: document.documentElement.offsetHeight,
  }).then((canvas) => {
    saveAs(canvas.toDataURL(), 'screenshot1');
  });
}

// On load
//renderProfilePicture();
renderName();
renderUsername();
renderMessage();
renderRetweets();
renderQuotes();
renderLikes();
toggleTheme('dark')
toggleVerified()

download.addEventListener('click', takeScreenshot);

// takeScreenshot();
