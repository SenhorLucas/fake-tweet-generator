import io
import os
import random

from PIL import Image
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options


tweets = 'tweets.txt'

def read_tweets():
    with open(tweets, 'r') as f:
        tweet = ''
        for line in f:
            if line.startswith('---'):
                if tweet:
                    print(tweet)
                    yield tweet
                    tweet = ''
            else:
                tweet += line
        if tweet:
            print(tweet)
            yield tweet


def patch_js(message, retweets, quotes, likes):
    """
    An anholy hack to avoid rewriting the full JS code with Jinja.
    """
    new_version = ''
    app_js = 'js/app.js'
    with open(f'{app_js}.in', 'r') as old_version:
        for line in old_version:
            if line.startswith('const message'):
                message.replace('`', '\`')
                line = f'const message = `{message}`\n'
            elif line.startswith('const retweets'):
                line = f'const retweets = {retweets}\n'
            elif line.startswith('const quotes'):
                line = f'const quotes = {quotes}\n'
            elif line.startswith('const likes'):
                line = f'const likes = {likes}\n'
            new_version += f'{line}'
    with open(app_js, 'w') as old_version:
        old_version.write(new_version)


def generate_image(i):
    options = Options()
    options.add_argument("--headless")

    with webdriver.Chrome(options) as driver:
        driver.get(f"file://{os.getcwd()}/index.html")
        image_binary = driver.find_element(By.ID, "tweet_box").screenshot_as_png
        img = Image.open(io.BytesIO(image_binary))
        os.makedirs("out", exist_ok=True)
        img.save(f"out/image{i}.png")


def main():
    for i, tweet in enumerate(read_tweets()):
        patch_js(tweet, random.randrange(50, 150), 0, random.randrange(3000, 9000))
        generate_image(i)


if __name__ == '__main__':
    main()
