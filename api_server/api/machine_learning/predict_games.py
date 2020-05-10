import pickle
import sys

model = pickle.load(open('./api/machine_learning/models/logistic_reg_model.sav', 'rb'))

X = [[float(sys.argv[1]), float(sys.argv[2]), int(sys.argv[3])]]

print(model.predict(X)[0])
