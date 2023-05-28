import pickle
from geopy.adapters import GeocoderTimedOut
import tensorflow as tf
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler

from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

from faker import Faker
import pandas as pd

fake = Faker()

country_capitals_list_train = [ 
    ("Afghanistan", 34.516666, 69.183334),
    ("Albania", 41.33165, 19.8318),
    ("Algeria", 36.7538, 3.0401),
    ("Andorra", 42.5063, 1.5218),
    ("Angola", -8.81155, 13.242),
    ("Antigua and Barbuda", 17.118, -61.85),
    ("Argentina", -34.603722, -58.381592),
    ("Armenia", 40.1872, 44.5152),
    ("Australia", -35.282, 149.1287),
    ("Austria", 48.2082, 16.3738),
    ("Azerbaijan", 40.3834, 49.8932),
    ("Bahamas", 25.048, -77.3554),
    ("Bahrain", 26.2285, 50.586),
    ("Bangladesh", 23.8103, 90.4125),
    ("Barbados", 13.1137, -59.598),
    ("Belarus", 53.9022, 27.5618),
    ("Belgium", 50.8503, 4.3517),
    ("Belize", 17.4982, -88.1884),
    ("Benin", 6.335, 5.604),
    ("Bhutan", 27.4728, 89.6393),
    ("Bolivia", -16.5004, -68.1342),
    ("Bosnia and Herzegovina", 43.8564, 18.4131),
    ("Botswana", -24.6282, 25.9231),
    ("Brazil", -15.7801, -47.9292),
    ("Brunei", 4.8857, 114.932),
    ("Bulgaria", 42.6977, 23.3219),
    ("Burkina Faso", 12.3703, -1.5247),
    ("Burundi", -3.3822, 29.3644),
    ("Cambodia", 11.5564, 104.9282),
    ("Cameroon", 3.848, 11.5021),
    ("Canada", 45.4215, -75.6906),
    ("Cape Verde", 14.9167, -23.5083),
    ("Central African Republic", 4.3612, 18.555),
    ("Chad", 12.1347, 15.0557),
    ("Chile", -33.4569, -70.6483),
    ("China", 39.9042, 116.4074),
    ("Colombia", 4.6483, -74.2479),
    ("Comoros", -11.701, 43.2419),
    ("Congo (Brazzaville)", -4.2634, 15.2429),
    ("Congo (Kinshasa)", -4.4419, 15.2663),
    ("Costa Rica", 9.935, -84.0841),
    ("Croatia", 45.815, 15.9819),
    ("Cuba", 23.1136, -82.3666),
    ("Cyprus", 35.1856, 33.3823),
    ("Czech Republic", 50.0755, 14.4378),
    ("Denmark", 55.6761, 12.5683),
    ("Djibouti", 11.5853, 43.1456),
    ("Dominica", 15.2976, -61.387),
    ("Dominican Republic", 18.4861, -69.9312),
    ("East Timor", -8.5569, 125.5603),
    ("Ecuador", -0.2295, -78.5249),
    ("Egypt", 30.0444, 31.2357),
    ("El Salvador", 13.6929, -89.2182),
    ("Equatorial Guinea", 3.7523, 8.7737),
    ("Eritrea", 15.3229, 38.925),
    ("Estonia", 59.437, 24.7536),
    ("Eswatini", -26.3054, 31.1367),
    ("Ethiopia", 9.145, 40.4897),
    ("Fiji", -18.1416, 178.4419),
    ("Finland", 60.1699, 24.9384),
    ("France", 48.8566, 2.3522),
    ("Gabon", 0.3917, 9.4536),
    ("Gambia", 13.4432, -15.3101),
    ("Georgia", 41.7151, 44.8271),
    ("Germany", 52.520, 13.405),
    ("Ghana", 5.6037, -0.187),
    ("Greece", 37.9838, 23.7275),
    ("Grenada", 12.0536, -61.751),
    ("Guatemala", 14.6349, -90.5069),
    ("Guinea", 9.6412, -13.5784),
    ("Guinea-Bissau", 11.8037, -15.1804),
    ("Guyana", 6.8013, -58.155),
    ("Haiti", 18.5944, -72.3074),
    ("Honduras", 14.0818, -87.2068),
    ("Hungary", 47.4979, 19.0402),
    ("Iceland", 64.1353, -21.8952),
    ("India", 28.6139, 77.209),
    ("Indonesia", -6.2146, 106.8451),
    ("Iran", 35.6892, 51.389),
    ("Iraq", 33.3152, 44.3661),
    ("Ireland", 53.3498, -6.2603),
    ("Israel", 31.7683, 35.2137),
    ("Italy", 41.9028, 12.4964),
    ("Jamaica", 18.0179, -76.8099),
    ("Japan", 35.6762, 139.6503),
    ("Jordan", 31.9516, 35.9234),
    ("Kazakhstan", 51.1694, 71.4491),
    ("Kenya", -1.2864, 36.8172),
    ("Kiribati", -0.8812, 169.5332),
    ("Korea, North", 39.0392, 125.7625),
    ("Korea, South", 37.5665, 126.978),
    ("Kosovo", 42.6629, 21.1655),
    ("Kuwait", 29.3759, 47.9774),
    ("Kyrgyzstan", 42.8746, 74.5698),
    ("Laos", 19.8563, 102.4955),
    ("Latvia", 56.9496, 24.1052),
    ("Lebanon", 33.8958, 35.4786),
    ("Lesotho", -29.2976, 27.4854),
    ("Liberia", 6.3007, -10.7969),
    ("Libya", 32.8872, 13.1914),
    ("Liechtenstein", 47.141, 9.5209),
    ("Lithuania", 54.6896, 25.2799),
    ("Luxembourg", 49.610, 6.129),
    ("Madagascar", -18.8792, 47.5079),
    ("Malawi", -13.9626, 33.7741),
    ("Malaysia", 3.139, 101.6869),
    ("Maldives", 4.1742, 73.5109),
    ("Mali", 12.6392, -8.0029),
    ("Malta", 35.8989, 14.5146),
    ("Marshall Islands", 7.1095, 171.3804),
    ("Mauritania", 18.097, -15.9322),
    ("Mauritius", -20.1609, 57.5012),
    ("Mexico", 19.4326, -99.1332),
    ("Micronesia", 6.9167, 158.1500),
    ("Moldova", 47.0269, 28.8416),
    ("Monaco", 43.7384, 7.4246),
    ("Mongolia", 47.9212, 106.9186),
    ("Montenegro", 42.7087, 19.3744),
    ("Morocco", 33.9693, -6.9275),
    ("Mozambique", -25.9667, 32.5833),
    ("Myanmar", 16.8661, 96.1951),
    ("Namibia", -22.5597, 17.0832),
    ("Nauru", -0.5283, 166.9326),
    ("Nepal", 27.7172, 85.324),
    ("Netherlands", 52.3702, 4.8952),
    ("New Zealand", -41.2865, 174.7762),
    ("Nicaragua", 12.1149, -86.2362),
    ("Niger", 13.5116, 2.1254),
    ("Nigeria", 9.0579, 7.4951),
    ("North Macedonia", 41.9973, 21.428),
    ("Norway", 59.9139, 10.7522),
    ("Oman", 23.6105, 58.5405),
    ("Pakistan", 33.6844, 73.0479),
    ("Palau", 7.515, 134.5825),
    ("Panama", 8.9833, -79.5167),
    ("Papua New Guinea", -9.4438, 147.1803),
    ("Paraguay", -25.2637, -57.5759),
    ("Peru", -12.0464, -77.0428),
    ("Philippines", 14.5995, 120.9842),
    ("Poland", 52.2297, 21.0122),
    ("Portugal", 38.7223, -9.1393),
    ("Qatar", 25.2867, 51.533),
    ("Romania", 44.4268, 26.1025),
    ("Russia", 55.7517, 37.6176),
    ("Rwanda", -1.9706, 30.1044),
    ("Saint Kitts and Nevis", 17.3026, -62.7177),
    ("Saint Lucia", 14.0101, -60.9874),
    ("Saint Vincent and the Grenadines", 13.1939, -61.2653),
    ("Samoa", -13.8339, -171.7711),
    ("San Marino", 43.9424, 12.4578),
    ("Sao Tome and Principe", 0.1864, 6.6131),
    ("Saudi Arabia", 24.7136, 46.6753),
    ("Senegal", 14.7167, -17.4677),
    ("Serbia", 44.7866, 20.4489),
    ("Seychelles", -4.6796, 55.492),
    ("Sierra Leone", 8.4653, -13.2317),
    ("Singapore", 1.3521, 103.8198),
    ("Slovakia", 48.1486, 17.1077),
    ("Slovenia", 46.0569, 14.5058),
    ("Solomon Islands", -9.4456, 159.9729),
    ("Somalia", 2.0469, 45.3182),
    ("South Africa", -25.7461, 28.1881),
    ("South Sudan", 4.8517, 31.5825),
    ("Spain", 40.4168, -3.7038),
    ("Sri Lanka", 6.9271, 79.8612),
    ("Sudan", 15.5007, 32.5599),
    ("Suriname", 5.8232, -55.1679),
    ("Sweden", 59.3293, 18.0686),
    ("Switzerland", 46.948, 7.4474),
    ("Syria", 33.5138, 36.2765),
    ("Taiwan", 25.033, 121.5654),
    ("Tajikistan", 38.5737, 68.7738),
    ("Tanzania", -6.369, 34.8888),
    ("Thailand", 13.7563, 100.5018),
    ("Togo", 6.1228, 1.2255),
    ("Tonga", -21.1393, -175.2049),
    ("Trinidad and Tobago", 10.6596, -61.4789),
    ("Tunisia", 36.8065, 10.1815),
    ("Turkey", 41.0082, 28.9784),
    ("Turkmenistan", 37.9601, 58.3261),
    ("Tuvalu", -8.5172, 179.2153),
    ("Uganda", 0.3476, 32.5825),
    ("Ukraine", 50.4501, 30.5234),
    ("United Arab Emirates", 24.4539, 54.3773),
    ("United Kingdom", 51.5074, -0.1278),
    ("United States", 38.9072, -77.0369),
    ("Uruguay", -34.9011, -56.1645),
    ("Uzbekistan", 41.3775, 64.5853),
    ("Vanuatu", -17.7439, 168.322),
    ("Vatican City", 41.9029, 12.4534),
    ("Venezuela", 10.4806, -66.9036),
    ("Vietnam", 21.0285, 105.8542),
    ("Yemen", 15.369, 44.191),
    ("Zambia", -15.3875, 28.3228),
    ("Zimbabwe", -17.8252, 31.0335)
]

country_capitals_list_test = []
for _ in range(30):
    country_capitals_list_test.append(country_capitals_list_train[(int)(fake.random.random() * len(country_capitals_list_train))])

# Create a DataFrame from the generated data
country_capitals_train = pd.DataFrame(country_capitals_list_train, columns=['Country', 'Latitude', 'Longitude'])
country_capitals_test = pd.DataFrame(country_capitals_list_test, columns=['Country', 'Latitude', 'Longitude'])

# Step 1: Prepare your dataset
# Assume you have the following data:

# Assume you have a DataFrame called 'country_capitals' with columns 'Country', 'Latitude', 'Longitude'
# representing the capitals of countries

# Assume the coordinates of Bucharest are as follows
bucharest_latitude = 44.439663
bucharest_longitude = 26.096306

from math import sin, cos, sqrt, atan2, radians

# Function to calculate distance between two sets of coordinates using a simplified formula
def calculate_distance(lat1, lon1, lat2, lon2):
    # Convert latitude and longitude from degrees to radians
    lat1 = np.radians(lat1)
    lon1 = np.radians(lon1)
    lat2 = np.radians(lat2)
    lon2 = np.radians(lon2)

    # Earth's radius in kilometers
    radius = 6371

    # Calculate the differences in latitude and longitude
    dlat = lat2 - lat1
    dlon = lon2 - lon1

    # Apply the Haversine formula
    a = np.sin(dlat / 2) ** 2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon / 2) ** 2
    c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))

    # Calculate the distance
    distance = radius * c

    return distance

# Create a new column 'Distance' in the 'country_capitals' DataFrame
country_capitals_train['Distance'] = calculate_distance(country_capitals_train['Latitude'].values, country_capitals_train['Longitude'].values,
                                                  bucharest_latitude, bucharest_longitude)

country_capitals_test['Distance'] = calculate_distance(country_capitals_test['Latitude'].values, country_capitals_test['Longitude'].values,
                                                  bucharest_latitude, bucharest_longitude)

# Function to generate randomly generated durations based on distance
def generate_durations(distance):
    # Example formula to generate durations based on distance
    # This is a simplified example, and you can customize it based on your needs
    # Feel free to replace it with a more meaningful function
    num_durations = 100
    durations = []
    for _ in range(num_durations):
        duration = distance * fake.random.uniform(1 / 100, 1 / 20)  # Generate a duration based on the distance
        durations.append(duration)
    return durations

# Step 1: Generate durations for each capital in the DataFrame
country_capitals_train['Duration'] = country_capitals_train['Distance'].apply(generate_durations)
country_capitals_test['Duration'] = country_capitals_test['Distance'].apply(generate_durations)

# Step 2: Prepare the data for training
X_train = country_capitals_train[['Country', 'Duration']]
y_train = country_capitals_train['Duration']
X_test = country_capitals_test[['Country', 'Duration']]
y_test = country_capitals_test['Duration']

# Step 3: Perform data preprocessing and feature engineering
label_encoder = LabelEncoder()
X_train['country_encoded'] = label_encoder.fit_transform(X_train['Country'])
X_test['country_encoded'] = label_encoder.transform(X_test['Country'])

# Save the label encoder
with open('delivery_model/label_encoder.pkl', 'wb') as f:
    pickle.dump(label_encoder, f)

# Step 4: Define the model architecture
country_input = tf.keras.Input(shape=(1,))

# Embedding layer for the country input
country_embedding = tf.keras.layers.Embedding(input_dim=len(label_encoder.classes_), output_dim=8)(country_input)
country_embedding = tf.squeeze(country_embedding, axis=1)

x = tf.keras.layers.Dense(128, activation='relu')(country_embedding)
x = tf.keras.layers.Dense(128, activation='relu')(x)
x = tf.keras.layers.Dropout(0.2)(x)
x = tf.keras.layers.Dense(64, activation='relu')(x)
output = tf.keras.layers.Dense(1)(x)

model = tf.keras.Model(inputs=country_input, outputs=output)

# Step 5: Compile the model
optimizer = tf.keras.optimizers.Adam(learning_rate=0.01)
model.compile(optimizer=optimizer, loss='mean_squared_error')

# Step 6: Prepare the training data
country_train = np.array(X_train['country_encoded'].values)
y_train = np.array(y_train.tolist())

# Step 7: Train the model
model.fit(country_train, y_train, epochs=100, batch_size=32)

# Step 8: Prepare the test data
country_test = np.array(X_test['country_encoded'].values)
y_test = np.array(y_test.tolist())

# Step 9: Evaluate the model
loss = model.evaluate(country_test, y_test)
print("Test loss:", loss)

# Make predictions
predictions = model.predict(country_test)
print(country_test)
print(y_test)
print(predictions)

# Step 10: Save the trained model
model.save('delivery_model')