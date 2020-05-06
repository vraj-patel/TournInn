import pandas as pd
import pickle

df = pd.read_csv('./ml_server/datasets/processed/games_2018_2019.csv')
X_new = df[['Home Win %', 'Visitor Win %']]
y_new = df['Home Won']

model = pickle.load(open('./ml_server/Prediction_Models/logistic_reg_model.sav', 'rb'))
print(model.score(X_new, y_new))
