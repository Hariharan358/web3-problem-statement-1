from flask import Flask, request, jsonify, render_template
import pandas as pd

# Load the dataset
data = pd.read_csv(r'C:\Users\HP\Downloads\dummy_aadhar_data.csv')

# Ensure Aadhar Number is stored as string for consistent matching
data['Aadhar Number'] = data['Aadhar Number'].astype(str)

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/check_request', methods=['POST'])
def check_request():
    # Get the Aadhar number and name from the request
    input_data = request.json
    aadhar_number = str(input_data.get("aadhar_number"))
    name = input_data.get("name")

    # Check if the Aadhar number and name exist in the dataset
    match = data[(data['Aadhar Number'] == aadhar_number)| (data['Name'] == name)]

    # If a match is found, the request is valid; otherwise, it's invalid
    if not match.empty:
        result = "Valid"
    else:
        result = "Invalid"
    
    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
