import joblib
import requests

model_rf = joblib.load('models/random_forest.pkl')
model_knn = joblib.load('models/knn.pkl')
model_dt = joblib.load('models/decision_tree.pkl')
model_xgb = joblib.load('models/xgboost.pkl')

model_map = {
    "Random_Forest": model_rf,
    "KNN": model_knn,
    "Decision_Tree": model_dt,
    "XGBoost": model_xgb
}

cause_map = {
    0: "Arson/incendiarism",
    1: "Debris and open burning",
    2: "Equipment and vehicle use",
    3: "Firearms and explosives use",
    4: "Fireworks",
    5: "Misuse of fire by a minor",
    6: "Natural",
    7: "Power generation/transmission/distribution",
    8: "Railroad operations and maintenance",
    9: "Recreation and ceremony",
    10: "Smoking"
}

geocode_url = "https://maps.googleapis.com/maps/api/geocode/json"


def run_prediction(data):
    model = model_map[data.get('Model', 'KNN')]
    street = data.get('Street', '')
    city = data.get('City', '')
    state = data.get('State', '')
    zip = data.get('Zip', '')
    month = float(data.get('Month', 8))
    day = float(data.get('Day', 1))
    lat = data.get('Latitude')
    lon = data.get('Longitude')

    print(data)###

    if lat is None or lon is None:
        location = street + ', ' + city + ', ' + state + ', ' + zip
        if location:
            # TODO: create a different API key for the backend and configure with gitignored .env
            auth_key = ''
            location_detail = {'address': location, 'key': auth_key}
            response = requests.get(url=geocode_url, params=location_detail)
            print(response)
            response_data = response.json()
            lat = response_data['results'][0]['geometry']['location']['lat']
            lon = response_data['results'][0]['geometry']['location']['lng']

    Ypredict = model.predict([[lat, lon, day, month]])
    Ypredict = Ypredict.tolist()
    return {
        'cause': cause_map[int(Ypredict[0][0])],
        'size': Ypredict[0][1],
    }
