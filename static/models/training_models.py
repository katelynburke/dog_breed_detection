# Dependencies
import matplotlib.pyplot as plt

import os
import numpy as np
import tensorflow as tf

from tensorflow import keras
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg19 import (
    VGG19, 
    preprocess_input, 
    decode_predictions
)

import os
os.environ["KMP_DUPLICATE_LIB_OK"]="True"


# Load the VGG19 model
# https://keras.io/applications/#VGG19
model = VGG19(include_top=True, weights='imagenet')


# Define default image size for VGG19
image_size = (224, 224)

# Load the image and resize to default image size
image_path = os.path.join("..", "images", "animal1.jpg")
img = image.load_img(image_path, target_size=image_size)
plt.imshow(img)

# Preprocess image for model prediction
# This step handles scaling and normalization for VGG19
x = image.img_to_array(img)
x = np.expand_dims(x, axis=0)
x = preprocess_input(x)

# Make predictions
predictions = model.predict(x)
print('Predicted:', decode_predictions(predictions, top=3))
plt.imshow(img)

# Refactor above steps into reusable function
def predict(image_path):
    """Use VGG19 to label image"""
    img = image.load_img(image_path, target_size=image_size)
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    predictions = model.predict(x)
    plt.imshow(img)
    print('Predicted:', decode_predictions(predictions, top=3))

# Make predictions on the dog photo
image_path = os.path.join("..", "images", "dog.jpeg")
predict(image_path)