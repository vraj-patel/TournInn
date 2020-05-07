import csv
import pandas as pd
import random
from collections import defaultdict

# 1. Delete row if there is a null value

team_standings_file = 'team_standings_2016_2017'
games_file = 'games_2017_2018'

team_standings_df = pd.read_csv(f'./ml_server/datasets/raw/db_{team_standings_file}.csv')
games_df = pd.read_csv(f'./ml_server/datasets/raw/db_{games_file}.csv')

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

# 3.1 Replace 'Home' and 'Visitor' with 'Team 1' and 'Team 2' and create a 'Team 1 At Home' column
# 3.2 Calculate and add 'Home Win %', 'Visitor Win %', and 'Home Won' in Games

num_of_wins = {}
num_of_wins = defaultdict(lambda: 0, num_of_wins)
num_of_losses = {}
num_of_losses = defaultdict(lambda: 0, num_of_losses)

team1_win_perc_col = []
team2_win_perc_col = []
team1_won_col = []

processed_game_csv = open(f'./ml_server/datasets/processed/{games_file}.csv', 'w')
csv_writer = csv.writer(processed_game_csv)
csv_writer.writerow(['Team 1', 'Team 2', 'Team 1 Win %', 'Team 2 Win %', 'Team 1 At Home', 'Team 1 Won'])

for row in games_df.itertuples():
    team1 = row._1
    team1_pts = row._2
    team2 = row._3
    team2_pts = row._4
    home_team = row._5

    # 3.1
    rnd = random.randint(0, 1)
    if rnd == 0:
        team1_temp = team1
        team1_pts_temp = team1_pts

        team1 = team2
        team1_pts = team2_pts
        team2 = team1_temp
        team2_pts = team1_pts_temp

    if home_team == team1:
        team1_at_home = 1
    else:
        team1_at_home = 0

    # 3.2
    if team1_pts > team2_pts:
        team1_won = 1
        num_of_wins[team1] = num_of_wins[team1] + 1
        num_of_losses[team2] = num_of_losses[team2] + 1
    else:
        team1_won = 0
        num_of_wins[team2] = num_of_wins[team2] + 1
        num_of_losses[team1] = num_of_losses[team1] + 1

    curr_team1_perc = num_of_wins[team1] / (num_of_wins[team1] + num_of_losses[team1])
    curr_team2_perc = num_of_wins[team2] / (num_of_wins[team2] + num_of_losses[team2])

    adjusted_team1_perc = (previous_win_percent[team1] + 2*curr_team1_perc)/3
    adjusted_team2_perc = (previous_win_percent[team2] + 2*curr_team2_perc)/3

    csv_writer.writerow([team1, team2, adjusted_team1_perc, adjusted_team2_perc, team1_at_home, team1_won])
