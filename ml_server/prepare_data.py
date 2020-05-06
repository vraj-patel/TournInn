import pandas as pd


def get_training_data():
    df = pd.read_csv('./ml_server/datasets/processed/games_2017_2018.csv')
    feature_cols = ['Team 1 Win %', 'Team 2 Win %', 'Team 1 At Home']
    X = df[feature_cols]
    y = y = df['Team 1 Won']

    return {'X': X, 'y':  y}
