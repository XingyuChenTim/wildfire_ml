from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
import pandas as pd

from prediction import run_prediction

app = Flask(__name__)
CORS(app)

global_fire_data = pd.read_csv(f'{app.root_path}/Global_Wildfire_NASA.csv', dtype={
    'latitude': float,
    'longitude': float,
})
global_fire_data.sort_values('bright_t31', ascending=False, inplace=True)
print(global_fire_data.info())

@app.route('/', methods=['GET'])
def home():
    if request.method == 'GET':
        return jsonify({
            'message': 'Welcome to the Firewatch API.'
        }), 200


@app.route('/view', methods=['POST'])
def view():
    data = request.get_json()

    df = global_fire_data
    df = df[(df.latitude >= float(data['minLat'])) | (df.longitude >= float(data['minLon']))]
    df = df[(df.latitude <= float(data['maxLat'])) | (df.longitude <= float(data['maxLon']))]
    df = df.sample(min(len(df), 500))
    # df = df[:100]

    result = df.to_dict('records')
    return jsonify(result), 200


@app.route('/prediction', methods=['POST'])
def prediction():
    data = request.get_json()

    try:
        result = run_prediction(data)
        return jsonify(result), 200
    except Exception as error:
        print(error)  ###
        return jsonify({
            'message': 'Could not make prediction',
        }), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
