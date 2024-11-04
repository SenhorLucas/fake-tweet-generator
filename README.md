## Description

Batch-create fake Twitter posts from the terminal.


## Create your tweets

Open the `tweets.txt` file and write all of your desired tweets in there.

## Time to generate images

```sh
python3 -m venv venv
. venv/bin/activate
pip install -r requirements.txt
python3 generate.py
```

Your images are now saved under `out/image*.jpg`. Enjoy!
