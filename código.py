import glob
from PyPDF2 import PdfReader
import os
import re
import json

# Caminho da pasta onde estão os PDFs
caminho_pasta = r"C:\Users\guilh\ler_pasta"

# Encontra todos os arquivos PDF na pasta
pdf_files = glob.glob(f"{caminho_pasta}\\*.pdf")

if not pdf_files:
    print("Nenhum arquivo PDF encontrado na pasta.")
else:
    print(f"{len(pdf_files)} arquivo(s) PDF encontrado(s).")

# Dicionário para armazenar os dados
dados_json = {}

# Percorre cada arquivo PDF
for file in pdf_files:
    nome_arquivo = os.path.basename(file)
    print(f"\n===========================")
    print(f"Arquivo: {nome_arquivo}")

    try:
        reader = PdfReader(file)
        total_paginas = len(reader.pages)

        # Lista para armazenar o texto das páginas
        page = []

        # Extrai texto de todas as páginas
        for numero_pagina in range(total_paginas):
            pagina = reader.pages[numero_pagina]
            texto = pagina.extract_text()

            if texto:
                page.append(texto)

        # Junta todo o texto das páginas em uma única string
        texto_completo = "\n".join(page)

        # Captura Avaliação do paciente
        padrao_avaliacao = r"Avaliação do paciente(.*?)Exame físico"
        avaliacao_match = re.search(padrao_avaliacao, texto_completo, re.DOTALL | re.IGNORECASE)
        avaliacao = avaliacao_match.group(1).strip() if avaliacao_match else ""

        # Captura Parâmetros vitais
        padrao_parametros = r"Parâmetros vitais(.*?)(Avaliação do paciente|Exame físico|$)"
        parametros_match = re.search(padrao_parametros, texto_completo, re.DOTALL | re.IGNORECASE)
        parametros = parametros_match.group(1).strip() if parametros_match else ""

        # Captura Idade
        padrao_idade = r"Idade[:\s-]*([\d]+)\s*(anos|ano|meses|mês)?"
        idade_match = re.search(padrao_idade, texto_completo, re.IGNORECASE)

        if idade_match:
            idade_valor = idade_match.group(1)
            idade_unidade = idade_match.group(2) if idade_match.group(2) else ""
            idade = f"{idade_valor} {idade_unidade}".strip()
        else:
            idade = "Não encontrado"

        # Adiciona no dicionário JSON
        dados_json[nome_arquivo] = {
            "idade": idade,
            "parametros_vitais": parametros,
            "avaliacao_do_paciente": avaliacao
        }

        print(f"Dados extraídos do arquivo: {nome_arquivo}")

    except Exception as e:
        print(f"Erro ao ler o arquivo {file}: {e}")

# Salvar como arquivo JSON
output_path = os.path.join(caminho_pasta, "dados_extracao_com_idade.json")
with open(output_path, "w", encoding="utf-8") as json_file:
    json.dump(dados_json, json_file, ensure_ascii=False, indent=4)

print(f"\nArquivo JSON gerado com sucesso em: {output_path}")

