import pickle
import sys
import tensorflow as tf
from tensorflow import keras

model = keras.models.load_model('dbscripts/delivery_model')

# Load the label encoder from file
with open('dbscripts/delivery_model/label_encoder.pkl', 'rb') as f:
    label_encoder = pickle.load(f)

def perform_tensorflow_operations(country):
    transformed_country = label_encoder.transform([country])
    predictions = model.predict([[transformed_country]])
    
    return str(predictions[0].item())

print(perform_tensorflow_operations(sys.argv[1]))