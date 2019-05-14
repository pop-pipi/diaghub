# DiagHub

A business application to enable tracking of sub-contractors in the field, job management and allocation. The DiagHub utilises an underlying AI to provide the most appropriate route to drivers to ensure both them and their cargo remains safe, using heuristics to provide a quality rating for each path.

## Requirements
* Python 3 - https://www.python.org/downloads/
* Python pip (may be included with your python installation)
* Optional - Virtual Environment (Installation instructions provided in "Starting the app")
###### Dependencies are location in requirements.txt, I suggest using Virtual Environment to install and manage these

## Starting the app
Download the project, right click and extract from the archive, navigate to the project directory, (../DiagHub/), in terminal/command prompt, and execute the following:

#### MacOS/Linux 

0. Install Virtual Environment (I recommend you use this to manage dependencies)
```
python3 -m pip install --user virtualenv
```

1. Start a virtual directory
```
python3 -m venv env
```

2. Activate the local directory
```
source env/bin/activate
```

3. Install requirements using pip
```
pip install -r requirements.txt
```

4. Starting the application
```
python manage.py runserver
```

#### Windows

0. Install Virtual Environment (I recommend you use this to manage dependencies)
```
py -m pip install --user virtualenv
```

1. Start a virtual directory
```
py -m venv env
```

2. Activate the local directory
```
.\env\Scripts\activate
```

3. Install requirements using pip
```
pip install -r requirements.txt
```

4. Starting the application
```
py manage.py runserver
```

## Running the app

After executing the following
```
py manage.py runserver
```

Open a browser and navigate to http://127.0.0.1:8000
