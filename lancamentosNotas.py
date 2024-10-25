from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/upload-excel', methods=['POST'])
def upload_excel():
    file = request.files['file']
    if not file:
        return jsonify({"error": "No file provided"}), 400
    
    # Lê o arquivo Excel
    df = pd.read_excel(file)
    
    # Converte para JSON para ser enviado ao frontend
    data = df.to_dict(orient="records")
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
