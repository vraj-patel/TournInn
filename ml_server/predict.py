import pandas as pd
import pickle

df = pd.read_csv('./ml_server/datasets/processed/games_2018_2019.csv')
X_new = df[['Team 1 Win %', 'Team 2 Win %', 'Team 1 At Home']]
y_new = df['Team 1 Won']

model = pickle.load(open('./ml_server/models/logistic_reg_model.sav', 'rb'))
print(model.score(X_new, y_new))
