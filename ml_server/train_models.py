from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import prepare_data
import pickle

data = prepare_data.get_training_data()

X_train, X_test, y_train, y_test = train_test_split(data['X'], data['y'], train_size=0.3)
model = LogisticRegression().fit(X_train, y_train)

print(model.score(X_test, y_test))

filename = './ml_server/Prediction_Models/logistic_reg_model.sav'
pickle.dump(model, open(filename, 'wb'))
