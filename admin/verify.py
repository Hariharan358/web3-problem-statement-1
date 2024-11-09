import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import pickle

# Load the dataset
data = pd.read_csv(r'C:\Users\HP\Downloads\dummy_aadhar_data.csv')

# Create a fake label column (1 for valid, -1 for fake) - this is for demonstration
np.random.seed(42)
data['Label'] = np.where(np.random.rand(len(data)) > 0.8, -1, 1)  # 20% fake, 80% real

# Encode categorical features (e.g., Name)
le = LabelEncoder()
data['Name_encoded'] = le.fit_transform(data['Name'])

# Feature selection (Aadhar Number, Name_encoded)
X = data[['Aadhar Number', 'Name_encoded']]

# Split data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, data['Label'], test_size=0.2, random_state=42)

# Train an Isolation Forest model
model = IsolationForest(contamination=0.2, random_state=42)
model.fit(X_train)

# Save the model as a pickle file
with open('fake_request_detector.pkl', 'wb') as f:
    pickle.dump(model, f)

print("Model trained and saved as fake_request_detector.pkl")
