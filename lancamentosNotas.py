from flask import Flask, request, render_template, jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload_excel', methods=['POST'])
def upload_excel():
    # Verificar se o arquivo foi enviado
    if 'file' not in request.files:
        return jsonify({"error": "Nenhum arquivo foi enviado"})

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "Nome do arquivo vazio"})

    if file and file.filename.endswith('.xlsx'):
        # Ler o arquivo Excel
        df = pd.read_excel(file)

        # Aqui você pode processar os dados do Excel
        # Vamos supor que as colunas são: Aluno, Nota1, Nota2, Nota3
        alunos = df.to_dict(orient='records')  # Converter para dicionário
        return jsonify(alunos)  # Retornar os dados para o frontend como JSON

    return jsonify({"error": "Formato de arquivo inválido"})
