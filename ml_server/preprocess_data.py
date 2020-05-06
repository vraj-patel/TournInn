import pandas as pd
from collections import defaultdict

# 1. Delete row if there is a null value

team_standings_file = 'teamStandings_2016_2017'
games_file = 'games_2017_2018'

team_standings_df = pd.read_csv(f'./ml_server/datasets/raw/{team_standings_file}.csv')
games_df = pd.read_csv(f'./ml_server/datasets/raw/{games_file}.csv')

missing_values = team_standings_df.isnull().sum().sum()
if missing_values > 0:
    raise TypeError(f'{missing_values} required cell(s) in Team Standings are Null or NaN')

missing_values = games_df.isnull().sum().max()
if missing_values > 0:
    num_of_rows = games_df.shape[0]
    games_df = games_df.dropna(how='any', axis=0)
    print(f'{num_of_rows - games_df.shape[0]} rows were dropped from Games due to NaN values.')


# 2. Create dictionary for 'Previous Win %'

previous_win_percent = {}

for row in team_standings_df.itertuples():
    previous_win_percent[row._1] = row.Wins / (row.Wins + row.Losses)

# 3. Calculate and add 'Home Win %', 'Visitor Win %', and 'Home Won' in Games

home_win_perc_col = []
visitor_win_perc_col = []
home_won_col = []
num_of_wins = {}
num_of_wins = defaultdict(lambda: 0, num_of_wins)
num_of_losses = {}
num_of_losses = defaultdict(lambda: 0, num_of_losses)


for row in games_df.itertuples():
    home = row.Home
    visitor = row.Visitor
    home_pts = row._2
    visitor_pts = row._4

    if home_pts > visitor_pts:
        home_won_col.append(1)
        num_of_wins[home] = num_of_wins[home] + 1
        num_of_losses[visitor] = num_of_losses[visitor] + 1
    else:
        home_won_col.append(0)
        num_of_wins[visitor] = num_of_wins[visitor] + 1
        num_of_losses[home] = num_of_losses[home] + 1

    curr_home_perc = num_of_wins[home] / (num_of_wins[home] + num_of_losses[home])
    curr_visitor_perc = num_of_wins[visitor] / (num_of_wins[visitor] + num_of_losses[visitor])

    adjusted_home_perc = (previous_win_percent[home] + 2*curr_home_perc)/3
    adjusted_visitor_perc = (previous_win_percent[visitor] + 2*curr_visitor_perc)/3

    home_win_perc_col.append(adjusted_home_perc)
    visitor_win_perc_col.append(adjusted_visitor_perc)

processed_game_df = pd.DataFrame(data={'Home Win %': home_win_perc_col, 'Visitor Win %': visitor_win_perc_col, 'Home Won': home_won_col})
processed_game_df = processed_game_df.round(3)
processed_game_df.to_csv(f'./ml_server/datasets/processed/{games_file}.csv', index=False)
