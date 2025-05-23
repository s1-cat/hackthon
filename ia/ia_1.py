from re import A
import json
import numpy as np
import tensorflow as tf
import os
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Embedding, LSTM
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.model_selection import train_test_split

with open('dados_extracao_com_idade.json', 'r', encoding='utf-8') as arquivo2:
  ddados = json.load(arquivo2)
primeira_chave = next(iter(ddados))
print(primeira_chave, ddados[primeira_chave])





with open('dados_extracao_com_idade.json', 'r', encoding='utf-8') as arquivo:
  add = json.load(arquivo)


data = ["test para ver oque acontece", "um dia vai dar certo essa porra test porra porra "] ## Feature
toke = Tokenizer()
toke.fit_on_texts(add)
y = [-1000, 20, 900 ,210, 200, 500, 230, 506, 800, 100] ## labels 

##print(data)
##print(toke.word_index) ## para criar um tokem por palavra 
##print(toke.texts_to_sequences(data)) ## transforma os textos em sequências numéricas
word_index = toke.word_index 
sequencia = toke.texts_to_sequences(add)


############### Padding (Machine Learning)

tokens_max_trainig = max([len(seq) for seq in sequencia]) ## pegando o tamanho do tokes de entrada no treinamento

x = pad_sequences(sequencia, maxlen=tokens_max_trainig)  ## add 0 para q todos os tokens sejam iguais no tamanho no treinamento 

y = np.array(y) ## transformando em matrix

X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=2, random_state=42) ## dividindo os dados de entrada em 20 e 80
## Construção do modelo de rede neural

model = Sequential()
model.add(Embedding(input_dim=len(word_index) + 1, output_dim=50, input_length=tokens_max_trainig))  # Embedding para representar palavras
model.add(LSTM(94, return_sequences=False))  # LSTM para capturar dependências de longo prazo
model.add(Dense(92, activation='relu'))  # Camada densa oculta
model.add(Dense(1))  # Camada de saída para prever um número (sem ativação, pois é regressão)

## Compilando o modelo
model.compile(optimizer='adam', loss='mean_squared_error')

model.fit(X_train, y_train, epochs=50, batch_size=4, validation_data=(X_test, y_test))

loss = model.evaluate(X_test, y_test)
print(f"Loss no conjunto de teste: {loss}")


# Passo 8: Fazendo previsões
text_to_predict = "Avaliação do paciente Paciente admitido de maca sendo pego de carro de tutora apresentando intensa fraqueza em "
seq = toke.texts_to_sequences([text_to_predict])
padded_seq = pad_sequences(seq, maxlen=tokens_max_trainig )
name = "MASSU"
line_break = "\n"
line_break += name
predicted_number = model.predict(padded_seq)
print(f"O número previsto para o texto '{text_to_predict}' é: {predicted_number[0][0]}")

caminho_pasta = "/content/dados.json"

re = str(predicted_number[0][0])
re += line_break
print(re)

mode = 1 # 0 normal 1 para gerar treinamento 


  

with open(caminho_pasta, "w", encoding="utf-8") as json_file:
    json.dump(re, json_file, ensure_ascii=False, indent=4)
i = 0
if mode == 1:
  while 1 :
    data_generetior = model.predict(padded_seq)
    re1 = str(data_generetior[0][0])
    line_break = "\n"
    line_break += name
    re1 += line_break
    with open(caminho_pasta, "a", encoding="utf-8") as json_file:
      json.dump(re1, json_file, ensure_ascii=False, indent=4)
    if i == 10:
      break 
    i+= 1 
