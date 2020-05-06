import pandas as pd


def get_training_data():
    df = pd.read_csv('./ml_server/datasets/processed/games_2017_2018.csv')
    feature_cols = ['Home Win %', 'Visitor Win %']
    X = df[feature_cols]
    y = y = df['Home Won']

    return {'X': X, 'y':  y}
